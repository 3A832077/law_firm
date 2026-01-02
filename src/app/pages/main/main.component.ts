import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { data } from '../../data';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-main',
  imports: [
    CommonModule, NzLayoutModule, NzMenuModule,
    NzCarouselModule, NzCardModule, NzGridModule,
    NzAvatarModule, NzDividerModule, NzButtonModule,
    NzIconModule, NzAnchorModule, NzTypographyModule,
    NzTimelineModule, RouterLink, NzDrawerModule,
    MatTooltipModule, RouterOutlet
],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {

  heroSlides = data.heroSlides;

  lawyers: any[] = data.lawyers;

  articles: any[] = data.articles;

  offices: any[] = data.offices;

  visible = false;

  isBrowser = false;

  // 紀錄目前亮起的是哪個區塊 ID
  currentSection = '';

  // 觀察者物件
  private observer: IntersectionObserver | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {

  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  scrollTo(id: string, ev?: MouseEvent) {
    ev?.preventDefault();

    const target = document.getElementById(id);
    if (!target) return;

    const headerH = 80; // 你的 header 高度
    const extraGap = 12;

    // 找出實際的滾動容器：優先找 layout/content 內有 overflow 的那個
    const scrollParent = this.findScrollContainer(target);

    // target 相對 scrollParent 的 top
    const targetTop = this.getOffsetTopWithin(target, scrollParent);
    const top = Math.max(0, targetTop - headerH - extraGap);

    scrollParent.scrollTo({ top, behavior: 'smooth' });
  }

  /** 找到真正負責滾動的容器 */
  private findScrollContainer(el: HTMLElement): HTMLElement {
    // 如果 body/window 在滾，document.scrollingElement 會是 html 或 body
    const docScroller = (document.scrollingElement as HTMLElement) || document.documentElement;

    // 往上找第一個可滾動的 parent
    let cur: HTMLElement | null = el.parentElement;
    while (cur) {
      const style = getComputedStyle(cur);
      const overflowY = style.overflowY;
      const canScroll = (overflowY === 'auto' || overflowY === 'scroll') && cur.scrollHeight > cur.clientHeight;
      if (canScroll) return cur;
      cur = cur.parentElement;
    }

    // 沒找到就回退到 document scroller（window）
    return docScroller;
  }

  /** 計算 el 在 container 內的 offsetTop */
  private getOffsetTopWithin(el: HTMLElement, container: HTMLElement): number {
    const elRect = el.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();

    // container 是 document scroller 的話，用 window.scrollY
    const isDoc = container === document.documentElement || container === document.body || container === document.scrollingElement;
    if (isDoc) return elRect.top + window.scrollY;

    // 否則用 container.scrollTop
    return elRect.top - cRect.top + container.scrollTop;
  }



}
