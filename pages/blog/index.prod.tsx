import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Layout } from '@components/layout';
import { Grid } from '@components/grid';
import { ArticleType } from 'types';

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
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    // the regex replace removes all characters before '?' to get only the query parameters
    setQuery(router.asPath.replace(/.*\?/g, '') === '/blog' ? '' : router.asPath.replace(/.*\?/g, ''));
  }, [router.asPath]);

  useEffect(() => {
    setArticlesFiltered(articles.filter((x) => x.lang === i18n.language && x.categories.includes(query)));
  }, [query, i18n.language]);

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
              <a className={`btn ${query === '' ? 'active' : ''}`}>{t('blog.all')}</a>
            </Link>
            {categories.map((c) => (
              <Link key={c} href={`?${c}`} scroll={false}>
                <a className={`btn ${query === c ? 'active' : ''}`}>{t(`categories.${c}`)}</a>
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
