import { Component, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-backend',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzAvatarModule,
    NzModalModule,
    MatTooltipModule
  ],
  templateUrl: './backend.component.html',
  styleUrl: './backend.component.css',
})
export class BackendComponent implements OnInit {

  isCollapsed = false;

  userName: string = '';

  picUrl: string = '';

  userEmail: string = '';

  isDropdownOpen = false;

  constructor(
    private router: Router,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
  }

  /**
   * 側邊欄狀態
   */
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
  * 僅當前路徑完全相等時返回 true
  * @param url
  * @returns
  */
  isActive(url: string): boolean {
    return this.router.url === url;
  }



}
