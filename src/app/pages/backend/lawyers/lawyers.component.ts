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
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-lawyers',
  imports: [
    CommonModule, NzTableModule,
    NzButtonModule, NzIconModule,
    NzModalModule, NzDividerModule,
    NzFormModule, NzInputModule,
    NzPopconfirmModule,
    FormsModule, ReactiveFormsModule,
  ],
  templateUrl: './lawyers.component.html',
  styleUrl: './lawyers.component.css',
})
export class LawyersComponent implements OnInit, OnDestroy {

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
    this.sub = this.dataService.lawyers$.subscribe(list => {
      this.displayedList = list;
      this.total = list.length;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openModal(isEdit: boolean, lawyerData?: any): void {
    const modal = this.modal.create({
      nzTitle: isEdit ? '編輯律師' : '新增律師',
      nzContent: FormComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzCentered: true,
      nzFooter: null,
      nzZIndex: 60,
      nzData: lawyerData
    });
    modal.afterClose.subscribe((result) => {
      if (!result) return;
      if (isEdit) {
        this.dataService.updateLawyer(lawyerData.id, result);
        this.message.success('律師資料已更新');
      } else {
        this.dataService.addLawyer(result);
        this.message.success('新增律師成功');
      }
    });
  }

  deleteLawyer(id: number): void {
    this.dataService.deleteLawyer(id);
    this.message.success('已刪除律師');
  }

}
