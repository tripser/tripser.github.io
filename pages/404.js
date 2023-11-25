import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { AiFillCaretLeft } from 'react-icons/ai';
import PropTypes from 'prop-types';
import Layout from '@components/layout';
import Grid from '@components/grid';

// import Image from 'next/image';

export default function Custom404({ title, splash, articles }) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [random, setRandom] = useState([]);

  // fix for trailling slash URL error from Github pages
  useEffect(() => {
    if (router.asPath.endsWith('/')) {
      router.replace(router.asPath.replace(/\/$/, ''));
    }
  }, [router]);

  useEffect(() => {
    const articlesByLang = articles.filter((x) => x.lang === i18n.language);
    const randomPost = articlesByLang[Math.floor(Math.random() * articlesByLang.length)];
    setRandom([randomPost]);
  }, [i18n.language]);

  if (!router.asPath.endsWith('/')) {
    return (
      <Layout title={t('404.title') || title} splash={splash}>
        <div className="container error-shape">
          <section data-aos="fade-right">
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
