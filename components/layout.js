import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '@components/header';
import Footer from '@components/footer';
import Splash from './splash';
// import MobileNav from '@components/mobileNav';

export default function Layout({
  title,
  subtitle,
  description,
  img,
  splash,
  url,
  children,
  itemtype,
  published,
  modified,
  lang,
  en,
  fr,
}) {
  const [theme, setTheme] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let localTheme = window.localStorage.getItem('theme');
      setTheme(localTheme);
    }
  }, []);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const fullImageUrl = img ? (img.startsWith('http') ? img : `https://tripser.github.io${img}`) : null;

  const OGLocales = {
    en: 'en_GB',
    fr: 'fr_FR',
  };

  return (
    <main
      className={theme}
      itemScope={!!itemtype ? true : undefined}
      itemType={itemtype ? 'http://schema.org/' + itemtype : undefined}
    >
      <Head>
        {lang ? <meta property="og:locale" content={OGLocales[lang]} key="og:locale" /> : null}

        <title key="title">{`${title}${router.pathname !== '/' ? ' | Tripser' : ''}`}</title>
        <meta name="description" content={description} key="description" />

        <meta property="og:title" content={`${title}${router.pathname !== '/' ? ' | Tripser' : ''}`} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:url" content={url || 'https://tripser.github.io'} key="og:url" />
        <meta
          property="og:image"
          content={fullImageUrl || 'https://tripser.github.io/images/tripser.jpg'}
          key="og:image"
        />

        <meta
          property="twitter:title"
          content={`${title}${router.pathname !== '/' ? ' | Tripser' : ''}`}
          key="twitter:title"
        />
        <meta property="twitter:description" content={description} key="twitter:description" />
        <meta property="twitter:url" content={url || 'https://tripser.github.io'} key="twitter:url" />
        <meta
          property="twitter:image"
          content={fullImageUrl || 'https://tripser.github.io/images/tripser.jpg'}
          key="twitter:image"
        />

        {published ? <meta property="article:published_time" content={published} /> : null}
        {modified ? <meta property="article:modified_time" content={modified} /> : null}
      </Head>
      <Header onClick={switchTheme} theme={theme} en={en} fr={fr} />
      <div className="new-stack">
        <Splash title={title} subtitle={subtitle} splash={splash} />
        <div className="body">{children}</div>
      </div>
      <Footer />
      {/* <MobileNav /> */}
      <div id="ie-banner">
        Please open this website with a recent browser for the best experience. Avoid Internet Explorer at all costs.
      </div>
    </main>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  img: PropTypes.string,
  splash: PropTypes.string,
  url: PropTypes.string,
  children: PropTypes.node,
  itemtype: PropTypes.string,
  published: PropTypes.string,
  modified: PropTypes.string,
  lang: PropTypes.string,
  en: PropTypes.string,
  fr: PropTypes.string,
};
