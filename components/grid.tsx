import Link from 'next/link';
import { ArticleType } from 'types';

type GridItemCompType = {
  item: ArticleType;
};

function GridItem({ item }: GridItemCompType) {
  return (
    <Link href={item.link || ''}>
      <a title={item.title} className="card">
        <div className="card__img">
          <img src={item.mini || item.img} alt={item.title} width="260" height="146" loading="lazy" />
        </div>
        <div className="card__data">
          <h2 className="card__title t-ellipsis">{item.title}</h2>
          <p>{item.categories}</p>
        </div>
      </a>
    </Link>
  );
}

type GridCompType = {
  data: ArticleType[];
  count?: number;
  className?: string;
};

export default function Grid({ data, count, className }: GridCompType) {
  return (
    <div className={`grid ${count ? `grid-${count}` : ''} ${className || ''}`}>
      {data.map((item) => {
        return <GridItem key={item.title} item={item} />;
      })}
    </div>
  );
}
