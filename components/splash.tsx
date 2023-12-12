type SplashCompType = {
  title: string;
  subtitle?: string;
  splash: string;
};

export default function Splash({ title, subtitle, splash }: SplashCompType) {
  return (
    <>
      <div className="splash" data-aos="fade-up">
        <img src={splash} alt={title} width="300" height="150" itemProp="image" />
        <div className="splash__headings">
          <h1 itemProp="headline name">{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
    </>
  );
}
