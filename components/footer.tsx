import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import { SiGmail, SiInstagram, SiPinterest } from 'react-icons/si';
import Breadcrumb from './breadcrumb';

const footerLinks = [
  {
    link: 'https://instagram.com/tripserblog/',
    title: 'Instagram',
    icon: SiInstagram,
  },
  {
    link: 'https://pinterest.com/tripserblog/',
    title: 'Pinterest',
    icon: SiPinterest,
  },
  {
    link: 'mailto:tripser.blog@gmail.com',
    title: 'Mail',
    icon: SiGmail,
  },
] as { link: string; title: string; icon: IconType }[];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="contact">
      <div className="container" data-aos="fade-right">
        <Breadcrumb />
        <p className="mb-5">{t('contact')}</p>
        <div className="mb-10">
          {footerLinks.map((f) => {
            const Icon = f.icon;
            return (
              <a key={f.link} href={f.link} target="_blank" rel="noopener noreferrer" className="btn mb-4 mr-4">
                <Icon title={f.title} aria-labelledby={f.title} />
                <span className="ml-1">{f.title}</span>
              </a>
            );
          })}
        </div>
        <p className="contact__copy">&copy; {new Date().getFullYear()} | Tripser</p>
      </div>
    </footer>
  );
}
