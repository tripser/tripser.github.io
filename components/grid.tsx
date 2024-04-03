import Link from 'next/link';
import IMG_FOLDER from '@data/utils';
import { ArticleType } from '@types';

type GridItemCompType = {
  item: ArticleType;
};

function GridItem({ item }: GridItemCompType) {
  const img = item.img;
  const fullImageUrl = img.startsWith('http') ? img : `${IMG_FOLDER}${img}`;

  return (
    <Link href={item.link || ''}>
      <a title={item.title} className="card">
        <div className="card__img">
          <img
            srcSet={`${fullImageUrl.replace('.jpg', '-400.jpg')} 400w, ${fullImageUrl.replace(
              '.jpg',
              '-800.jpg'
            )} 800w, ${fullImageUrl} 1920w`}
            src={fullImageUrl}
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1199px) calc(50vw - 2rem), calc(33.33vw - 2rem)"
            alt={item.title}
            width="260"
            height="146"
            itemProp="image"
            loading="lazy"
          />
        </div>
        <div className="card__data">
          <h2 className="card__title">{item.title}</h2>
          <p className="card__categories">{item.categories}</p>
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

export function Grid({ data, count, className }: GridCompType) {
  return (
    <div className={`grid ${count ? `grid-${count}` : ''} ${className || ''}`}>
      {data.map((item) => {
        return <GridItem key={item.title} item={item} />;
      })}
    </div>
  );
}
