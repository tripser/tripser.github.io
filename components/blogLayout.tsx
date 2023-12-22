import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { AiFillCaretLeft } from 'react-icons/ai';
// @ts-ignore
import articles from '@data/articles';
import Layout from '@components/layout';
import Grid from '@components/grid';
import { ArticleType } from 'types';

type BlogLayoutCompType = {
  children: ReactElement;
};

const convertDate = (d) =>
  d === '' ? 'No date' : `${new Date(d).getDate()}.${new Date(d).getMonth() + 1}.${new Date(d).getFullYear()}`;

export default function BlogLayout({ children }: BlogLayoutCompType) {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const article = articles.find((p) => p.slug === router.pathname.replace('/blog/', '')) as ArticleType;
  const { title, intro, img, published, modified, categories } = article;

  const categoriesList = categories?.split(', ').filter((x) => x);

  const articlesByLang = articles.filter((x) => x.lang === i18n.language) as ArticleType[];
  const nextLink = articlesByLang[articlesByLang.findIndex((x) => x.title === title) + 1] || articlesByLang[0];
  const previousLink =
    articlesByLang[articlesByLang.findIndex((x) => x.title === title) - 1] || articlesByLang[articlesByLang.length - 1];
  const relatedLinks = [previousLink, nextLink];

  return (
    <>
      <Layout title={`${title}`} description={intro} splash={img} itemtype="Article" {...article}>
        <div className="article-page">
          <div data-aos="fade-right">
            <article className="new-stack">
              <div className="article__main article-shape">
                <div className="container narrow">
                  <div className="article__details">
                    <div className="article__categories">
                      {categoriesList?.map((c) => (
                        <Link key={c} href={`/blog?${c}`}>
                          <a>
                            <span itemProp="articleSection">{t(`categories.${c}`)}</span>
                          </a>
                        </Link>
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
                    <Link href="/blog">
                      <a className="btn">
                        <AiFillCaretLeft className="mr-1" />
                        {t('blog.back')}
                      </a>
                    </Link>
                  </div>

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
