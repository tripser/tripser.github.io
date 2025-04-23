import { MouseEventHandler } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { MdLightMode, MdDarkMode, MdSearch } from 'react-icons/md';
import useLocale from '@hooks/useLocale';
import { Linkk } from './link';

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
  const locale = useLocale();

  return (
    <header className="header">
      <div className="container">
        <Linkk href="/" className="logo">
          <img src="/images/logo-80.png" alt="Tripser logo" title="Home" width="36" height="36" />
        </Linkk>

        <div className="links">
          {links.map((link) => (
            <Linkk href={`${link.link}`} key={link.text}>
              {link.text}
            </Linkk>
          ))}
        </div>

        <div className="actions">
          <Linkk href="/search" className="btn" title="Search on Tripser" aria-label="Search on Tripser">
            <MdSearch title="Search on Tripser" aria-labelledby="Search on Tripser" />
          </Linkk>

          <button
            onClick={() => {
              const newLang = locale === 'en' ? 'fr' : 'en';
              i18n.changeLanguage(newLang);
              if (router.pathname.includes('/blog/')) {
                router.push(`/${newLang}/blog/${newLang === 'en' ? en : fr}`);
              } else if (router.pathname.includes('[locale]/')) {
                router.push(`/${newLang}/${router.pathname.split('[locale]/')[1]}`);
              } else {
                router.push(`/${newLang}`);
              }
            }}
            className="btn"
            title={locale === 'en' ? 'Switch to French' : 'Switch to English'}
            aria-label={locale === 'en' ? 'Switch to French' : 'Switch to English'}
          >
            {locale}
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
