interface Lawyer {
  id: number;
  name: string;
  title: string;
  avatar: string;
  specialty?: string;
  experience?: string;
  education?: string;
  introduction?: string;
}

interface Article {
  id: number;
  date: string;
  title: string;
  author: string;
  content?: string;
  reference?: string;
  imageUrl?: string;
  excerpt?: string
}

interface Office {
  name: string;
  address: string;
  tel: string[];
  fax: string;
}

interface Reserve {
  number: string,
  name: string,
  date: string,
  time: string,
  remark?: string
}
export const data: { heroSlides: any[]; lawyers: Lawyer[]; articles: Article[]; offices: Office[], reserves: Reserve[] } = {
  heroSlides: [
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
  ],
  lawyers:  [
    { id: 3, name: '邱顯智', title: '律師', avatar: 'lawyer1.jpg', },
    { id: 4, name: '劉繼蔚', title: '律師', avatar: 'lawyer2.jpg', },
    { id: 6, name: '李宣毅', title: '律師', avatar: 'lawyer3.jpg', },
    { id: 7, name: '王逸青', title: '律師', avatar: 'lawyer4.jpg', },
    { id: 8, name: '余柏儒', title: '律師', avatar: 'lawyer5.jpg', },
    { id: 9, name: '吳俊龍', title: '律師', avatar: 'lawyer6.jpg', },
    { id: 11, name: '莊家亨', title: '律師', avatar: 'lawyer7.jpg', },
    { id: 24, name: '劉育承', title: '律師', avatar: 'lawyer8.jpg', },
    { id: 28, name: '黃守鵬', title: '律師', avatar: 'lawyer9.jpg', },
  ],
  articles: [
    {
      id: 1,
      title: '大法官迴避不了的憲法義務',
      excerpt: '近期大法官迴避爭議再起，本文從憲法解釋的角度，探討大法官在審理案件時的迴避義務與界限，以及這對司法公信力的深遠影響...',
      author: '李宣毅',
      date: '2024.02.22',
    },
    {
      id: 2,
      title: '【活動介紹】2019平冤影展 – 如果 WHAT IF',
      excerpt: '平冤影展邁入第五屆，今年以「如果 WHAT IF」為主題，透過影像敘事，帶領觀眾思考冤案背後的制度性問題...',
      author: '編輯部',
      date: '2019.12.06',
    },
    {
      id: 3,
      title: '一部748法 權利義務豈容各自表述？',
      excerpt: '司法院釋字第748號解釋後，立法院通過《司法院釋字第七四八號解釋施行法》，然而條文內容是否真正落實婚姻平權的精神？',
      author: '劉繼蔚、李宣毅、洪崇晏',
      date: '2019.03.05',
    },
    {
      id: 4,
      title: '我曾天真以為這種荒謬的修法，在「點亮台灣」以後，再也不會發生了',
      excerpt: '回顧近年修法歷程，某些立法過程的草率與荒謬，讓人不禁懷疑民主法治的進程是否真的持續前進...',
      author: '劉繼蔚',
      date: '2017.12.09',
    },
    {
      id: 5,
      title: '向黃政雄律師致敬的最佳方式',
      excerpt: '黃政雄律師一生致力於人權保障與司法改革，他的離去是法律界的重大損失。我們應當如何延續他的理念與精神？',
      author: '李宣毅',
      date: '2017.07.19',
    },
    {
      id: 6,
      title: '自己的減刑條例自己立',
      excerpt: '減刑條例的立法過程與適用範圍，往往引發社會爭議。本文從法律專業角度，分析減刑條例的利弊與改革方向...',
      author: '李宣毅',
      date: '2017.06.22',
    },
    {
      id: 7,
      title: '死刑存廢的思辨：從國際人權標準談起',
      excerpt: '死刑議題在台灣社會持續引發討論，本文從國際人權公約出發，探討死刑存廢的法律與倫理面向...',
      author: '邱顯智',
      date: '2023.08.15',
    },
    {
      id: 8,
      title: '轉型正義的未竟之路',
      excerpt: '促進轉型正義委員會解散後，轉型正義的工作並未完成。本文檢視過去幾年的成果與未來的挑戰...',
      author: '劉繼蔚',
      date: '2023.05.20',
    },
    {
      id: 9,
      title: '國民法官制度上路一週年回顧',
      excerpt: '國民法官制度實施滿一年，本文從實務運作角度，分析制度的優缺點與改進空間...',
      author: '王逸青',
      date: '2024.01.10',
    },
    {
      id: 10,
      title: '勞動事件法施行後的實務觀察',
      excerpt: '勞動事件法的施行對勞資爭議處理帶來重大變革，本文從律師實務角度分享經驗與觀察...',
      author: '王逸青',
      date: '2022.11.30',
    },
    {
      id: 11,
      title: '言論自由的邊界：從網路誹謗案談起',
      excerpt: '網路時代言論自由與名譽權的衝突日益頻繁，本文從近期判決分析言論自由的保障與限制...',
      author: '余柏儒',
      date: '2022.09.18',
    },
    {
      id: 12,
      title: '環境訴訟的挑戰與突破',
      excerpt: '面對氣候變遷與環境破壞，環境訴訟成為重要的救濟途徑。本文探討台灣環境訴訟的現況與發展...',
      author: '莊家亨',
      date: '2023.04.22',
    },
  ],
  offices: [
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
  ],
  reserves: [
    {
      number: '1',
      name: '王先生',
      date: '2025/12/31',
      time: '10:00',
    }
  ]
}
