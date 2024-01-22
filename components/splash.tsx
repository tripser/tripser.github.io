import IMG_FOLDER from '../data/utils';

type SplashCompType = {
  title: string;
  subtitle?: string;
  splash: string;
};

export default function Splash({ title, subtitle, splash }: SplashCompType) {
  const fullSplashUrl = splash.startsWith('http') ? splash : `${IMG_FOLDER}${splash}`;

  return (
    <>
      <div className="splash" data-aos="fade-up">
        <img
          srcSet={`${fullSplashUrl.replace('.jpg', '-mini.jpg')} 800w, ${fullSplashUrl} 1920w`}
          src={fullSplashUrl}
          sizes="(max-width: 800px) 100vw, 1920px"
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
