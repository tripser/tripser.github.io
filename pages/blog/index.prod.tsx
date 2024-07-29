import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Grid } from '@components/grid';
import { Layout } from '@components/layout';
import { ArticleType } from '@types';

type BlogPageType = {
  title: string;
  description: string;
  splash: string;
  url: string;
  articles: ArticleType[];
};

export default function Blog({ title, description, splash, url, articles }: BlogPageType) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [articlesFiltered, setArticlesFiltered] = useState<ArticleType[]>([]);

  const cat = (router.query.cat as string) || '';

  useEffect(() => {
    setArticlesFiltered(articles.filter((x) => x.lang === i18n.language && x.categories.includes(cat)));
  }, [cat, i18n.language]);

  const categoriesAllRaw = articles.map((x) => x.categories.split(', '));
  const categoriesAll = [].concat(...categoriesAllRaw).filter((x) => x);
  const categories = [...new Set(categoriesAll)];

  return (
    <Layout title={title} description={description} splash={splash} url={url}>
      <div className="blog-page">
        <section className="container mt-3 blog-shape">
          <p className="ch-80 mb-8">{t('blog.intro')}</p>

          <div className="blog__categories">
            <Link href="/blog">
              <a className={`btn ${cat === '' ? 'active' : ''}`}>{t('blog.all')}</a>
            </Link>
            {categories.map((c) => (
              <Link key={c} href={`?cat=${c}`} scroll={false}>
                <a className={`btn ${cat === c ? 'active' : ''}`}>{t(`categories.${c}`)}</a>
              </Link>
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

export async function getStaticProps() {
  const articles = require('@data/articles') as ArticleType[];

  return {
    props: {
      title: 'Blog',
      description:
        'Our blog articles covering all our different trips. Each post offers our unique point of view, including the best activities, hikes, stays, tips and more.',
      splash: '/images/jura.jpg',
      url: 'https://tripser.blog/blog',
      articles: articles,
    },
  };
}
