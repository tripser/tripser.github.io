import Link from 'next/link';
import PropTypes from 'prop-types';
import { AiFillCaretRight } from 'react-icons/ai';
import Layout from '@components/layout';
import Grid from '@components/grid';

export default function Home({ title, subtitle, description, splash, articles }) {
  return (
    <Layout title={title} subtitle={subtitle} description={description} splash={splash}>
      <section id="blog" className="blog">
        <div className="home-shapes"></div>
        <div className="container mt-3" data-aos="fade-right">
          <h2>Latest articles</h2>
          <p className="mb-10">
            Discover our latest pieces written with love and filled with tips for your best trips.
          </p>
          <Grid data={articles.slice(0, 3)} className="mt-10 mb-10" />
          {/* <Grid data={[...articles, ...articles, ...articles, ...articles, ...articles, ...articles]} /> */}
          <div className="btn-wrapper-right">
            <Link href="/blog">
              <a className="btn">
                Check all articles
                <AiFillCaretRight className="ml-1" />
              </a>
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="home-shapes"></div>
        <div className="container" data-aos="fade-right">
          <div className="cols cols-lg">
            <div className="col centered-v">
              <h2>
                Hey, it's Charlotte & Rémy, we are from Brussels and we try our best to discover and share the best
                trips.
              </h2>
              <p>
                Ever since our young years, we have always enjoyed <strong>exploring</strong>. We have developed our
                passion for
                <strong> travelling</strong> through numbers of voyages with family, friends and loved ones.
              </p>
              <a className="btn mt-5 mb-4 mr-4" href="" target="_blank">
                Check out my resume
                <AiFillCaretRight className="ml-1" />
              </a>
            </div>

            <div className="col centered-v">
              <img
                src="/images/exploring.svg"
                alt="developer thinking next to a computer"
                width="270"
                height="112"
                loading="lazy"
                className="about__img mt-5 mb-5"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

Home.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  splash: PropTypes.string,
  articles: PropTypes.array,
};

export async function getStaticProps() {
  const articles = require('@data/articles');

  return {
    props: {
      title: 'Tripser',
      subtitle: 'Voyage blog',
      description:
        'Get inspired by our best journeys. Tripser is a blog focused on voyages and trips. Discover the best views, hikes, stays activities and much more.',
      splash: '/images/mountain.jpg',
      articles: articles,
    },
  };
}
