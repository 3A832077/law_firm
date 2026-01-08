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

  // 文章資料
  article: any = {
    id: 1,
    title: '大法官迴避不了的憲法義務',
    subtitle: '從司法院釋字第XXX號解釋談大法官迴避制度的憲政意涵',
    content: `
      <h2 id="section-1">一、前言：迴避爭議的緣起</h2>
      <p>近期，大法官審理案件的迴避問題再度成為社會關注焦點。迴避制度作為確保司法公正的重要機制，其適用範圍與界限，不僅涉及個案正義的實現，更關係到憲法法庭的公信力與正當性。</p>
      <p>本文將從憲法解釋的角度出發，探討大法官在審理案件時的迴避義務，並分析現行制度的問題與改革方向。</p>
      <blockquote>
        「司法的公正，不僅要實現，更要以看得見的方式實現。」這句法諺深刻點出了迴避制度的核心價值。
      </blockquote>

      <h2 id="section-2">二、迴避制度的憲法基礎</h2>
      <p>迴避制度的憲法基礎，主要源自於正當法律程序原則（Due Process of Law）與公平審判原則。我國憲法第16條保障人民的訴訟權，其內涵不僅包括接近法院的權利，更包括獲得公正審判的權利。</p>

      <h3 id="section-2-1">（一）正當法律程序原則</h3>
      <p>正當法律程序原則要求，任何人不得在自己的案件中擔任法官（Nemo judex in causa sua）。這項原則源自自然正義的要求，是法治國家不可或缺的基本原則。</p>

      <h3 id="section-2-2">（二）公平審判原則</h3>
      <p>公平審判原則要求審判者必須具備獨立性與中立性。獨立性指的是不受外部壓力干預；中立性則要求審判者對案件當事人不得有偏見或預斷。</p>

      <h2 id="section-3">三、大法官迴避的特殊性</h2>
      <p>大法官與一般法官不同，其職責在於解釋憲法、統一解釋法令，以及審理政黨違憲解散案件與總統、副總統彈劾案件。這些職權的特殊性，使得大法官的迴避問題更加複雜。</p>
      <p>首先，憲法解釋往往涉及抽象的法律問題，而非具體的事實爭議。大法官在學術研究或社會參與中，難免對特定法律議題形成見解。若以此作為迴避事由，恐將導致具有專業素養的大法官反而無法參與相關案件的審理。</p>
      <p>其次，憲法法庭的組成人數有限，若過度適用迴避規定，可能影響憲法法庭的運作效能，甚至造成無法達成法定人數的困境。</p>

      <h2 id="section-4">四、現行制度的問題檢討</h2>
      <p>現行憲法訴訟法雖然規定了大法官的迴避事由，但在實務運作上仍存在諸多問題：</p>
      <ul>
        <li><strong>迴避事由的認定標準不明確</strong>：何種情形構成「足認其執行職務有偏頗之虞」，欠缺具體標準。</li>
        <li><strong>聲請迴避的程序保障不足</strong>：當事人聲請大法官迴避的程序，相較於普通法院較為簡略。</li>
        <li><strong>自行迴避的裁量空間過大</strong>：大法官是否自行迴避，往往取決於個人判斷，欠缺外部監督機制。</li>
      </ul>

      <h2 id="section-5">五、比較法的觀察</h2>
      <p>觀察其他國家的憲法法院或最高法院，對於法官迴避問題也各有不同的處理方式。美國聯邦最高法院採取較為寬鬆的態度，大法官自行決定是否迴避；德國聯邦憲法法院則有較為詳細的迴避規定。</p>
      <p>這些比較法的經驗，可以作為我國制度改革的參考，但也必須考量我國的憲政脈絡與實際需要。</p>

      <h2 id="section-6">六、結論與建議</h2>
      <p>迴避制度的目的，在於確保審判的公正性與公信力。對於大法官而言，如何在維護司法公正與確保憲法法庭有效運作之間取得平衡，是制度設計的核心課題。</p>
      <p>本文建議：</p>
      <ul>
        <li>明確化迴避事由的認定標準，提供更具體的指引。</li>
        <li>強化聲請迴避的程序保障，賦予當事人更充分的陳述機會。</li>
        <li>建立大法官迴避決定的公開說明機制，增進透明度。</li>
        <li>適度調整憲法法庭的組成規定，因應迴避可能造成的人數不足問題。</li>
      </ul>
      <p>唯有透過制度的持續完善，才能使憲法法庭在追求實質正義的同時，也能獲得人民的信賴與支持。</p>
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
    private route: ActivatedRoute,
    private message: NzMessageService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // 實際應用中，這裡會根據路由參數載入文章
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.isLoaded = true;
      }, 100);
    }
  }


}
