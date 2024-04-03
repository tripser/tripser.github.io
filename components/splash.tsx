import IMG_FOLDER from '@utils/img-folder';

type SplashCompType = {
  title: string;
  subtitle?: string;
  splash: string;
};

export function Splash({ title, subtitle, splash }: SplashCompType) {
  const fullSplashUrl = splash.startsWith('http') ? splash : `${IMG_FOLDER}${splash}`;

  return (
    <>
      <div className="splash" data-aos="fade-up">
        <img
          srcSet={`${fullSplashUrl.replace('.jpg', '-400.jpg')} 400w, ${fullSplashUrl.replace(
            '.jpg',
            '-800.jpg'
          )} 800w, ${fullSplashUrl} 1920w`}
          src={fullSplashUrl}
          sizes="100vw"
          alt={title}
          width="320"
          height="168"
          itemProp="image"
        />

        <div className="splash__headings">
          <h1 itemProp="headline name">{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
    </>
  );
}
