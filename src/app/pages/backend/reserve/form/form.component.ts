import { Component, inject, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { formatDate } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NZ_MODAL_DATA, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'app-form',
  imports: [
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzDividerModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTimePickerModule
],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit{

  data = inject(NZ_MODAL_DATA) || undefined;

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef
  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      date: [this.data?.date || null],
      time: [this.data?.time || null],
      name:[this.data?.name || null],
      remark: [this.data?.Remark || null],
    });
  }

  /**
   * 關閉新增/編輯modal
   */
  close() {
    this.modal.destroy();
  }

}
