import { ArticleType } from 'types';

const articles = [
  {
    slug: 'drome-and-vercors',
    title: 'A Journey through Drome and Vercors',
    intro:
      'How to travel the heart of France in 10 days? Discover a catchy journey in Drome and Vercors through charming villages, thrilling adventures and delightful moments.',
    img: '/images/articles/drome-and-vercors.jpg',
    published: '2023-12-06',
    modified: '2023-12-06',
    lang: 'en',
    en: '',
    fr: 'drome-et-vercors',
    categories: 'voyage, europe, hike',
    link: '/blog/drome-and-vercors',
    url: 'https://tripser.github.io/blog/drome-and-vercors',
  },
  {
    slug: 'drome-et-vercors',
    title: 'Un voyage dans la Drome et le Vercors',
    intro:
      'Comment parcourir le cœur de la France en 10 jours ? Découvrez un voyage captivant dans la Drôme et le Vercors à travers des villages charmants, des aventures palpitantes et des moments délicieux.',
    img: '/images/articles/drome-et-vercors.jpg',
    published: '2023-12-06',
    modified: '2023-12-06',
    lang: 'fr',
    en: 'drome-and-vercors',
    fr: '',
    categories: 'voyage, europe, hike',
    link: '/blog/drome-et-vercors',
    url: 'https://tripser.github.io/blog/drome-et-vercors',
  },
  {
    slug: 'weekend-au-luxembourg',
    title: 'Un court weekend au Luxembourg',
    intro: 'Comment passer 2 ou 3 jours au Luxembourg en découvrant sa nature, ses châteaux et la ville ?',
    img: '/images/articles/weekend-au-luxembourg.jpg',
    published: '2023-11-25',
    modified: '2023-12-06',
    lang: 'fr',
    en: 'weekend-in-luxembourg',
    fr: '',
    categories: 'voyage, europe, hike, city-trip',
    link: '/blog/weekend-au-luxembourg',
    url: 'https://tripser.github.io/blog/weekend-au-luxembourg',
  },
  {
    slug: 'weekend-in-luxembourg',
    title: 'A short weekend in Luxembourg',
    intro: 'How to spend 2 or 3 days in Luxembourg discovering the nature, the castles and the city?',
    img: '/images/articles/weekend-in-luxembourg.jpg',
    published: '2023-11-15',
    modified: '2023-12-06',
    lang: 'en',
    en: '',
    fr: 'weekend-au-luxembourg',
    categories: 'voyage, europe, hike, city-trip',
    link: '/blog/weekend-in-luxembourg',
    url: 'https://tripser.github.io/blog/weekend-in-luxembourg',
  },
];

module.exports = articles as ArticleType[];