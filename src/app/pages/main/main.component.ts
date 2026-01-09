import { Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { data } from '../../data';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
@Component({
  selector: 'app-main',
  imports: [
    CommonModule, NzLayoutModule, NzMenuModule,
    NzCarouselModule, NzCardModule, NzGridModule,
    NzDividerModule, NzButtonModule, MatTooltipModule,
    NzIconModule, NzTypographyModule, RouterOutlet,
    RouterLink, NzDrawerModule, NzDropDownModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, OnDestroy {

  @ViewChild('lawyersMenu') lawyersMenu!: NzDropdownMenuComponent;

  @ViewChild('articlesMenu') articlesMenu!: NzDropdownMenuComponent;

  lawyers: any[] = data.lawyers;

  articles: any[] = data.articles;

  offices: any[] = data.offices;

  visible: boolean = false;

  isBrowser: boolean = false;

  isSelect: boolean = false;

  sections: string[] = ['about', 'lawyers', 'articles', 'contact'];

  activeSection: string = '';

  isScrolling: boolean = false; // 鎖定狀態

  scrollHandler = this.scrollHandlerFn.bind(this);

  // 導覽列設定
  navItems = [
    { id: 'about', zh: '關於雪谷南榕', en: 'About Us', hasDropdown: false },
    { id: 'lawyers', zh: '律師簡介', en: 'Our Lawyers', hasDropdown: true },
    { id: 'articles', zh: '言論選輯', en: 'Articles', hasDropdown: true },
    { id: 'contact', zh: '聯絡我們', en: 'Contact Us', hasDropdown: false },
    { id: 'backend', zh: '管理後台', en: 'Backend', hasDropdown: false, route: '/backend/lawyers' }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      document.addEventListener('scroll', this.scrollHandler, true);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.removeEventListener('scroll', this.scrollHandler, true);
    }
  }

  // 監聽視窗大小變化，超過 920px 自動關閉抽屜
  @HostListener('window:resize', [])
  onResize(): void {
    if (this.isBrowser && window.innerWidth > 920 && this.visible) {
      this.close();
    }
  }

  /**
  * 僅當前路徑完全相等時返回 true
  * @param url
  * @returns
  */
  isActive(url: string): boolean {
    return this.router.url === url;
  }

  /**
   * 滾動後到某區塊則選中導覽列
   * @returns
   */
  scrollHandlerFn(): void {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const carouselHeight = document.querySelector('.hero-slide')?.clientHeight || 0;
    const currentPath = this.router.url.split('?')[0].split('#')[0];
    const isHomePage = currentPath === '/home' || currentPath === '/';

    if (this.isScrolling || !isHomePage) {
      if (!isHomePage) {
        this.activeSection = '';
      }
      return;
    }

    // 還在輪播區域內，不選中任何導覽
    if (scrollTop < carouselHeight - 100) {
      this.activeSection = '';
      return;
    }

    // 檢查是否滾動到底部
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const isAtBottom = scrollTop + windowHeight >= documentHeight - 50;

    // 如果在底部，選中最後一個區塊
    if (isAtBottom) {
      this.activeSection = this.sections[this.sections.length - 1]; // 'contact'
      return;
    }

    // 一般滾動判斷
    for (let i = this.sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(this.sections[i]);
      if (element && element.offsetTop <= scrollTop + 100) {
        this.activeSection = this.sections[i];
        break;
      }
    }
  }

  /**
   * 點擊導覽列跳到指定區塊
   * @param sectionId
   */
    scrollTo(sectionId: string): void {
      this.isScrolling = true;
      this.activeSection = sectionId;

      const wasDrawerOpen = this.visible;
      this.close();

      const currentPath = this.router.url.split('?')[0].split('#')[0];
      const isHomePage = currentPath === '/home' || currentPath === '/';
      const delay = wasDrawerOpen ? 400 : 0;

      if (isHomePage) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);

          if (element) {
            const headerHeight = 80;
            const targetPosition = element.offsetTop - headerHeight;

            // 直接用 body.scrollTop
            document.body.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }

          setTimeout(() => {
            this.isScrolling = false;
          }, 800);
        }, delay);
      }
      else {
        this.router.navigate(['/home'], { fragment: sectionId }).then(() => {
          setTimeout(() => {
            const element = document.getElementById(sectionId);

            if (element) {
              const headerHeight = 80;
              const targetPosition = element.offsetTop - headerHeight;

              document.body.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }
            this.isScrolling = false;
          }, 500);
        });
      }
    }

  /**
   * 抽屜選單導覽列點擊
   * @param item
   */
  handleNavClick(item: any): void {
    if (item.route) {
      this.router.navigate([item.route]);
      this.close();
    }
    else {
      this.scrollTo(item.id);
    }
  }

  /**
   * 開啟抽屜選單
   */
  open(): void {
    this.visible = true;
  }

  /**
   * 關閉抽屜選單
   */
  close(): void {
    this.visible = false;
  }

  get dropdownMenus(): { [key: string]: NzDropdownMenuComponent } {
    return {
      lawyers: this.lawyersMenu,
      articles: this.articlesMenu
    };
  }
}
