import { SiGmail, SiInstagram, SiPinterest } from 'react-icons/si';
import Breadcrumb from './breadcrumb';

const footerLinks = [
  // TODO: add real links !! + twitter, other?
  {
    link: 'https://instagram.com',
    title: 'Instagram',
    icon: SiInstagram,
  },
  {
    link: 'https://pinterest.com',
    title: 'Pinterest',
    icon: SiPinterest,
  },
  {
    link: 'mailto:tripser.blog@gmail.com',
    title: 'Mail',
    icon: SiGmail,
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="contact">
      <div className="container" data-aos="fade-right">
        <Breadcrumb />
        <p className="mb-5">Feel free to get in touch and stay connected with us via these different channels.</p>
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
