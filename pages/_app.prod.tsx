import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AOS from 'aos';
import { useTranslation } from 'react-i18next';
import useLocale from '@hooks/useLocale';
import 'public/lang/i18n';

import 'public/styles/imports.css';
import 'aos/dist/aos.css';
import 'public/styles/style.scss';

// This default export is required in a new `pages/_app.js` file.
// eslint-disable-next-line react/prop-types
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const locale = useLocale();

  useEffect(() => {
    if (typeof window !== 'undefined' && window['goatcounter']) {
      window['goatcounter'].count({
        path: router.asPath,
        // path: location.pathname + location.search + location.hash
      });
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.pathname.replace('[locale]', locale);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      i18n.changeLanguage(locale);
      document.documentElement.lang = locale;
    }
  }, [locale]);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 100,
    });
  }, [router]);

  const title = `Tripser | Voyage blog`;
  const desc = `Get inspired by our best journeys. Tripser is a blog focused on voyages and trips. Discover the best views, hikes, stays activities and much more.`;
  const url = `https://tripser.blog`;
  const imgUrl = `${url}/images/tripser.jpg`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
        <meta property="og:locale" content="en_GB" key="og:locale" />
        <meta property="og:type" content="website" key="og:type" />

        <title key="title">{title}</title>
        <meta name="description" content={desc} key="description" />
        <meta name="author" content="Tripser" key="author" />

        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={desc} key="og:description" />
        <meta property="og:url" content={url} key="og:url" />
        <meta property="og:image" content={imgUrl} key="og:image" />

        <meta property="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta property="twitter:title" content={title} key="twitter:title" />
        <meta property="twitter:description" content={desc} key="twitter:description" />
        <meta property="twitter:url" content={url} key="twitter:url" />
        <meta property="twitter:image" content={imgUrl} key="twitter:image" />

        <meta name="google-site-verification" content="z2hRht9XAlPwzcTZ_4eqa9-fBU4ZQTIalemhd4_2m8Y" />

        <meta name="theme-color" content="#85c2ff" key="theme-color" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
