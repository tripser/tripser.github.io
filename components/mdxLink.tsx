import { Linkk } from './link';

type MdxLinkCompType = {
  href: string;
  children: React.ReactNode;
};

export function MdxLink({ href, children }: MdxLinkCompType) {
  const isExternal = href.startsWith('http');

  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Linkk href={href}>
      <a>{children}</a>
    </Linkk>
  );
}
