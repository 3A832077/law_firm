import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormComponent } from './form/form.component';
import { data } from '../../../data';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-reserve',
  imports: [
    CommonModule, NzButtonModule, NzDividerModule,
    NzDividerModule, NzFormModule, NzIconModule,
    NzInputModule, NzModalModule, NzTableModule,
    FormsModule, ReactiveFormsModule, NzCheckboxModule
  ],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css',
})
export class ReserveComponent implements OnInit{

  displayedList: any[] = data.reserves;

  total: number = 0;

  pageIndex: number = 1;

  pageSize: number = 10;

  loading: boolean = false;

  searchTerm: string = '';

  constructor(
    private modal: NzModalService,

  ){}

  ngOnInit(): void {

  }

  /**
   * 新增/編輯預約
   * @param isEdit
   * @param data
   */
  openModal(isEdit: boolean, data?: any): void {
    const modal = this.modal.create({
      nzTitle: isEdit ? '編輯' : '新增',
      nzContent: FormComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzCentered: true,
      nzFooter: null,
      nzZIndex: 60,
      nzData: data
    });
  }

  /**
   * 將 "yyyy/MM/dd" 和 "HH:mm" 字串轉換為標準 Date 物件
   */
  getParsedDate(dateStr: string, timeStr: string): Date {
    if (!dateStr || !timeStr) return new Date(); // 防呆

    // 1. 把斜線 '/' 換成連字號 '-' (解決 ISO 格式問題)
    const validDateStr = dateStr.replace(/\//g, '-');

    // 2. 組合標準 ISO 字串： "2025-12-31T10:00:00"
    const isoString = `${validDateStr}T${timeStr}:00`;

    // 3. 回傳 Date 物件
    return new Date(isoString);
  }

}
