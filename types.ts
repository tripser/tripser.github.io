export type ArticleType = {
  slug: string;
  title: string;
  intro: string;
  img: string;
  mini: string;
  published: string;
  modified: string;
  lang: string;
  en?: string;
  fr?: string;
  categories: string;
  link: string;
  url: string;
};

export type PhotoType = {
  src: string;
  caption: string;
  title: string;
  lang: string;
  link: string;
};
