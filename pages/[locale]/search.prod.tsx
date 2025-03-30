import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import articles from '@data/articles';
import { Grid } from '@components/grid';
import { Layout } from '@components/layout';
import { ArticleType } from '@types';

export default function Search({ locale }: { locale: string }) {
  return <SearchPage locale={locale} />;
}

export function SearchPage({ locale }: { locale: string }) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const search = (router.query.s as string) || '';
  const [input, setInput] = useState(search);

  const title = locale === 'fr' ? 'Recherche' : 'Search';
  const description =
    locale === 'fr'
      ? 'Recherchez des articles de voyage sur Tripser. Voyages, city-trips, randonnées, plages, montagnes, lacs, îles et bien plus encore.'
      : 'Search for any travel articles on Tripser. Voyages, city-trips, hikes, beaches, mountains, lakes, islands and much much more.';

  const normString = (s: string) =>
    s
      ?.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const articlesLang = articles?.filter((a) => a.lang === locale) as ArticleType[];

  const articlesFiltered = articlesLang?.filter(
    (a) =>
      normString(a.title).includes(normString(search)) ||
      normString(a.categories).includes(normString(search)) ||
      normString(a.intro).includes(normString(search))
  );

  function handleSubmit(e) {
    e.preventDefault();
    input.length > 0 ? router.push(`/${locale}/search?s=${input}`) : router.push(`/${locale}/search`);
  }

  return (
    <Layout
      title={search ? `${t('search.title') || title}: ${search}` : t('search.title') || title}
      description={t('search.intro') || description}
      splash={{ img: '/images/lake.jpg' }}
      url={`https://tripser.blog/${locale}/search${search ? `?s=${search}` : ''}`}
      lang={locale}
    >
      <div className="search-page">
        <section>
          <div className="container">
            <form onSubmit={handleSubmit}>
              <label htmlFor="search" className="mt-2 mb-2" style={{ display: 'block' }}>
                {t('search.label')}
              </label>
              <input
                id="search"
                name="search"
                placeholder={t('search.placeholder')}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoFocus
                className="mb-2"
              />
              <div className="t-right">
                <button type="submit" className="btn">
                  {t('search.label')}
                </button>
              </div>
            </form>

            {/* TODO: suggestions of search */}

            {search && articlesFiltered.length === 0 ? (
              <div>
                <p className="t-center">{t('search.no-results')}</p>{' '}
                <img
                  src="/images/searching.svg"
                  alt="Searching travel blog posts on Tripser"
                  style={{ maxWidth: '600px', margin: '2rem auto' }}
                />
              </div>
            ) : null}
            {search && articlesFiltered.length > 0 ? (
              <Grid data={articlesFiltered} className="mt-10 mb-10" />
            ) : (
              <Grid data={articlesLang} className="mt-10 mb-10" />
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: ['en', 'fr'].map((locale) => ({
      params: { locale },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const locale = (params?.locale || 'en') as string;

  return {
    props: { locale },
  };
}
