import {
  ButtonWithTooltip,
  GenericJsxEditor,
  JsxComponentDescriptor,
  insertJsx$,
  usePublisher,
} from '@mdxeditor/editor';
import { MdAspectRatio } from 'react-icons/md';

const name = 'Frame';
const kind = 'flow';

export const frame = {
  name: name,
  kind: kind,
  source: '@components/frame',
  props: [],
  hasChildren: true,
  Editor: GenericJsxEditor,
} as JsxComponentDescriptor;

export const InsertFrame = () => {
  const insertJsx = usePublisher(insertJsx$);
  return (
    <ButtonWithTooltip
      title="Insert frame"
      onClick={() =>
        insertJsx({
          name: name,
          kind: kind,
          props: {},
        })
      }
    >
      <MdAspectRatio size={24} />
    </ButtonWithTooltip>
  );
};
