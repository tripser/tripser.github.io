import { MouseEventHandler } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { MdLightMode, MdDarkMode, MdSearch } from 'react-icons/md';

type HeaderCompType = { theme: string; onClick: MouseEventHandler; en?: string; fr?: string };

export const links = [
  {
    text: 'Blog',
    link: '/blog',
  },
  {
    text: 'Photos',
    link: '/photos',
  },
] as { text: string; link: string }[];

if (process.env.NODE_ENV === 'development')
  links.push({
    text: 'Admin',
    link: '/admin',
  });

export function Header({ onClick, theme, en, fr }: HeaderCompType) {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  return (
    <header className="header">
      <div className="container">
        <Link href="/">
          <a className="logo">
            <img src="/images/logo-80.png" alt="Tripser logo" title="Home" width="36" height="36" />
          </a>
        </Link>

        <div className="links">
          {links.map((n) => (
            <Link href={n.link} key={n.text}>
              <a>{n.text}</a>
            </Link>
          ))}
        </div>

        <div className="actions">
          <button
            onClick={() => router.push('/search')}
            className="btn"
            title="Search on Tripser"
            aria-label="Search on Tripser"
          >
            <MdSearch title="Search on Tripser" aria-labelledby="Search on Tripser" />
          </button>

          <button
            onClick={() => {
              const newLang = i18n.language === 'en' ? 'fr' : 'en';
              i18n.changeLanguage(newLang);
              window.localStorage.setItem('lang', newLang);
              if (router.pathname.includes('/blog/')) {
                router.push(`/blog/${newLang === 'en' ? en : fr}`);
              }
            }}
            className="btn"
            title={i18n.language === 'en' ? 'Switch to French' : 'Switch to English'}
            aria-label={i18n.language === 'en' ? 'Switch to French' : 'Switch to English'}
          >
            {i18n.language}
          </button>

          <button
            onClick={onClick}
            className="btn"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <MdDarkMode title="Dark mode" aria-labelledby="Dark mode" />
            ) : (
              <MdLightMode title="Light mode" aria-labelledby="Light mode" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
