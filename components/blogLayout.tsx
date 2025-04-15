import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { AiFillCaretLeft } from 'react-icons/ai';
import articles from '@data/articles';
import { ArticleType } from '@types';
import { Grid } from './grid';
import { Layout } from './layout';
import { Linkk } from './link';

type BlogLayoutCompType = {
  children: ReactElement;
};

const convertDate = (d) =>
  d === '' ? 'No date' : `${new Date(d).getDate()}.${new Date(d).getMonth() + 1}.${new Date(d).getFullYear()}`;

export function BlogLayout({ children }: BlogLayoutCompType) {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const currPath = router.asPath.split('/').at(-1);

  const article = articles.find((p) => p.slug === currPath) as ArticleType;

  const { title, intro, img, published, modified, categories, slug } = article;

  const categoriesList = categories?.split(', ').filter((x) => x);

  const articlesByLang = articles.filter((x) => x.lang === article.lang) as ArticleType[];
  const nextLink = articlesByLang[articlesByLang.findIndex((x) => x.title === title) + 1] || articlesByLang[0];
  const previousLink =
    articlesByLang[articlesByLang.findIndex((x) => x.title === title) - 1] || articlesByLang[articlesByLang.length - 1];
  const relatedLinks = [previousLink, nextLink];

  return (
    <>
      <Layout title={`${title}`} description={intro} splash={{ img }} itemtype="Article" {...article}>
        <div className="article-page">
          <div data-aos="fade-right">
            <article className="new-stack">
              <div className="article__main article-shape">
                <div className="container narrow">
                  <div className="article__details">
                    <div className="article__categories">
                      {categoriesList?.map((c) => (
                        <Linkk key={c} href={`/blog?cat=${c}`}>
                          <a>
                            <span itemProp="articleSection">{t(`categories.${c}`)}</span>
                          </a>
                        </Linkk>
                      ))}
                    </div>
                    <div>
                      <time className="article__date" itemProp="datePublished" dateTime={convertDate(published)}>
                        {t('blog.published')} {convertDate(published)}
                      </time>
                      <time className="article__date" itemProp="dateModified" dateTime={convertDate(modified)}>
                        {t('blog.modified')} {convertDate(modified)}
                      </time>
                    </div>
                  </div>

                  <div className="article__content mb-10" itemProp="articleBody">
                    {children}
                  </div>

                  <div className="mb-15">
                    <Linkk href="/blog">
                      <a className="btn">
                        <AiFillCaretLeft className="mr-1" />
                        {t('blog.back')}
                      </a>
                    </Linkk>
                  </div>

                  {process.env.NODE_ENV === 'development' ? (
                    <p className="edit-article mb-2">
                      <Linkk href={`/admin/${slug}`}>Edit article</Linkk>
                    </p>
                  ) : null}

                  {relatedLinks.length ? (
                    <div>
                      <h2 className="mb-5">{t('blog.suggested')}</h2>
                      <Grid data={relatedLinks} count={2} className="mb-20" />
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          </div>
        </div>
      </Layout>
    </>
  );
}
