import { useRouter } from 'next/router';
import { AiFillCaretRight } from 'react-icons/ai';
import { Linkk } from './link';

export function Breadcrumb() {
  const router = useRouter();

  const route = router.pathname;
  const split = route.split('/').filter((x) => !!x && x !== '[locale]');

  return router.route !== '/' ? (
    <div className="breadcrumb">
      <ul>
        <li>
          <Linkk href="/">Home</Linkk>
        </li>
        {split.map((x, i) => (
          <li key={x}>
            {i === split.length - 1 ? (
              <>
                <AiFillCaretRight />
                {x.replace(/-/g, ' ')}
              </>
            ) : (
              <>
                <AiFillCaretRight />
                <Linkk href={`/${x}`}>
                  <a>{x.replace(/-/g, ' ')}</a>
                </Linkk>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
