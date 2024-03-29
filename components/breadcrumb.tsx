import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillCaretRight } from 'react-icons/ai';

export function Breadcrumb() {
  const router = useRouter();

  const route = router.pathname;
  const split = route.split('/').filter((x) => x);

  return router.route !== '/' ? (
    <div className="breadcrumb">
      <ul>
        <li>
          <Link href="/">Home</Link>
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
                <Link href={`/${x}`}>
                  <a>{x.replace(/-/g, ' ')}</a>
                </Link>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
