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
    { id: 45, date: '2024.02.22', title: '大法官迴避不了的憲法義務', author: '李宣毅' },
    { id: 44, date: '2019.12.06', title: '【活動介紹】2019平冤影展 – 如果 WHAT IF', author: '編輯' },
    { id: 1, date: '2019.03.05', title: '一部748法 權利義務豈容各自表述？', author: '劉繼蔚 李宣毅 洪崇晏' },
    { id: 5, date: '2017.12.09', title: '我曾天真以為這種荒謬的修法，在「點亮台灣」以後，再也不會發生了', author: '劉繼蔚' },
    { id: 4, date: '2017.07.19', title: '向黃政雄律師致敬的最佳方式', author: '李宣毅' },
    { id: 26, date: '2017.06.22', title: '自己的減刑條例自己立', author: '李宣毅' },
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
