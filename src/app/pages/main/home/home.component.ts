import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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
import { RevealOnScrollDirective } from '../../../directive/reveal-on-scroll.directive';
import { data } from '../../../data';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-home',
  imports: [
    CommonModule, NzLayoutModule, NzMenuModule,
    NzCarouselModule, NzCardModule, NzGridModule,
    NzAvatarModule, NzDividerModule, NzButtonModule,
    NzIconModule, NzAnchorModule, NzTypographyModule,
    NzTimelineModule, NzDrawerModule, RevealOnScrollDirective,
    MatTooltipModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  heroSlides = data.heroSlides;

  lawyers: any[] = data.lawyers;

  articles: any[] = data.articles;

  offices: any[] = data.offices;

  constructor(){}

  ngOnInit(): void {

  }

}
