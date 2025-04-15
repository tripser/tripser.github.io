import { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import useLocale from '@hooks/useLocale';

export function Linkk({ children, ...rest }: LinkProps & { children: ReactNode }) {
  const locale = useLocale();

  const exceptions = () => {
    if (String(rest.href).includes('/admin')) return true;
  };

  const _href = exceptions() ? `${rest.href}` : `/${locale}${rest.href}`;

  const isExternal = String(rest.href).startsWith('http');

  return (
    <>
      {isExternal ? (
        <Link href={rest.href}>
          <a target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        </Link>
      ) : (
        <Link href={_href}>{children}</Link>
      )}
    </>
  );
}
