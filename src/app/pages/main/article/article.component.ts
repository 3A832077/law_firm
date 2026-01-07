import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { data } from '../../../data';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@Component({
  selector: 'app-article',
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
    NzPaginationModule,
    NzDividerModule,
    NzEmptyModule,
    NzSkeletonModule,
    NzPageHeaderModule
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit{

  isBrowser: boolean;

  // 篩選
  searchText = '';

  selectedCategory: string | null = null;

  selectedYear: string | null = null;

  selectedTag: string | null = null;

  sortBy = 'newest';

  // 分頁
  currentPage = 1;

  pageSize = 10;

  years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];

  // 文章資料
  allArticles: any[] = data.articles;

  filteredArticles: any[] = [];

  paginatedArticles: any[] = [];

  yearStats: { year: string; count: number }[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    // 初始化篩選
    this.filteredArticles = [...this.allArticles];
    this.sortArticles();
    this.updatePaginatedArticles();
  }

  getUniqueAuthors(): number {
    const authors = new Set(this.allArticles.map(a => a.author));
    return authors.size;
  }

  onSearch(): void {
    this.filterArticles();
  }

  onFilter(): void {
    this.filterArticles();
  }

  onSort(): void {
    this.sortArticles();
    this.updatePaginatedArticles();
  }

  selectYear(year: string): void {
    this.selectedYear = this.selectedYear === year ? null : year;
    this.filterArticles();
  }

  private filterArticles(): void {
    this.filteredArticles = this.allArticles.filter(article => {
      // 搜尋文字
      const matchesSearch = !this.searchText ||
        article.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(this.searchText.toLowerCase()) ||
        article.author.includes(this.searchText);
      // 年份
      const matchesYear = !this.selectedYear ||
        article.date.startsWith(this.selectedYear);

      return matchesSearch && matchesYear ;
    });

    this.sortArticles();
    this.currentPage = 1;
    this.updatePaginatedArticles();
  }

  private sortArticles(): void {
    switch (this.sortBy) {
      case 'newest':
        this.filteredArticles.sort((a, b) =>
          new Date(b.date.replace(/\./g, '-')).getTime() - new Date(a.date.replace(/\./g, '-')).getTime()
        );
        break;
      case 'oldest':
        this.filteredArticles.sort((a, b) =>
          new Date(a.date.replace(/\./g, '-')).getTime() - new Date(b.date.replace(/\./g, '-')).getTime()
        );
        break;
      case 'title':
        this.filteredArticles.sort((a, b) => a.title.localeCompare(b.title, 'zh-TW'));
        break;
    }
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedYear = null;
    this.sortBy = 'newest';
    this.filteredArticles = [...this.allArticles];
    this.sortArticles();
    this.currentPage = 1;
    this.updatePaginatedArticles();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedArticles();

    if (this.isBrowser) {
      const section = document.querySelector('.articles-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  private updatePaginatedArticles(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedArticles = this.filteredArticles.slice(startIndex, endIndex);
  }

}
