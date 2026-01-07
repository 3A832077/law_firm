import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormsModule } from '@angular/forms';
import { data } from '../../../data';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-lawyers',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzTagModule,
    NzBreadCrumbModule,
    NzPageHeaderModule,
    NzPaginationModule,
    MatTooltipModule
  ],
  templateUrl: './lawyers.component.html',
  styleUrl: './lawyers.component.css',
})
export class LawyersComponent implements OnInit{

  isBrowser: boolean;

  searchText = '';

  selectedSpecialty: string | null = null;

  viewMode: 'grid' | 'list' = 'grid';

  currentPage = 1;

  pageSize = 24;

  // 律師資料
  allLawyers: any[] = data.lawyers;

  filteredLawyers: any[] = data.lawyers;

  paginatedLawyers: any[] = data.lawyers;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }

  onBack(){
    this.router.navigate(['/home']);
  }

}
