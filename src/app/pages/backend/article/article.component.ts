import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-article',
  imports: [
    CommonModule, NzTableModule,
    NzButtonModule, NzIconModule,
    NzModalModule, NzDividerModule,
    NzFormModule, NzInputModule,
    FormsModule, ReactiveFormsModule,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit {

  displayedList: any[] = data.articles;

  total: number = 0;

  pageIndex: number = 1;

  pageSize: number = 10;

  loading: boolean = false;

  searchTerm: string = '';

  constructor(
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
  }

  /**
   * 新增/編輯文章
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

}
