import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { nav } from '@data/nav';

export default function Header({ onClick, theme, ...props }) {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  return (
    <header className="header">
      <div className="container">
        {nav.map((n, i) => (
          <Link href={n.link} key={n.text}>
            {!i ? (
              <a className="logo">
                <img src="/images/logo.png" alt="Tripser logo" title={n.text} width="30" height="30" />
              </a>
            ) : (
              <a>{n.text}</a>
            )}
          </Link>
        ))}

        <div>
          <button
            onClick={() => {
              const newLang = i18n.language === 'en' ? 'fr' : 'en';
              i18n.changeLanguage(newLang);
              window.localStorage.setItem('lang', newLang);
              if (router.asPath.includes('/blog/')) {
                router.push(`/blog/${props[newLang]}`);
              }
            }}
          >
            {i18n.language}
          </button>

          <button
            onClick={onClick}
            className="btn"
            title={theme == 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={theme == 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
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

Header.propTypes = {
  onClick: PropTypes.func,
  theme: PropTypes.string,
  en: PropTypes.string,
  fr: PropTypes.string,
};