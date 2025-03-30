import { useEffect } from 'react';
import { useRouter } from 'next/router';
import P2FR from '@pages/[locale]/blog/3-semaines-a-la-reunion.mdx';
import P2EN from '@pages/[locale]/blog/3-weeks-in-la-reunion.mdx';
import P4EN from '@pages/[locale]/blog/alsace-and-christmas-markets.mdx';
import P4FR from '@pages/[locale]/blog/alsace-et-marches-noel.mdx';
import P3EN from '@pages/[locale]/blog/cote-opale-trip.mdx';
import P3FR from '@pages/[locale]/blog/cote-opale-voyage.mdx';
import P5EN from '@pages/[locale]/blog/drome-and-vercors.mdx';
import P5FR from '@pages/[locale]/blog/drome-et-vercors.mdx';
import P1FR from '@pages/[locale]/blog/gorges-du-verdon.mdx';
import P1EN from '@pages/[locale]/blog/gorges-of-verdon.mdx';
import P6FR from '@pages/[locale]/blog/weekend-au-luxembourg.mdx';
import P6EN from '@pages/[locale]/blog/weekend-in-luxembourg.mdx';
import { ArticleType } from '@types';

export default function BlogPostPage({ article }: { article: ArticleType }) {
  const router = useRouter();
  const { slug } = article;

  // TODO: implement a better way to handle this...
  const pages = {
    'gorges-of-verdon': P1EN,
    'gorges-du-verdon': P1FR,
    '3-weeks-in-la-reunion': P2EN,
    '3-semaines-a-la-reunion': P2FR,
    'cote-opale-trip': P3EN,
    'cote-opale-voyage': P3FR,
    'alsace-and-christmas-markets': P4EN,
    'alsace-et-marches-noel': P4FR,
    'drome-and-vercors': P5EN,
    'drome-et-vercors': P5FR,
    'weekend-in-luxembourg': P6EN,
    'weekend-au-luxembourg': P6FR,
  };

  const Page = pages[slug];

  useEffect(() => {
    if (!Page) router.push('/404');
  }, [Page]);

  return Page ? <Page /> : null;
}

export async function getStaticProps(context) {
  const articles = require('@data/articles') as ArticleType[];
  const article = articles.find((p) => p.slug === context.params.slug);

  return {
    props: {
      article: article,
    },
  };
}

export async function getStaticPaths() {
  const articles = require('@data/articles') as ArticleType[];
  const paths = articles.map((a) => ({ params: { slug: a.slug, locale: a.lang } }));

  return {
    paths,
    fallback: false,
  };
}
