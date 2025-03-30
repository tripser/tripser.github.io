import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import articles from '@data/articles';
import { Grid } from '@components/grid';
import { Layout } from '@components/layout';
import { Linkk } from '@components/link';
import { ArticleType } from '@types';

export default function Blog({ locale }: { locale: string }) {
  return <BlogPage locale={locale} />;
}

export function BlogPage({ locale }: { locale: string }) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [articlesFiltered, setArticlesFiltered] = useState<ArticleType[]>([]);

  const title = locale === 'fr' ? 'Blog' : 'Blog';
  const description =
    locale === 'fr'
      ? 'Nos articles de blog couvrent tous nos différents voyages. Chaque publication offre notre point de vue unique, y compris les meilleures activités, randonnées, séjours, conseils et plus encore.'
      : 'Our blog articles covering all our different trips. Each post offers our unique point of view, including the best activities, hikes, stays, tips and more.';

  const cat = (router.query.cat as string) || '';

  useEffect(() => {
    setArticlesFiltered(articles.filter((x) => x.lang === locale && x.categories.includes(cat)) as ArticleType[]);
  }, [cat, locale]);

  const categoriesAllRaw = articles.map((x) => x.categories.split(', '));
  const categoriesAll = [].concat(...categoriesAllRaw).filter((x) => x);
  const categories = [...new Set(categoriesAll)];

  return (
    <Layout
      title={title}
      description={description}
      splash={{ img: '/images/jura.jpg' }}
      url={`https://tripser.blog/${locale}/blog${cat ? `?cat=${cat}` : ''}`}
      lang={locale}
    >
      <div className="blog-page">
        <section className="container mt-3 blog-shape">
          <p className="ch-80 mb-8">{t('blog.intro')}</p>

          <div className="blog__categories">
            <Linkk href="/blog">
              <a className={`btn ${cat === '' ? 'active' : ''}`}>{t('blog.all')}</a>
            </Linkk>
            {categories.map((c) => (
              <Linkk key={c} href={`/blog?cat=${c}`} scroll={false}>
                <a className={`btn ${cat === c ? 'active' : ''}`}>{t(`categories.${c}`)}</a>
              </Linkk>
            ))}
          </div>

          <div data-aos="fade-right">
            <Grid data={articlesFiltered} className="mt-6 mb-10" />
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
