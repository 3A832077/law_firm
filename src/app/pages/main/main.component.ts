import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
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
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { data } from '../../data';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-main',
  imports: [
    CommonModule, NzLayoutModule, NzMenuModule,
    NzCarouselModule, NzCardModule, NzGridModule,
    NzDividerModule, NzButtonModule, MatTooltipModule,
    NzIconModule, NzTypographyModule, RouterOutlet,
    RouterLink, NzDrawerModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, OnDestroy {

  heroSlides: any[] = data.heroSlides;

  lawyers: any[] = data.lawyers;

  articles: any[] = data.articles;

  offices: any[] = data.offices;

  visible: boolean = false;

  isBrowser: boolean = false;

  isSelect: boolean = false;

  sections: string[] = ['about', 'lawyers', 'articles', 'contact'];

  activeSection: string = 'about';

  isScrolling: boolean = false; // 鎖定狀態

  scrollHandler = this.scrollHandlerFn.bind(this);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
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

  /**
   * 滾動後到某區塊則選中導覽列
   * @returns
   */
  scrollHandlerFn(): void {
    // 如果正在滾動中，不更新 activeSection
    if (this.isScrolling) return;

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollCenter = scrollTop + windowHeight / 3;

    for (let i = this.sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(this.sections[i]);
      if (element && element.offsetTop <= scrollCenter) {
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
    // 點擊時鎖定，防止滾動過程中亂跳
    this.isScrolling = true;
    this.activeSection = sectionId;

    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });

    // 滾動完成後解除鎖定
    setTimeout(() => {
      this.isScrolling = false;
    }, 500);

    this.close();
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

}
