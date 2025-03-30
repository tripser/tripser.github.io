import { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import useLocale from '@hooks/useLocale';

export function Linkk({ children, ...rest }: LinkProps & { children: ReactNode }) {
  const locale = useLocale();

  const exceptions = () => {
    if (['/admin'].includes(String(rest.href))) return true;
  };

  const _href = exceptions() ? `${rest.href}` : `/${locale}${rest.href}`;

  return (
    <>
      <Link href={_href}>{children}</Link>
    </>
  );
}
