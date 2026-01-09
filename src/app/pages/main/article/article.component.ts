import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { data } from '../../../data';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

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
    NzBreadCrumbModule,
    NzPaginationModule,
    NzDividerModule,
    NzPageHeaderModule,
    NzDatePickerModule
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit{

  isBrowser: boolean;

  // 篩選
  searchText = '';

  selectedCategory: string | null = null;

  sortBy = 'newest';

  // 分頁
  currentPage = 1;

  pageSize = 10;

  // 文章資料
  allArticles: any[] = data.articles;

  filteredArticles: any[] = [];

  paginatedArticles: any[] = [];

  yearStats: { year: string; count: number }[] = [];

  selectedYearDate: Date | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.filteredArticles = [...this.allArticles];
    this.sortArticles();
    this.updatePaginatedArticles();
  }

  /**
   * 取得作者
   * @returns
   */
  getUniqueAuthors(): number {
    const authors = new Set(this.allArticles.map(a => a.author));
    return authors.size;
  }

  /**
   * 選擇的年改為字串
   */
  get selectedYear(): string | null {
    return this.selectedYearDate?.getFullYear()?.toString() ?? null;
  }

  /**
   * 排序改變
   */
  onSort(): void {
    this.sortArticles();
    this.updatePaginatedArticles();
  }

  /**
   * 搜尋文章&篩選年份
   */
  filterArticles(): void {
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

  /**
   * 排序
   */
  sortArticles(): void {
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

  /**
   * 重置篩選條件
   */
  resetFilters(): void {
    this.searchText = '';
    this.selectedYearDate = null;
    this.sortBy = 'newest';
    this.filteredArticles = [...this.allArticles];
    this.sortArticles();
    this.currentPage = 1;
    this.updatePaginatedArticles();
  }

  /**
   * 換頁
   * @param page
   */
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedArticles();
  }

  /**
   * 換頁列表改變
   */
  updatePaginatedArticles(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedArticles = this.filteredArticles.slice(startIndex, endIndex);
  }

  /**
   * 返回首頁
   */
  onBack(){
    this.router.navigate(['/home']);
  }

}
