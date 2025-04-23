import { useTranslation } from 'react-i18next';
import { AiFillCaretRight } from 'react-icons/ai';
import articles from '@data/articles';
import { Grid } from '@components/grid';
import { Layout } from '@components/layout';
import { Linkk } from '@components/link';
import { ArticleType } from '@types';

export default function Home({ locale }: { locale: string }) {
  return <HomePage locale={locale} />;
}

export function HomePage({ locale }: { locale: string }) {
  const { t, i18n } = useTranslation();

  const title = locale === 'fr' ? 'Tripser, le blog voyage' : 'Tripser, the voyage blog';

  const description =
    locale === 'fr'
      ? 'Inspirez-vous de nos meilleurs voyages. Tripser est un blog dédié aux voyages. Découvrez nos plus beaux paysages, randonnées, séjours, activités et bien plus.'
      : 'Get inspired by our best journeys. Tripser is a blog focused on voyages and trips. Discover the best views, hikes, stays activities and much more.';

  const articlesByLang = articles.filter((x) => x.lang === locale) as ArticleType[];

  return (
    <Layout
      title={title}
      subtitle={t('subtitle')}
      description={description}
      splash={{ txt: 'Tripser', img: '/images/vercors.jpg' }}
      lang={locale}
      url={`https://tripser.blog/${locale || ''}`}
    >
      <div className="home-page">
        <section id="blog" className="blog">
          <div className="home-shapes"></div>
          <div className="container mt-3" data-aos="fade-right">
            <h2>{t('articles.latest-articles')}</h2>
            <p className="mb-10">{t('articles.discover-articles')}</p>
            <Grid data={articlesByLang.slice(0, 6)} className="mt-10 mb-10" />
            <div className="btn-wrapper-right">
              <Linkk href="/blog" className="btn">
                {t('articles.check-articles')}
                <AiFillCaretRight className="ml-1" />
              </Linkk>
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
                  alt="Illustration of an adventurer going on a journey of travels and trips"
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

export async function getStaticPaths() {
  return {
    paths: ['en', 'fr'].map((locale) => ({
      params: { locale },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const locale = (params?.locale || 'en') as string;

  return {
    props: { locale },
  };
}
