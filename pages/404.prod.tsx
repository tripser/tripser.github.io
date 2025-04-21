import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { AiFillCaretLeft } from 'react-icons/ai';
import { Grid } from '@components/grid';
import { Layout } from '@components/layout';
import { Linkk } from '@components/link';
import useLocale from '@hooks/useLocale';
import { ArticleType } from '@types';

type Custom404PageType = {
  title: string;
  splash: string;
  articles: ArticleType[];
};

export default function Custom404({ title, splash, articles }: Custom404PageType) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const locale = useLocale();
  const [random, setRandom] = useState<ArticleType[]>([]);

  useEffect(() => {
    const articlesByLang = articles.filter((x) => x.lang === locale);
    const randomPosts = [...Array(3)].map(
      () => articlesByLang.splice(Math.floor(Math.random() * articlesByLang.length), 1)[0]
    );
    setRandom(randomPosts);
  }, [locale]);

  return (
    <Layout title={t('404.title') || title} splash={{ img: splash }} lang={locale}>
      <div className="container error-shape">
        <section data-aos="fade-right">
          <h2 className="mb-10">{t('404.try')}</h2>
          <Grid data={random} />
        </section>
        <div>
          <Linkk href="/">
            <a className="btn mb-20">
              <AiFillCaretLeft className="mr-1" />
              {t('404.back')}
            </a>
          </Linkk>
        </div>
      </div>
    </Layout>
  );
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
