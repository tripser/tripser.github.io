import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Layout from '@components/layout';
import Grid from '@components/grid';

export default function Blog({ title, description, splash, url, articles }) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [articlesFiltered, setArticlesFiltered] = useState([]);
  const [query, setQuery] = useState('');

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
      <section className="container mt-3 blog-shape">
        <p className="ch-80 mb-8">{t('blog.intro')}</p>

        <div className="blog__categories">
          <Link href="/blog">
            <a className={`btn ${query === '' ? 'active' : ''}`}>{t('blog.all')}</a>
          </Link>
          {categories.map((c) => (
            <Link key={c} href={`?${c}`}>
              <a className={`btn ${query === c ? 'active' : ''}`}>{t(`categories.${c}`)}</a>
            </Link>
          ))}
        </div>

        <div data-aos="fade-right">
          <Grid data={articlesFiltered} className="mt-6 mb-20" />
        </div>
      </section>
    </Layout>
  );
}

Blog.defaultProps = {
  title: 'Blog',
};

Blog.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  splash: PropTypes.string,
  url: PropTypes.string,
  articles: PropTypes.array,
};

export async function getStaticProps() {
  const articles = require('@data/articles');

  return {
    props: {
      title: 'Blog',
      description: 'My blog articles covering the web in general, especially the front-end development.',
      splash: '/images/lake.jpg',
      url: 'https://tripser.github.io/blog',
      articles: articles,
    },
  };
}
