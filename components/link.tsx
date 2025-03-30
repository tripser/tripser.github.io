import { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

export function Linkk({ children, ...rest }: LinkProps & { children: ReactNode }) {
  const router = useRouter();

  const exceptions = () => {
    if (['/admin'].includes(String(rest.href))) return true;
  };

  const locale = (router.query.locale || 'en') as string;
  const _href = exceptions() ? `${rest.href}` : `/${locale}${rest.href}`;

  return (
    <>
      <Link href={_href}>{children}</Link>
    </>
  );
}
