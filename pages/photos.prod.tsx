import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Layout } from '@components/layout';
import { Dialog } from '@components/modal';
import { PhotoType } from '@types';

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
                      <img
                        srcSet={`${photo.src.replace('.jpg', '-400.jpg')} 400w, ${photo.src} 800w`}
                        src={photo.src}
                        sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) calc(50vw - 2rem), calc(33.33vw - 2rem)"
                        alt={photo.caption}
                        width="260"
                        height="146"
                        itemProp="image"
                        loading="lazy"
                      />
                    </div>
                  }
                >
                  <Link href={photo.link}>
                    <a title={photo.title}>
                      <figure>
                        <img
                          srcSet={`${photo.src.replace('.jpg', '-400.jpg')} 400w, ${photo.src} 800w`}
                          src={photo.src}
                          sizes="calc(100vw - 2rem)"
                          alt={photo.caption}
                          width="260"
                          height="146"
                          itemProp="image"
                          loading="lazy"
                        />
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
