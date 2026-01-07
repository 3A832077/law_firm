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

  // 選項
  categories = ['法律評論', '人權議題', '司法改革', '社會觀察', '活動紀錄'];
  years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];
  popularTags = ['人權', '憲法', '司法改革', '死刑', '轉型正義', '言論自由'];

  // 文章資料
  allArticles: any[] = [
    {
      id: 1,
      title: '大法官迴避不了的憲法義務',
      excerpt: '近期大法官迴避爭議再起，本文從憲法解釋的角度，探討大法官在審理案件時的迴避義務與界限，以及這對司法公信力的深遠影響...',
      author: '李宣毅',
      date: '2024.02.22',
      category: '法律評論',
      tags: ['憲法', '大法官', '司法改革'],
      readTime: 8,
      featured: true
    },
    {
      id: 2,
      title: '【活動介紹】2019平冤影展 – 如果 WHAT IF',
      excerpt: '平冤影展邁入第五屆，今年以「如果 WHAT IF」為主題，透過影像敘事，帶領觀眾思考冤案背後的制度性問題...',
      author: '編輯部',
      date: '2019.12.06',
      category: '活動紀錄',
      tags: ['平冤', '影展', '冤案'],
      readTime: 5
    },
    {
      id: 3,
      title: '一部748法 權利義務豈容各自表述？',
      excerpt: '司法院釋字第748號解釋後，立法院通過《司法院釋字第七四八號解釋施行法》，然而條文內容是否真正落實婚姻平權的精神？',
      author: '劉繼蔚、李宣毅、洪崇晏',
      date: '2019.03.05',
      category: '人權議題',
      tags: ['婚姻平權', '同婚', '釋字748'],
      readTime: 12
    },
    {
      id: 4,
      title: '我曾天真以為這種荒謬的修法，在「點亮台灣」以後，再也不會發生了',
      excerpt: '回顧近年修法歷程，某些立法過程的草率與荒謬，讓人不禁懷疑民主法治的進程是否真的持續前進...',
      author: '劉繼蔚',
      date: '2017.12.09',
      category: '社會觀察',
      tags: ['修法', '立法院', '民主'],
      readTime: 10
    },
    {
      id: 5,
      title: '向黃政雄律師致敬的最佳方式',
      excerpt: '黃政雄律師一生致力於人權保障與司法改革，他的離去是法律界的重大損失。我們應當如何延續他的理念與精神？',
      author: '李宣毅',
      date: '2017.07.19',
      category: '社會觀察',
      tags: ['人權', '律師', '紀念'],
      readTime: 7
    },
    {
      id: 6,
      title: '自己的減刑條例自己立',
      excerpt: '減刑條例的立法過程與適用範圍，往往引發社會爭議。本文從法律專業角度，分析減刑條例的利弊與改革方向...',
      author: '李宣毅',
      date: '2017.06.22',
      category: '法律評論',
      tags: ['減刑', '刑事法', '立法'],
      readTime: 9
    },
    {
      id: 7,
      title: '死刑存廢的思辨：從國際人權標準談起',
      excerpt: '死刑議題在台灣社會持續引發討論，本文從國際人權公約出發，探討死刑存廢的法律與倫理面向...',
      author: '邱顯智',
      date: '2023.08.15',
      category: '人權議題',
      tags: ['死刑', '人權', '國際公約'],
      readTime: 15
    },
    {
      id: 8,
      title: '轉型正義的未竟之路',
      excerpt: '促進轉型正義委員會解散後，轉型正義的工作並未完成。本文檢視過去幾年的成果與未來的挑戰...',
      author: '劉繼蔚',
      date: '2023.05.20',
      category: '司法改革',
      tags: ['轉型正義', '促轉會', '歷史正義'],
      readTime: 11
    },
    {
      id: 9,
      title: '國民法官制度上路一週年回顧',
      excerpt: '國民法官制度實施滿一年，本文從實務運作角度，分析制度的優缺點與改進空間...',
      author: '王逸青',
      date: '2024.01.10',
      category: '司法改革',
      tags: ['國民法官', '司法改革', '審判制度'],
      readTime: 10
    },
    {
      id: 10,
      title: '勞動事件法施行後的實務觀察',
      excerpt: '勞動事件法的施行對勞資爭議處理帶來重大變革，本文從律師實務角度分享經驗與觀察...',
      author: '王逸青',
      date: '2022.11.30',
      category: '法律評論',
      tags: ['勞動法', '勞動事件法', '勞資爭議'],
      readTime: 8
    },
    {
      id: 11,
      title: '言論自由的邊界：從網路誹謗案談起',
      excerpt: '網路時代言論自由與名譽權的衝突日益頻繁，本文從近期判決分析言論自由的保障與限制...',
      author: '余柏儒',
      date: '2022.09.18',
      category: '法律評論',
      tags: ['言論自由', '誹謗', '網路法律'],
      readTime: 9
    },
    {
      id: 12,
      title: '環境訴訟的挑戰與突破',
      excerpt: '面對氣候變遷與環境破壞，環境訴訟成為重要的救濟途徑。本文探討台灣環境訴訟的現況與發展...',
      author: '莊家亨',
      date: '2023.04.22',
      category: '法律評論',
      tags: ['環境法', '氣候訴訟', 'ESG'],
      readTime: 12
    },
  ];

  filteredArticles: any[] = [];
  paginatedArticles: any[] = [];
  featuredArticle: any | null = null;
  popularArticles: any[] = [];

  // 統計
  categoryStats: { name: string; count: number }[] = [];
  yearStats: { year: string; count: number }[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    // 設定精選文章
    this.featuredArticle = this.allArticles.find(a => a.featured) || this.allArticles[0];

    // 設定熱門文章
    this.popularArticles = this.allArticles.slice(0, 5);

    // 計算分類統計
    this.categoryStats = this.categories.map(cat => ({
      name: cat,
      count: this.allArticles.filter(a => a.category === cat).length
    })).filter(c => c.count > 0);

    // 計算年度統計
    this.yearStats = this.years.map(year => ({
      year,
      count: this.allArticles.filter(a => a.date.startsWith(year)).length
    })).filter(y => y.count > 0);

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

  toggleTag(tag: string): void {
    this.selectedTag = this.selectedTag === tag ? null : tag;
    this.filterArticles();
  }

  selectCategory(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? null : category;
    this.filterArticles();
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

      // 分類
      const matchesCategory = !this.selectedCategory ||
        article.category === this.selectedCategory;

      // 年份
      const matchesYear = !this.selectedYear ||
        article.date.startsWith(this.selectedYear);

      // 標籤
      const matchesTag = !this.selectedTag ||
        article.tags.includes(this.selectedTag);

      return matchesSearch && matchesCategory && matchesYear && matchesTag;
    });

    this.sortArticles();
    this.currentPage = 1;
    this.updatePaginatedArticles();
  }

  private sortArticles(): void {
    switch (this.sortBy) {
      case 'newest':
        this.filteredArticles.sort((a, b) =>
          new Date(b.date.replace(/\./g, '-')).getTime() -
          new Date(a.date.replace(/\./g, '-')).getTime()
        );
        break;
      case 'oldest':
        this.filteredArticles.sort((a, b) =>
          new Date(a.date.replace(/\./g, '-')).getTime() -
          new Date(b.date.replace(/\./g, '-')).getTime()
        );
        break;
      case 'title':
        this.filteredArticles.sort((a, b) => a.title.localeCompare(b.title, 'zh-TW'));
        break;
    }
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedCategory = null;
    this.selectedYear = null;
    this.selectedTag = null;
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

  getArticleNumber(index: number): string {
    const num = (this.currentPage - 1) * this.pageSize + index + 1;
    return num.toString().padStart(2, '0');
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      '法律評論': 'green',
      '人權議題': 'gold',
      '司法改革': 'blue',
      '社會觀察': 'purple',
      '活動紀錄': 'cyan'
    };
    return colors[category] || 'default';
  }
}
