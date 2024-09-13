import { HomePage } from './[locale]/index.prod';

export default function Home({ locale }: { locale: string }) {
  return <HomePage locale={locale} />;
}

export async function getStaticProps({ params }) {
  const locale = (params?.locale || 'en') as string;

  return {
    props: { locale },
  };
}
