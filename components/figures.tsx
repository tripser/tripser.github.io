import IMG_FOLDER from '../data/utils';

type FiguresCompType = {
  data: { src: string; caption: string }[];
};

// TODO: .figures .col-2 or .col-1-2 or col-2-1 ...
export default function Figures({ data }: FiguresCompType) {
  const cols = data.length % 2 === 0;

  return (
    <div className={`figures ${cols ? 'figures2' : ''}`}>
      {data.map((fig) => {
        const fullFigUrl = fig.src.startsWith('http') ? fig.src : `${IMG_FOLDER}${fig.src}`;

        return (
          <figure key={fig.caption}>
            <img src={fullFigUrl} alt={fig.caption} width="260" height="146" loading="lazy" />
            <figcaption>{fig.caption}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
