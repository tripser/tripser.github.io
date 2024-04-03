import IMG_FOLDER from '@utils/img-folder';

type FiguresCompType = {
  data: { src: string; caption: string }[];
};

// TODO: .figures .col-2 or .col-1-2 or col-2-1 ...
export function Figures({ data }: FiguresCompType) {
  const cols = data.length % 2 === 0;

  return (
    <div className={`figures ${cols ? 'figures2' : ''}`}>
      {data.map((fig) => {
        const fullFigUrl = fig.src.startsWith('http') ? fig.src : `${IMG_FOLDER}${fig.src}`;

        return (
          <figure key={fig.caption}>
            <img
              srcSet={`${fullFigUrl.replace('.jpg', '-400.jpg')} 400w, ${fullFigUrl} 800w`}
              src={fullFigUrl}
              sizes="calc(100vw - 2rem)"
              alt={fig.caption}
              width="260"
              height="146"
              itemProp="image"
              loading="lazy"
            />
            <figcaption>{fig.caption}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
