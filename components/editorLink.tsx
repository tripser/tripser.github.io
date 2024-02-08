import {
  ButtonWithTooltip,
  GenericJsxEditor,
  JsxComponentDescriptor,
  insertJsx$,
  usePublisher,
} from '@mdxeditor/editor';
import { MdLink } from 'react-icons/md';

const name = 'MdxLink';
const kind = 'text';

export const mdxLink = {
  name: name,
  kind: kind, // 'text' for inline, 'flow' for block
  // the source field is used to construct the import statement at the top of the markdown document.
  // it won't be actually sourced.
  source: '@components/mdxLink',
  // Used to construct the property popover of the generic editor
  props: [{ name: 'href', type: 'string' }],
  // whether the component has children or not
  hasChildren: true,
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
