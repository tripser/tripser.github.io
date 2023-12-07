import PropTypes from 'prop-types';

// TODO: .figures .col-2 or .col-1-2 or col-2-1 ...
export default function Figures({ data }) {
  const cols = data.length % 2 === 0;
  return (
    <div className={`figures ${cols ? 'figures2' : ''}`}>
      {data.map((fig) => (
        <figure key={fig.caption}>
          <img src={fig.src} alt={fig.caption} />
          <figcaption>{fig.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

Figures.propTypes = {
  data: PropTypes.arrayOf({ src: PropTypes.string, caption: PropTypes.string }),
};
