import { useRouter } from 'next/router';

export default function useLocale() {
  const router = useRouter();

  const isEN = router.asPath === '/en' || router.asPath.includes('/en/');
  const isFR = router.asPath === '/fr' || router.asPath.includes('/fr/');
  const locale = isEN ? 'en' : isFR ? 'fr' : 'en';

  return locale;
}
