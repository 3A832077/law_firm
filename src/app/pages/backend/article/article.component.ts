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
  selector: 'app-article',
  imports: [
    CommonModule, NzTableModule,
    NzButtonModule, NzIconModule,
    NzModalModule, NzDividerModule,
    NzFormModule, NzInputModule,
    NzPopconfirmModule,
    FormsModule, ReactiveFormsModule,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit, OnDestroy {

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
    this.sub = this.dataService.articles$.subscribe(list => {
      this.displayedList = list;
      this.total = list.length;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openModal(isEdit: boolean, articleData?: any): void {
    const modal = this.modal.create({
      nzTitle: isEdit ? '編輯文章' : '新增文章',
      nzContent: FormComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzCentered: true,
      nzFooter: null,
      nzZIndex: 60,
      nzData: articleData
    });
    modal.afterClose.subscribe((result) => {
      if (!result) return;
      if (isEdit) {
        this.dataService.updateArticle(articleData.id, result);
        this.message.success('文章已更新');
      } else {
        this.dataService.addArticle(result);
        this.message.success('新增文章成功');
      }
    });
  }

  deleteArticle(id: number): void {
    this.dataService.deleteArticle(id);
    this.message.success('已刪除文章');
  }

}
