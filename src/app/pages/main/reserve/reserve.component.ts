import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { DataService, MAX_DAILY_CAPACITY } from '../../../services/data.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reserve',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzIconModule,
    NzDividerModule,
    NzResultModule,
    NzBreadCrumbModule,
    NzSelectModule,
    NzAlertModule,
    NzProgressModule,
  ],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css',
})
export class ReserveComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  isSubmitting = false;

  lawyers: any[] = [];
  maxCapacity = MAX_DAILY_CAPACITY;

  /** 目前選擇的律師當日已預約數 */
  bookingCount = 0;
  /** 是否已額滿 */
  isFullyBooked = false;
  /** 顯示容量提示（已選律師且日期） */
  showCapacity = false;

  private sub!: Subscription;
  private formSub!: Subscription;

  // 不可選過去的日期
  disabledDate = (current: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current < today;
  };

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private message: NzMessageService
  ) {
    this.form = this.fb.group({
      lawyerId: [null, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^(0[2-9]\d{7,8}|09\d{8})$/)]],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      remark: [''],
    });
  }

  ngOnInit(): void {
    this.sub = this.dataService.lawyers$.subscribe(list => {
      this.lawyers = list;
    });

    // 監聽律師或日期變更，即時更新容量狀態
    this.formSub = this.form.valueChanges.subscribe(() => {
      this.checkCapacity();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.formSub?.unsubscribe();
  }

  private checkCapacity(): void {
    const { lawyerId, date } = this.form.value;
    if (!lawyerId || !date) {
      this.showCapacity = false;
      this.isFullyBooked = false;
      return;
    }
    const dateStr = formatDate(date, 'yyyy/MM/dd', 'zh-TW');
    this.bookingCount = this.dataService.getLawyerBookingCount(lawyerId, dateStr);
    this.isFullyBooked = this.bookingCount >= this.maxCapacity;
    this.showCapacity = true;
  }

  get selectedLawyerName(): string {
    const id = this.form.value.lawyerId;
    return this.lawyers.find(l => l.id === id)?.name ?? '';
  }

  get capacityPercent(): number {
    return Math.round((this.bookingCount / this.maxCapacity) * 100);
  }

  get capacityStatus(): 'success' | 'normal' | 'exception' {
    if (this.isFullyBooked) return 'exception';
    if (this.bookingCount >= this.maxCapacity - 1) return 'normal';
    return 'success';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(ctrl => {
        ctrl.markAsDirty();
        ctrl.updateValueAndValidity();
      });
      return;
    }
    if (this.isFullyBooked) {
      this.message.warning('此律師當日預約已額滿，請選擇其他日期或律師');
      return;
    }

    this.isSubmitting = true;
    const { lawyerId, name, phone, date, time, remark } = this.form.value;
    const lawyerName = this.selectedLawyerName;

    setTimeout(() => {
      this.dataService.addReserve({
        lawyerId,
        lawyerName,
        name,
        phone,
        date: formatDate(date, 'yyyy/MM/dd', 'zh-TW'),
        time: formatDate(time, 'HH:mm', 'zh-TW'),
        remark: remark || '',
      });
      this.isSubmitting = false;
      this.submitted = true;
    }, 800);
  }

  reset(): void {
    this.form.reset();
    this.submitted = false;
    this.showCapacity = false;
    this.isFullyBooked = false;
    this.bookingCount = 0;
  }
}
