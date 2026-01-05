import { Component, inject, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

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
    NzRadioModule,
    NzUploadModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {

  data = inject(NZ_MODAL_DATA) || undefined;

  form: FormGroup = new FormGroup({});

  fileList: NzUploadFile[] = [];

  constructor(
    private fb: FormBuilder,
    private modal: NzModalRef,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data?.title || null],
      content: [this.data?.content || null],
      reference: [this.data?.reference || null],
    });
    if (this.data?.imageUrl) {
      this.fileList = [{
        uid: '-1',
        name: this.data.fileName,
        status: 'done',
        url: this.data.imageUrl,
      }];
    }
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  /**
   * 關閉新增/編輯modal
   */
  close() {
    this.modal.destroy();
  }




}
