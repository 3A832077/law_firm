import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, input, Input } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-article-detail',
  imports: [
    CommonModule,
    RouterModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzDividerModule,
    NzAvatarModule,
    NzCardModule,
    NzAnchorModule,
    NzSkeletonModule,
  ],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css',
})
export class ArticleDetailComponent implements OnInit{

  isBrowser: boolean;

  isLoaded = false;

  readingProgress = 0;

  contentParagraphs: string[] = [];

  // 文章資料
  article: any = {
    id: 1,
    title: '大法官迴避不了的憲法義務',
    subtitle: '從司法院釋字第XXX號解釋談大法官迴避制度的憲政意涵',
    content: `
      一個公司如果因為某專家在特定領域很強，而高薪聘請該人，而當該特殊領域出現難題需要專家發揮專長時，專家卻又迴避不展露身手，公司應該會氣到立即開除該名專家。若這個見解是共識，那我們有必要檢視一下憲法法庭的迴避制度。

      法律人都知道，就算是特定法學科目的專家，該專家面對另一個法律學科時，往往也有隔行隔山之嘆。所以歷來總統於提名大法官時，會注意平衡大法官的多元組成，使大法官組成的憲法法庭，能充分匯聚不同法律專門、職業養成環境。不同法律學門、經歷和鑽研專長的專業意見，而集眾智以求憲法裁判確有普世權威性。

      這也意味著，如果有大法官必須迴避而缺席時，審查該憲法案件的憲法法庭，就會不能獲得該大法官的專長意見。如果該爭議問題所在的法學領域，恰巧落於迴避大法官的專長，且對其他大法官而言相對不那麼熟悉，憲法法庭就有可能在大法官迴避時，出現功能減損的狀態。更有趣的狀況是，通常會成為大法官的人，都是在所屬法學領域長期耕耘的資深法律人，就更有機會因為之前參與過個案（如「代理人」、「辯護人」、「公訴人」、「裁判者」、「仲裁者」等身份），而須迴避。

      由於憲法法庭處理的問題，都具有高度憲法重要性，也是國家所有紛爭解決的最後壹道防線，應盡可能讓有價值的意見都被法庭參考，這是憲法訴訟法引進法庭之友與專家諮詢制度的目的。迴避的大法官作為爭議問題領域中資深、有名望、長期耕耘研究的專家，如因迴避而將大法官隔離在案件外不能表達意見，徒然使憲法法庭失去重要意見來源，實質上有損憲法法庭的專業説服力。需要特定領域專業意見的壓力，如果導致憲法法庭成員私下請教迴避大法官，反而會讓憲法法庭的迴避制度虛有其表，而有損法庭的公正性。

      普通法院法官迴避制度，直接套用在憲法法庭，可能發生上面所指出來的雙重弊端：有害專業公信力和法庭公正性。本文倒是認為這兩個弊端都是可以避免的。基於利益衝突迴避原則，為維護法庭的公正性，保障人民受公平審判的權利，憲法法庭當然不可能因為求取迴避大法官的專業而放棄迴避制度。但既然法庭成員的專業意見不可或缺（這也是該專業人士出任大法官的理由），為了避免利益衝突，只要陷於利益衝突狀態的大法官不能參與案件評議及決斷即可。而為了不讓他的專業意見在法庭上缺席，憲法法庭應該依職權要求迴避大法官，在揭露利害關係後，以專家或案件關係人的身分，向法庭提供專業意見，公開接受詰問。

      或有擔憂，迴避大法官提出的意見會壓制、導引其他法庭成員。但適應不同意見來源的壓力，本就是法官的日常。若有人承受不了，那該是提名時的錯誤。於提出意見、又受到公開詰問的正當程序後，沒有決定權的大法官變成實質專家證人。其餘在各法律領域千錘百煉的大法官，面對專家證人的意見跟即席回答後，自然會在評議時互相促成更成熟的結論。

      以上的建議無需修法、可立即操作於法庭程序。這是迴避大法官/憲法法庭作為憲法守護者，各自不可迴避的憲法義務，也應該是公民頭家在聘任大法官時的合理期待。
    `,
    author: '李宣毅',
    date: '2024.02.22',
    updateDate: '2024.03.15',
    readTime: 12,
  };


  // 上下篇
  prevArticle: any | null = {
    id: 6,
    title: '自己的減刑條例自己立',
    date: '2017.06.22',
    category: '法律評論',
    excerpt: ''
  };

  nextArticle: any | null = {
    id: 2,
    title: '【活動介紹】2019平冤影展 – 如果 WHAT IF',
    date: '2019.12.06',
    category: '活動紀錄',
    excerpt: ''
  };

  // 相關文章
  relatedArticles: any[] = [
    {
      id: 7,
      title: '死刑存廢的思辨：從國際人權標準談起',
      date: '2023.08.15',
      category: '人權議題',
      excerpt: '死刑議題在台灣社會持續引發討論，本文從國際人權公約出發，探討死刑存廢的法律與倫理面向...'
    },
    {
      id: 8,
      title: '轉型正義的未竟之路',
      date: '2023.05.20',
      category: '司法改革',
      excerpt: '促進轉型正義委員會解散後，轉型正義的工作並未完成。本文檢視過去幾年的成果與未來的挑戰...'
    },
    {
      id: 9,
      title: '國民法官制度上路一週年回顧',
      date: '2024.01.10',
      category: '司法改革',
      excerpt: '國民法官制度實施滿一年，本文從實務運作角度，分析制度的優缺點與改進空間...'
    }
  ];

  @Input() id = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.contentParagraphs = this.article.content.split('\n\n').map((p: string) => p.trim()).filter((p: string | any[]) => p.length > 0);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.isLoaded = true;
      }, 100);
    }
  }


}
