import { Component, OnInit, Inject, PLATFORM_ID, Input } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

@Component({
  selector: 'app-lawyer-deatil',
  imports: [
    CommonModule,
    RouterModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzDividerModule,
    NzCardModule,
    NzGridModule,
    NzTimelineModule,
    NzTabsModule,
    NzCollapseModule,
  ],
  templateUrl: './lawyer-deatil.component.html',
  styleUrl: './lawyer-deatil.component.css',
})
export class LawyerDeatilComponent implements OnInit{

  isBrowser: boolean;

  @Input() id = '';

  // 律師資料
  lawyer: any = {
    id: 1,
    name: '李宣毅',
    englishName: 'Hsuan-Yi Lee',
    title: '主持律師',
    avatar: 'lawyer3.jpg',
    specialty: ['刑事辯護', '人權訴訟', '憲法訴訟'],
    email: 'lee@banyanlaw.com',
    phone: '03-522-2216',
    motto: '在價值追求的道路上，並不是因為有希望所以堅持，而是因為堅持，才看見希望。',
    languages: ['中文', '英文', '台語'],
    education: [
      { degree: '法學碩士', school: '國立台灣大學法律學研究所', major: '刑事法學組', year: '2010' },
      { degree: '法學學士', school: '國立台灣大學法律學系', year: '2006' },
    ],
    experience: [
      { position: '主持律師', organization: '雪谷南榕法律事務所', period: '2014 - 迄今', current: true },
      { position: '執業律師', organization: '德晴法律事務所', period: '2011 - 2014' },
      { position: '法務專員', organization: '台灣人權促進會', period: '2009 - 2011' },
    ],
    expertise: [
      { area: '刑事辯護', description: '重大刑事案件辯護、偵查程序權利保障、冤案救援', icon: '⚖️' },
      { area: '人權訴訟', description: '公民政治權利、集會遊行、言論自由案件', icon: '🏛️' },
      { area: '憲法訴訟', description: '憲法解釋聲請、法規違憲審查', icon: '📜' },
      { area: '行政訴訟', description: '國家賠償、行政處分救濟', icon: '📋' },
    ],
    cases: [
      '洪仲丘案義務辯護律師團',
      '太陽花學運相關案件辯護',
      '多起死刑案件辯護與救援',
      '318 佔領立法院案辯護律師',
      '鄭性澤案再審辯護律師',
    ],
    publications: [
      { title: '大法官迴避不了的憲法義務', type: '專文', year: '2024' },
      { title: '刑事訴訟中的正當程序保障', type: '論文', year: '2022' },
      { title: '冤案救援的法律與實務', type: '專書', year: '2020' },
      { title: '言論自由的界限與保障', type: '專文', year: '2019' },
    ],
    awards: ['2018 法扶基金會傑出公益律師獎'],
  };


  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'img/default-avatar.png';
  }
}
