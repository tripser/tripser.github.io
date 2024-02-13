import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Header } from '@components/header';
import { Footer } from '@components/footer';
import { Splash } from './splash';
import IMG_FOLDER from '@data/utils';

type LayoutCompType = {
  title: string;
  subtitle?: string;
  description?: string;
  img?: string;
  splash?: string;
  url?: string;
  children: ReactElement;
  itemtype?: string;
  published?: string;
  modified?: string;
  lang?: string;
  en?: string;
  fr?: string;
};

export function Layout({
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
}: LayoutCompType) {
  const [theme, setTheme] = useState<string>('');
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

  const fullImageUrl = img
    ? img.startsWith('http')
      ? img
      : `${IMG_FOLDER}${img}`
    : 'https://tripser.blog/images/tripser.jpg';

  const OGLocales = {
    en: 'en_GB',
    fr: 'fr_FR',
  };

  const isAdmin = router.pathname.includes('/admin');

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
        <meta property="og:url" content={url || 'https://tripser.blog'} key="og:url" />
        <meta property="og:image" content={fullImageUrl} key="og:image" />

        <meta
          property="twitter:title"
          content={`${title}${router.pathname !== '/' ? ' | Tripser' : ''}`}
          key="twitter:title"
        />
        <meta property="twitter:description" content={description} key="twitter:description" />
        <meta property="twitter:url" content={url || 'https://tripser.blog'} key="twitter:url" />
        <meta property="twitter:image" content={fullImageUrl} key="twitter:image" />

        {published ? <meta property="article:published_time" content={published} /> : null}
        {modified ? <meta property="article:modified_time" content={modified} /> : null}

        <link rel="canonical" href={url || 'https://tripser.blog'} />
      </Head>
      <Header onClick={switchTheme} theme={theme} en={en} fr={fr} />
      <div className="new-stack">
        {!isAdmin ? (
          <>
            <Splash title={title} subtitle={subtitle} splash={splash} />
            <div className="body body-splash">{children}</div>
          </>
        ) : (
          <>
            <h1 itemProp="headline name">{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
            <div className="body">{children}</div>
          </>
        )}
      </div>
      <Footer isAdmin={isAdmin} />
      <div id="ie-banner">
        Please open this website with a recent browser for the best experience. Avoid Internet Explorer at all costs.
      </div>
    </main>
  );
}
