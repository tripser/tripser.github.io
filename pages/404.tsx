import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { AiFillCaretLeft } from 'react-icons/ai';
import Layout from '@components/layout';
import Grid from '@components/grid';
import { ArticleType } from 'types';

type Custom404PageType = {
  title: string;
  splash: string;
  articles: ArticleType[];
};

export default function Custom404({ title, splash, articles }: Custom404PageType) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [random, setRandom] = useState<ArticleType[]>([]);

  // fix for trailling slash URL error from Github pages
  useEffect(() => {
    if (router.pathname.endsWith('/')) {
      router.replace(router.pathname.replace(/\/$/, ''));
    }
  }, [router]);

  useEffect(() => {
    const articlesByLang = articles.filter((x) => x.lang === i18n.language);
    const randomPost = articlesByLang[Math.floor(Math.random() * articlesByLang.length)];
    setRandom([randomPost]);
  }, [i18n.language]);

  if (!router.pathname.endsWith('/')) {
    return (
      <Layout title={t('404.title') || title} splash={splash}>
        <div className="container error-shape">
          <section data-aos="fade-right">
            <h2 className="mb-10">{t('404.try')}</h2>
            <Grid data={random} />
          </section>
          <div>
            <Link href="/">
              <a className="btn mb-20">
                <AiFillCaretLeft className="mr-1" />
                {t('404.back')}
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
}

export async function getStaticProps() {
  const articles = require('@data/articles') as ArticleType[];

  return {
    props: {
      title: 'Page Not Found',
      splash: '/images/cahuita.jpg',
      articles: articles,
    },
  };
}
