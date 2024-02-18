import {
  ButtonWithTooltip,
  GenericJsxEditor,
  JsxComponentDescriptor,
  insertJsx$,
  usePublisher,
} from '@mdxeditor/editor';
import { MdLink } from 'react-icons/md';

const name = 'MdxLink'; // name of the component
const kind = 'text'; // 'text' for inline, 'flow' for block

export const mdxLink = {
  name: name,
  kind: kind,
  source: '@components/mdxLink', // the source for the import
  // Used to construct the property popover of the generic editor
  props: [{ name: 'href', type: 'string' }],
  hasChildren: true, // whether the component has children or not
  Editor: GenericJsxEditor,
} as JsxComponentDescriptor;
// https://mdxeditor.dev/editor/docs/jsx

// a toolbar button that will insert a JSX element into the editor.
export const InsertMdxLink = () => {
  const insertJsx = usePublisher(insertJsx$);
  return (
    <ButtonWithTooltip
      title="Insert link"
      onClick={() =>
        insertJsx({
          name: name,
          kind: kind,
          props: { href: '' },
        })
      }
    >
      <MdLink size={24} />
    </ButtonWithTooltip>
  );
};
