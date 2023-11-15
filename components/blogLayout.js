import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { AiFillCaretLeft } from 'react-icons/ai';
import articles from '@data/articles';
import Layout from '@components/layout';
import Grid from '@components/grid';

const convertDate = (d) =>
  d === '' ? 'No date' : `${new Date(d).getDate()}.${new Date(d).getMonth() + 1}.${new Date(d).getFullYear()}`;

export default function BlogLayout({ children }) {
  const router = useRouter();

  const article = articles.find((p) => p.slug === router.asPath.replace('/blog/', ''));
  const { title, intro, img, published, modified, categories } = article;

  const categoriesList = categories?.split(', ').filter((x) => x);

  const nextLink = articles[articles.findIndex((x) => x.title === title) + 1] || articles[0];
  const previousLink = articles[articles.findIndex((x) => x.title === title) - 1] || articles[articles.length - 1];
  const relatedLinks = [];

  return (
    <>
      <Layout title={`${title} | Blog | Rémy Beumier`} description={intro} itemtype="Article" {...article}>
        <div data-aos="fade-right">
          <article className="new-stack">
            <div className="article__splash">
              <img src={img} alt={title} width="300" height="150" itemProp="image" />
              <h1 itemProp="headline name">{title}</h1>
            </div>
            <div className="article__main article-shape">
              <div className="container narrow">
                <div className="space-between-x pt-5 mb-10">
                  <div className="article__categories">
                    {categoriesList?.map((c) => (
                      <Link key={c} href={`/blog?${c}`}>
                        <a>
                          <span itemProp="articleSection">{c.charAt(0).toUpperCase() + c.slice(1)}</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div>
                    <time
                      className="article__date"
                      itemProp="datePublished"
                      content={convertDate(published)}
                      dateTime={convertDate(published)}
                    >
                      Published on: {convertDate(published)}
                    </time>
                    <time
                      className="article__date"
                      itemProp="dateModified"
                      content={convertDate(modified)}
                      dateTime={convertDate(modified)}
                    >
                      Modified on: {convertDate(modified)}
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
                      Back to blog listing
                    </a>
                  </Link>
                </div>

                {relatedLinks.length ? (
                  <div>
                    <h2 className="mb-5">Suggested articles</h2>
                    <Grid data={relatedLinks} className="mb-20" />
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        </div>
      </Layout>
    </>
  );
}

BlogLayout.propTypes = {
  children: PropTypes.node,
};
