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
import { NzResultModule } from 'ng-zorro-antd/result';
import { DataService } from '../../../../services/data.service';

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
    NzResultModule,
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
    email: '',
    phone: '',
    motto: '在價值追求的道路上，並不是因為有希望所以堅持，而是因為堅持，才看見希望。',
    languages: ['中文', '英文', '台語'],
    education: [
      { degree: '法學士', school: '政治大學' },
      { degree: '刑事法組碩士', school: '東吳大學法研所' },
      { degree: '法律碩士', school: '美國芝加哥西北大學' },
    ],
    experience: [
      { position: '常務執行委員', organization: '民間司法改革基金會'},
      { position: '主任委員', organization: '台中律師公會刑事委員會',  },
      { position: '主任委員', organization: '台中律師公會人權保障委員會', },
      { position: '分會理事長', organization: '國際特赦組織', },
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
  };


  notFound = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
    private dataService: DataService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.dataService.lawyers$.subscribe(lawyers => {
      const found = lawyers.find(l => String(l.id) === String(this.id));
      if (found) {
        this.lawyer = { ...this.lawyer, ...found };
      } else {
        this.notFound = true;
      }
    }).unsubscribe();
  }

}
