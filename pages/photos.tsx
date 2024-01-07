import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Layout from '@components/layout';
import Dialog from '@components/modal';
import { PhotoType } from 'types';

type PhotosPageType = {
  title: string;
  description: string;
  splash: string;
  photos: PhotoType[];
};

export default function Photos({ title, description, splash, photos }: PhotosPageType) {
  const { t, i18n } = useTranslation();

  const photosByLang = photos.filter((x) => x.lang === i18n.language);

  // TODO:
  // randomize order?
  // fancier grid?
  // carousel?
  // filter by article?
  // only my pics?
  // real lazy loading

  return (
    <Layout title={title} description={description} splash={splash} url="https://tripser.blog/photos">
      <div className="photos-page">
        <section>
          <div className="container mt-3" data-aos="fade-right">
            <p className="ch-80 mb-8">{t('photos.intro')}</p>

            <div className="grid">
              {photosByLang.map((photo) => (
                <Dialog
                  key={photo.src}
                  trigger={
                    <div className="img-container" title="Zoom on image">
                      <img src={photo.src} alt={photo.caption} width="260" height="146" loading="lazy" />
                    </div>
                  }
                >
                  <Link href={photo.link}>
                    <a title={photo.title}>
                      <figure>
                        <img src={photo.src} alt={photo.caption} width="260" height="146" loading="lazy" />
                        <figcaption>{photo.caption}</figcaption>
                      </figure>
                    </a>
                  </Link>
                </Dialog>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const photos = require('@data/photos') as PhotoType[];

  return {
    props: {
      title: 'Photos',
      description:
        'Find all photos from our exciting trips. The most iconic, beautiful and interesting views from the best destinations.',
      splash: '/images/kotor.jpg',
      photos: photos,
    },
  };
}
