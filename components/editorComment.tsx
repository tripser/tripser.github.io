import {
  ButtonWithTooltip,
  GenericJsxEditor,
  JsxComponentDescriptor,
  insertJsx$,
  usePublisher,
} from '@mdxeditor/editor';
import { MdCodeOff } from 'react-icons/md';

const name = 'MdxComment';
const kind = 'flow';

export const mdxComment = {
  name: name,
  kind: kind,
  source: '@components/mdxComment',
  props: [],
  hasChildren: true,
  Editor: GenericJsxEditor,
} as JsxComponentDescriptor;

export const InsertMdxComment = () => {
  const insertJsx = usePublisher(insertJsx$);
  return (
    <ButtonWithTooltip
      title="Insert comment"
      onClick={() =>
        insertJsx({
          name: name,
          kind: kind,
          props: {},
        })
      }
    >
      <MdCodeOff size={24} />
    </ButtonWithTooltip>
  );
};
