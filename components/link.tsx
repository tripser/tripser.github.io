import { AnchorHTMLAttributes, ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import useLocale from '@hooks/useLocale';

type LinkType = {
  href: string;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps;

export function Linkk({ href, children, ..._rest }: LinkType) {
  const locale = useLocale();

  const { scroll, ...rest } = _rest;

  const LinkProps = { scroll };

  const exceptions = () => {
    if (String(href).includes('/admin')) return true;
  };

  const _href = exceptions() ? `${href}` : `/${locale}${href}`;

  const isExternal = String(href).startsWith('http');

  return (
    <>
      {isExternal ? (
        <Link href={href} {...LinkProps}>
          <a target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        </Link>
      ) : (
        <Link href={_href} {...LinkProps}>
          <a {...rest}>{children}</a>
        </Link>
      )}
    </>
  );
}
