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

interface EditorInitProps extends MDXEditorProps {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
  handleImageFile?: (file: File) => Promise<string>;
}

export default function InitializedMDXEditor({
  editorRef,
  handleImageFile,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & EditorInitProps) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin({ allowedHeadingLevels: [2, 3, 4] }),
        listsPlugin(),
        quotePlugin(),
        // https://mdxeditor.dev/editor/docs/jsx
        // <a href="_blank"></a>, <Figures />, <Frame />
        linkPlugin(),
        linkDialogPlugin(),
        frontmatterPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        imagePlugin(handleImageFile ? { imageUploadHandler: handleImageFile } : {}),
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
