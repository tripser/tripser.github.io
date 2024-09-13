import { useTranslation } from 'react-i18next';
import photos from '@data/photos';
import { Dialog } from '@components/dialog';
import { Layout } from '@components/layout';
import { Linkk } from '@components/link';
import { PhotoType } from '@types';

export default function Photos({ locale }: { locale: string }) {
  return <PhotosPage locale={locale} />;
}

export function PhotosPage({ locale }: { locale: string }) {
  const { t, i18n } = useTranslation();

  const title = locale === 'en' ? 'Photos' : 'Photos';

  const description =
    locale === 'en'
      ? 'Find all photos from our exciting trips. The most iconic, beautiful and interesting views from the best destinations.'
      : 'Retrouvez toutes les photos de nos voyages excitants. Les vues les plus emblématiques, belles et intéressantes des meilleures destinations.';

  const photosByLang = photos.filter((x) => x.lang === i18n.language) as PhotoType[];

  // TODO:
  // randomize order?
  // fancier grid?
  // carousel?
  // filter by article?
  // real lazy loading

  return (
    <Layout
      title={title}
      description={description}
      splash={{ img: '/images/kotor.jpg' }}
      url="https://tripser.blog/photos"
      lang={locale}
    >
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
                  <Linkk href={photo.link}>
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
                  </Linkk>
                </Dialog>
              ))}
            </div>
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
  const locale = params?.locale as string;

  return {
    props: { locale },
  };
}
