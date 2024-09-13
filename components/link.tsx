import { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

export function Linkk({ children, ...rest }: LinkProps & { children: ReactNode }) {
  const router = useRouter();

  const locale = (router.query.locale || 'en') as string;
  // const _href = locale === 'en' ? rest.href : `/${locale}${rest.href}`;
  const _href = `/${locale}${rest.href}`;

  return (
    <>
      <Link href={_href}>{children}</Link>
    </>
  );
}
