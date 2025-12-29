import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
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
      CommonModule, NzLayoutModule, NzMenuModule,
      NzCarouselModule, NzCardModule, NzGridModule,
      NzAvatarModule, NzDividerModule, NzButtonModule,
      NzIconModule, NzAnchorModule, NzTypographyModule,
      NzBackTopModule, NzTimelineModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  heroSlides = [
    {
      quote: 'Keep your eyes on the prize,\nHold on.',
      author: ''
    },
    {
      quote: 'Darkness cannot drive out darkness:\nonly light can do that.\nHate cannot drive out hate:\nonly love can do that.',
      author: 'Martin Luther King Jr.'
    },
    {
      quote: 'Where ignorance is our master,\nthere is no possibility of real peace.',
      author: 'Dalai Lama'
    }
  ];

  lawyers: Lawyer[] = [
    { id: 3, name: '邱顯智', title: '律師', avatar: '', specialty: ['人權訴訟', '刑事辯護'] },
    { id: 4, name: '劉繼蔚', title: '律師', avatar: '', specialty: ['憲法訴訟', '行政訴訟'] },
    { id: 6, name: '李宣毅', title: '律師', avatar: '', specialty: ['刑事辯護', '民事訴訟'] },
    { id: 7, name: '王逸青', title: '律師', avatar: '', specialty: ['勞動法', '民事訴訟'] },
    { id: 8, name: '余柏儒', title: '律師', avatar: '', specialty: ['刑事辯護'] },
    { id: 9, name: '吳俊龍', title: '律師', avatar: '', specialty: ['民事訴訟'] },
    { id: 11, name: '莊家亨', title: '律師', avatar: '', specialty: ['商事法'] },
    { id: 24, name: '劉育承', title: '律師', avatar: '', specialty: ['刑事辯護'] },
    { id: 28, name: '黃守鵬', title: '律師', avatar: '', specialty: ['民事訴訟'] },
  ];

  articles: Article[] = [
    { id: 45, date: '2024.02.22', title: '大法官迴避不了的憲法義務', author: '李宣毅' },
    { id: 44, date: '2019.12.06', title: '【活動介紹】2019平冤影展 – 如果 WHAT IF', author: '編輯' },
    { id: 1, date: '2019.03.05', title: '一部748法 權利義務豈容各自表述？', author: '劉繼蔚 李宣毅 洪崇晏' },
    { id: 5, date: '2017.12.09', title: '我曾天真以為這種荒謬的修法，在「點亮台灣」以後，再也不會發生了', author: '劉繼蔚' },
    { id: 4, date: '2017.07.19', title: '向黃政雄律師致敬的最佳方式', author: '李宣毅' },
    { id: 26, date: '2017.06.22', title: '自己的減刑條例自己立', author: '李宣毅' },
  ];

  offices: Office[] = [
    {
      name: '新竹所',
      address: '新竹市北區北大路179號6樓',
      tel: ['03-522-2216'],
      fax: '03-522-3126'
    },
    {
      name: '台中所',
      address: '台中市北屯區崇德路三段618號4樓',
      tel: ['04-2421-2592', '04-2421-2921'],
      fax: '04-2421-2703'
    }
  ];

  ngOnInit(): void {

  }

}
