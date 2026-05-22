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
    { id: 3, name: '陳志明', title: '律師', avatar: 'lawyer1.jpg', },
    { id: 4, name: '林建宏', title: '律師', avatar: 'lawyer2.jpg', },
    { id: 6, name: '張文豪', title: '律師', avatar: 'lawyer3.jpg', },
    { id: 7, name: '黃俊傑', title: '律師', avatar: 'lawyer4.jpg', },
    { id: 8, name: '吳明德', title: '律師', avatar: 'lawyer5.jpg', },
    { id: 9, name: '劉承恩', title: '律師', avatar: 'lawyer6.jpg', },
    { id: 11, name: '蔡宗翰', title: '律師', avatar: 'lawyer7.jpg', },
    { id: 24, name: '鄭世傑', title: '律師', avatar: 'lawyer8.jpg', },
    { id: 28, name: '許家豪', title: '律師', avatar: 'lawyer9.jpg', },
  ],
  articles: [
    {
      id: 1,
      title: '大法官迴避不了的憲法義務',
      excerpt: '近期大法官迴避爭議再起，本文從憲法解釋的角度，探討大法官在審理案件時的迴避義務與界限，以及這對司法公信力的深遠影響...',
      author: '張文豪',
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
      author: '林建宏、張文豪、許家維',
      date: '2019.03.05',
    },
    {
      id: 4,
      title: '我曾天真以為這種荒謬的修法，在「點亮台灣」以後，再也不會發生了',
      excerpt: '回顧近年修法歷程，某些立法過程的草率與荒謬，讓人不禁懷疑民主法治的進程是否真的持續前進...',
      author: '林建宏',
      date: '2017.12.09',
    },
    {
      id: 5,
      title: '向張大明律師致敬的最佳方式',
      excerpt: '張大明律師一生致力於人權保障與司法改革，他的離去是法律界的重大損失。我們應當如何延續他的理念與精神？',
      author: '張文豪',
      date: '2017.07.19',
    },
    {
      id: 6,
      title: '自己的減刑條例自己立',
      excerpt: '減刑條例的立法過程與適用範圍，往往引發社會爭議。本文從法律專業角度，分析減刑條例的利弊與改革方向...',
      author: '張文豪',
      date: '2017.06.22',
    },
    {
      id: 7,
      title: '開窗照入陽光 不等於開門引來惡客',
      excerpt: '最近因為某會議遭媒體披露的各種「八卦內幕」，法庭直播突又熱議起來...',
      author: '林建宏',
      date: '2017.05.01',
    },
    {
      id: 8,
      title: '#神仙大法官下凡來',
      excerpt: '上個月24日，大法官會議為同性婚姻的憲法爭議，召開言詞辯論。席間機關代理人及部分大法官的問題...',
      author: '林建宏',
      date: '2017.04.23',
    },
    {
      id: 9,
      title: '#不想交朋友的憲法法院',
      excerpt: '司法院大法官為同性婚姻釋憲案召開言詞辯論，因近年模擬憲法法庭的操練，各界開始認識...',
      author: '林建宏',
      date: '2017.03.23',
    },
    {
      id: 10,
      title: '大法官的連任與不得連任：某大法官獲提名為司法院長究竟有無違憲？',
      excerpt: '近日因為法學界素孚眾望的前大法官某教授，經總統提名為新任司法院長，因而在輿論間...',
      author: '黃俊傑',
      date: '2016.09.06',
    },
    {
      id: 11,
      title: '500元賠償 衝擊手機軟體業',
      excerpt: '日前，有熟稔個人資料保護法的民眾，很技巧地透過個人資料保護法第廿八條第三項，向手機...',
      author: '張文豪',
      date: '2014.11.13',
    },
    {
      id: 12,
      title: '那些當事人教我的事：陳某某案20年了，這樣遲來的正義，不是正義',
      excerpt: '我知道陳某某，是在學校的時候，講某重大冤案，講到原因案件的陳某某...',
      author: '林建宏',
      date: '2015.09.09',
    },
  ],
  offices: [
    {
      name: '台北所',
      address: '台北市中正區中山南路100號5樓',
      tel: ['02-2345-6789'],
      fax: '02-2345-6798'
    },
    {
      name: '台中所',
      address: '台中市西屯區台灣大道三段100號8樓',
      tel: ['04-2345-6789', '04-2345-6790'],
      fax: '04-2345-6791'
    }
  ],
  reserves: [
    {
      number: '1',
      name: '李先生',
      date: '2025/12/31',
      time: '10:00',
    }
  ]
}
