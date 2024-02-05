import type { ForwardedRef } from 'react';
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  frontmatterPlugin,
  linkPlugin,
  linkDialogPlugin,
  toolbarPlugin,
  diffSourcePlugin,
  imagePlugin,
  tablePlugin,
  MDXEditor,
  DiffSourceToggleWrapper,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  InsertFrontmatter,
  InsertThematicBreak,
  InsertTable,
  type MDXEditorMethods,
  type MDXEditorProps,
} from '@mdxeditor/editor';

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin({ allowedHeadingLevels: [2, 3, 4] }),
        listsPlugin(),
        quotePlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        frontmatterPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        // https://mdxeditor.dev/editor/docs/images
        // handle image uploads => call node to save image (compress? & resize?) and return the url
        imagePlugin(),
        thematicBreakPlugin(),
        tablePlugin(),
        diffSourcePlugin({ viewMode: 'rich-text' }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <CreateLink />
                <InsertImage />
                <InsertFrontmatter />
                <InsertThematicBreak />
                <InsertTable />
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
