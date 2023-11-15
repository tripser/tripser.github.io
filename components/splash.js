import PropTypes from 'prop-types';

export default function Splash({ title, subtitle, splash }) {
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

Splash.propTypes = { title: PropTypes.string, subtitle: PropTypes.string, splash: PropTypes.string };
