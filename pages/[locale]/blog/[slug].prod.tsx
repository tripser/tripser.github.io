import { useEffect } from 'react';
import { useRouter } from 'next/router';
import P8FR from '@pages/[locale]/blog/1-semaine-en-crete.mdx';
import P8EN from '@pages/[locale]/blog/1-week-in-crete.mdx';
import P5FR from '@pages/[locale]/blog/3-semaines-a-la-reunion.mdx';
import P5EN from '@pages/[locale]/blog/3-weeks-in-la-reunion.mdx';
import P3EN from '@pages/[locale]/blog/alsace-and-christmas-markets.mdx';
import P3FR from '@pages/[locale]/blog/alsace-et-marches-noel.mdx';
import P4EN from '@pages/[locale]/blog/cote-opale-trip.mdx';
import P4FR from '@pages/[locale]/blog/cote-opale-voyage.mdx';
import P7EN from '@pages/[locale]/blog/croatia-in-2-weeks.mdx';
import P7FR from '@pages/[locale]/blog/croatie-en-2-semaines.mdx';
import P2EN from '@pages/[locale]/blog/drome-and-vercors.mdx';
import P2FR from '@pages/[locale]/blog/drome-et-vercors.mdx';
import P6FR from '@pages/[locale]/blog/gorges-du-verdon.mdx';
import P6EN from '@pages/[locale]/blog/gorges-of-verdon.mdx';
import P1FR from '@pages/[locale]/blog/weekend-au-luxembourg.mdx';
import P1EN from '@pages/[locale]/blog/weekend-in-luxembourg.mdx';
import { ArticleType } from '@types';

export default function BlogPostPage({ article }: { article: ArticleType }) {
  const router = useRouter();
  const { slug } = article;

  // TODO: implement a better way to handle this...
  const pages = {
    'weekend-in-luxembourg': P1EN,
    'weekend-au-luxembourg': P1FR,
    'drome-and-vercors': P2EN,
    'drome-et-vercors': P2FR,
    'alsace-and-christmas-markets': P3EN,
    'alsace-et-marches-noel': P3FR,
    'cote-opale-trip': P4EN,
    'cote-opale-voyage': P4FR,
    '3-weeks-in-la-reunion': P5EN,
    '3-semaines-a-la-reunion': P5FR,
    'gorges-of-verdon': P6EN,
    'gorges-du-verdon': P6FR,
    'croatia-in-2-weeks': P7EN,
    'croatie-en-2-semaines': P7FR,
    '1-week-in-crete': P8EN,
    '1-semaine-en-crete': P8FR,
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
