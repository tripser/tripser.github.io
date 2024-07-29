import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Grid } from '@components/grid';
import { Layout } from '@components/layout';
import { ArticleType } from '@types';

type SearchPageType = {
  title: string;
  description: string;
  splash: string;
  articles: ArticleType[];
};

export default function Search({ title, description, splash, articles }: SearchPageType) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const search = (router.query.s as string) || '';
  const [input, setInput] = useState(search);

  const normString = (s: string) =>
    s
      ?.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  const articlesLang = articles?.filter((a) => a.lang === i18n.language);

  const articlesFiltered = articlesLang?.filter(
    (a) =>
      normString(a.title).includes(normString(search)) ||
      normString(a.categories).includes(normString(search)) ||
      normString(a.intro).includes(normString(search))
  );

  function handleSubmit(e) {
    e.preventDefault();
    input.length > 0 ? router.push(`/search?s=${input}`) : router.push('/search');
  }

  return (
    <Layout
      title={search ? `${t('search.title') || title}: ${search}` : t('search.title') || title}
      description={t('search.intro') || description}
      splash={splash}
      url="https://tripser.blog/search"
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

export async function getStaticProps() {
  const articles = require('@data/articles') as ArticleType[];

  return {
    props: {
      title: 'Search',
      description:
        'Search for any travel articles on Tripser. Voyages, city-trips, hikes, beaches, mountains, lakes, islands and much much more.',
      splash: '/images/lake.jpg',
      articles: articles,
    },
  };
}
