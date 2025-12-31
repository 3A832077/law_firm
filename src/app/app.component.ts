import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
import { RevealOnScrollDirective } from './directive/reveal-on-scroll.directive';
interface Lawyer {
  id: number;
  name: string;
  title: string;
  avatar: string;
  specialty: string[];
}

interface Article {
  id: number;
  date: string;
  title: string;
  author: string;
}

interface Office {
  name: string;
  address: string;
  tel: string[];
  fax: string;
}
@Component({
    selector: 'app-root',
    imports: [
     RouterOutlet
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {

  }


}
