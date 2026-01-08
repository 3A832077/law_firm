import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { RevealOnScrollDirective } from '../../../directive/reveal-on-scroll.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { data } from '../../../data';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { first } from 'rxjs';
@Component({
  selector: 'app-home',
  imports: [
    CommonModule, NzLayoutModule, NzMenuModule,
    NzCarouselModule, NzCardModule, NzGridModule,
    NzDividerModule, NzButtonModule, MatTooltipModule,
    NzIconModule, NzTypographyModule, NzDrawerModule,
    RevealOnScrollDirective,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  heroSlides = data.heroSlides;

  lawyers: any[] = data.lawyers;

  articles: any[] = data.articles.slice(0, 6);

  offices: any[] = data.offices;

  isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
        // 只在第一次載入時處理 fragment
        this.route.fragment.pipe(first()).subscribe(fragment => {
          if (fragment) {
            setTimeout(() => {
              document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          }
        });
      }
    }
}
