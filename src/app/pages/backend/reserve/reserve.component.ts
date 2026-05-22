import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { FormComponent } from './form/form.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-reserve',
  imports: [
    CommonModule, NzButtonModule, NzDividerModule,
    NzDividerModule, NzFormModule, NzIconModule,
    NzInputModule, NzModalModule, NzTableModule,
    NzPopconfirmModule,
    FormsModule, ReactiveFormsModule, NzCheckboxModule
  ],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css',
})
export class ReserveComponent implements OnInit, OnDestroy {

  displayedList: any[] = [];

  total: number = 0;

  pageIndex: number = 1;

  pageSize: number = 10;

  loading: boolean = false;

  searchTerm: string = '';

  private sub!: Subscription;

  constructor(
    private modal: NzModalService,
    private dataService: DataService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.sub = this.dataService.reserves$.subscribe(list => {
      this.displayedList = list;
      this.total = list.length;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openModal(isEdit: boolean, reserveData?: any): void {
    const modal = this.modal.create({
      nzTitle: isEdit ? '編輯預約' : '新增預約',
      nzContent: FormComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzCentered: true,
      nzFooter: null,
      nzZIndex: 60,
      nzData: reserveData
    });
    modal.afterClose.subscribe((result) => {
      if (!result) return;
      if (isEdit) {
        this.dataService.updateReserve(reserveData.number, result);
        this.message.success('預約資料已更新');
      } else {
        this.dataService.addReserve(result);
        this.message.success('新增預約成功');
      }
    });
  }

  deleteReserve(number: string): void {
    this.dataService.deleteReserve(number);
    this.message.success('已刪除預約');
  }

  /**
   * 將 "yyyy/MM/dd" 和 "HH:mm" 字串轉換為標準 Date 物件
   */
  getParsedDate(dateStr: string, timeStr: string): Date {
    if (!dateStr || !timeStr) return new Date();
    const validDateStr = dateStr.replace(/\//g, '-');
    const isoString = `${validDateStr}T${timeStr}:00`;
    return new Date(isoString);
  }

}

