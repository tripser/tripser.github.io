import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import articles from '@data/articles';
import Layout from '@components/layout';
import Grid from '@components/grid';

export default function Blog({ title, description, url }) {
  const router = useRouter();
  // the regex replace removes all characters before '?' to get only the query parameters
  const query = router.asPath.replace(/.*\?/g, '') === '/blog' ? '' : router.asPath.replace(/.*\?/g, '');
  const [cat, setCat] = useState(query ? articles.filter((x) => x.categories.includes(query)) : articles);

  useEffect(() => {
    if (!query) {
      setCat(articles);
    }
  }, [router, query]);

  const categoriesAllRaw = articles.map((x) => x.categories.split(', '));
  const categoriesAll = [].concat(...categoriesAllRaw).filter((x) => x);
  const categories = [...new Set(categoriesAll)];

  return (
    <Layout title={title} description={description} url={url}>
      <div className="container blog-shape">
        <h1>Blog</h1>

        <p className="ch-80 mb-8">
          We craft blog articles we wish we could have come across while planning and booking for holidays. We aim to
          cover all sorts of trips, short and long, close and far away.
        </p>

        <div className="blog__categories">
          <Link href="/blog">
            <a className={`btn ${query === '' ? 'active' : ''}`} onClick={() => setCat(articles)}>
              All articles
            </a>
          </Link>
          {categories.map((c) => (
            <Link key={c} href={`?${c}`}>
              <a
                className={`btn ${query === c ? 'active' : ''}`}
                onClick={() => setCat(articles.filter((x) => x.categories.includes(c)))}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </a>
            </Link>
          ))}
        </div>

        <div data-aos="fade-up">
          <Grid data={cat} className="mt-6 mb-20" />
        </div>
      </div>
    </Layout>
  );
}

Blog.defaultProps = {
  title: 'Blog | Rémy Beumier',
};

Blog.propTypes = {
  articles: PropTypes.array,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string,
};

export async function getStaticProps() {
  return {
    props: {
      title: 'Blog | Rémy Beumier',
      description: 'My blog articles covering the web in general, especially the front-end development.',
      url: 'https://tripser.github.io/blog',
    },
  };
}
