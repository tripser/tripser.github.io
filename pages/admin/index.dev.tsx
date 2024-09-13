import { useEffect, useState } from 'react';
import { MdCode, MdEdit, MdPublic } from 'react-icons/md';
import { Layout } from '@components/layout';
import { Linkk } from '@components/link';
import { ArticleType } from '@types';

type AdminPageType = {
  title: string;
  description: string;
  articles: ArticleType[];
};

export default function Admin({ title, description, articles }: AdminPageType) {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [lang, setLang] = useState(0);
  const [state, setState] = useState(0);

  const LANGS = ['', 'en', 'fr'];
  const STATES = ['', 'draft', 'published'];

  useEffect(() => {
    console.log(LANGS[lang], STATES[state]);
    setFilteredArticles(
      articles.filter((a) => (!LANGS[lang] || a.lang === LANGS[lang]) && (!STATES[state] || a.state === STATES[state]))
    );
  }, [lang, state]);

  const reset = () => {
    setLang(0);
    setState(0);
    setFilteredArticles(articles);
  };

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <Layout title={title} description={description} url="https://tripser.blog/admin" lang={'en'}>
      <div className="admin-page">
        <section className="py-5">
          <div className="container mt-3">
            <div className="space-between-x mb-4">
              <Linkk href="/admin/new">
                <a className="btn">Write an article</a>
              </Linkk>
              <button onClick={reset} className="btn">
                Reset filters
              </button>
            </div>

            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Pub</th>
                    <th>Mod</th>
                    <th onClick={() => setLang((c) => (c < LANGS.length - 1 ? c + 1 : 0))}>Lang ({LANGS[lang]})</th>
                    <th onClick={() => setState((c) => (c < STATES.length - 1 ? c + 1 : 0))}>
                      State ({STATES[state]})
                    </th>
                    <th style={{ width: '5.5rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArticles?.length
                    ? filteredArticles.map((a) => (
                        <tr key={a.slug}>
                          <td>{a.title}</td>
                          <td>{a.published}</td>
                          <td>{a.modified}</td>
                          <td>{a.lang}</td>
                          <td>{a.state}</td>
                          <td>
                            <Linkk href={`/admin/${a.slug}`}>
                              <a>
                                <MdEdit size={20} />
                              </a>
                            </Linkk>{' '}
                            <Linkk href={a.link}>
                              <a>
                                <MdCode size={20} />
                              </a>
                            </Linkk>{' '}
                            {a.state === 'published' ? (
                              <Linkk href={a.url}>
                                <a target="_blank">
                                  <MdPublic size={20} />
                                </a>
                              </Linkk>
                            ) : null}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={6}>{filteredArticles?.length || 0} articles</td>
                  </tr>
                </tfoot>
              </table>
            </div>
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
      title: 'Admin',
      description: '',
      articles: articles,
    },
  };
}
