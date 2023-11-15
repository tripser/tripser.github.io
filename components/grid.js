import Link from 'next/link';
import PropTypes from 'prop-types';

function GridItem({ item }) {
  return (
    <Link href={item.link || ''}>
      <a title={item.title} className="card">
        <div className="card__img">
          <img src={item.img} alt={item.title} width="260" height="146" loading="lazy" />
        </div>
        <div className="card__data">
          <h2 className="card__title t-ellipsis">{item.title}</h2>
          <p>{item.categories}</p>
        </div>
      </a>
    </Link>
  );
}

GridItem.propTypes = {
  item: PropTypes.object,
};

export default function Grid({ data, className }) {
  return (
    <div className={'grid ' + (className || '')}>
      {data.map((item) => {
        return <GridItem key={item.title} item={item} />;
      })}
    </div>
  );
}

Grid.propTypes = {
  data: PropTypes.array,
  className: PropTypes.string,
};
