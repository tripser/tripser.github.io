type SplashCompType = {
  title: string;
  subtitle?: string;
  splash: string;
};

export default function Splash({ title, subtitle, splash }: SplashCompType) {
  const fullSplashUrl = splash.startsWith('http')
    ? splash
    : `https://raw.githubusercontent.com/tripser/tripser.github.io/main/public${splash}`;

  return (
    <>
      <div className="splash" data-aos="fade-up">
        <img src={fullSplashUrl} alt={title} width="320" height="168" itemProp="image" />
        <div className="splash__headings">
          <h1 itemProp="headline name">{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
    </>
  );
}
