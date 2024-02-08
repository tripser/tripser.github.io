import { ReactElement } from 'react';

type FrameCompType = {
  children: ReactElement;
};

export function Frame({ children }: FrameCompType) {
  return <p className="frame">{children}</p>;
}
