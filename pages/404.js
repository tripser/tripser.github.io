import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Layout from '@components/layout';
import Grid from '@components/grid';

// import Image from 'next/image';

export default function Custom404({ title, splash, articles }) {
  const router = useRouter();

  // fix for trailling slash URL error from Github pages
  useEffect(() => {
    if (router.asPath.endsWith('/')) {
      router.replace(router.asPath.replace(/\/$/, ''));
    }
  }, [router]);

  const [random, setRandom] = useState([]);

  useEffect(() => {
    const randomPost = articles[Math.floor(Math.random() * articles.length)];
    setRandom([randomPost]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!router.asPath.endsWith('/')) {
    return (
      <Layout title={title} splash={splash}>
        <div className="container error-shape">
          <section data-aos="fade-right">
            <Grid data={random} />
          </section>
          <div>
            <Link href="/">
              <a className="btn mb-20">Go back Home</a>
            </Link>
          </div>
          {/* <div style={{ position: 'relative', aspectRatio: '1200/630' }}>
          <Image src="/images/articles/generate-a-sitemap-in-nextjs.jpg" alt="img" layout="fill" />
        </div> */}
        </div>
      </Layout>
    );
  }

  return null;
}

Custom404.propTypes = {
  title: PropTypes.string.isRequired,
  splash: PropTypes.string,
  articles: PropTypes.array,
};

export async function getStaticProps() {
  const articles = require('@data/articles');

  return {
    props: {
      title: 'Page Not Found',
      splash: '/images/beach.jpg',
      articles: articles,
    },
  };
}
