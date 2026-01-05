import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
@Component({
  selector: 'app-home',
  imports: [
    CommonModule, NzLayoutModule, NzMenuModule,
    NzCarouselModule, NzCardModule, NzGridModule,
    NzDividerModule, NzButtonModule, MatTooltipModule,
    NzIconModule, NzTypographyModule, NzDrawerModule,
    RevealOnScrollDirective
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
