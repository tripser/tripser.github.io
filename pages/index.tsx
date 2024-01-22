import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { AiFillCaretRight } from 'react-icons/ai';
import Layout from '@components/layout';
import Grid from '@components/grid';
import { ArticleType } from 'types';

type HomePageType = {
  title: string;
  description: string;
  splash: string;
  articles: ArticleType[];
};

export default function Home({ title, description, splash, articles }: HomePageType) {
  const { t, i18n } = useTranslation();

  const articlesByLang = articles.filter((x) => x.lang === i18n.language);

  return (
    <Layout title={title} subtitle={t('subtitle')} description={description} splash={splash}>
      <div className="home-page">
        <section id="blog" className="blog">
          <div className="home-shapes"></div>
          <div className="container mt-3" data-aos="fade-right">
            <h2>{t('articles.latest-articles')}</h2>
            <p className="mb-10">{t('articles.discover-articles')}</p>
            <Grid data={articlesByLang.slice(0, 6)} className="mt-10 mb-10" />
            <div className="btn-wrapper-right">
              <Link href="/blog">
                <a className="btn">
                  {t('articles.check-articles')}
                  <AiFillCaretRight className="ml-1" />
                </a>
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="home-shapes"></div>
          <div className="container" data-aos="fade-right">
            <div className="cols cols-lg">
              <div className="col centered-v">
                <h2>{t('about.intro')}</h2>
                <div dangerouslySetInnerHTML={{ __html: t('about.body') }} />
              </div>

              <div className="col centered-v">
                <img
                  src="/images/exploring.svg"
                  alt="developer thinking next to a computer"
                  width="270"
                  height="112"
                  loading="lazy"
                  className="about__img mt-5 mb-5"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const articles = require('@data/articles') as ArticleType[];

  return {
    props: {
      title: 'Tripser',
      description:
        'Get inspired by our best journeys. Tripser is a blog focused on voyages and trips. Discover the best views, hikes, stays activities and much more.',
      splash: '/images/vercors.jpg',
      articles: articles,
    },
  };
}
