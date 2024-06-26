import type { ForwardedRef } from 'react';
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  frontmatterPlugin,
  // linkPlugin,
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
  // CreateLink,
  InsertImage,
  InsertFrontmatter,
  InsertThematicBreak,
  InsertTable,
  type MDXEditorMethods,
  type MDXEditorProps,
  jsxPlugin,
  JsxComponentDescriptor,
  Separator,
} from '@mdxeditor/editor';
import { InsertMdxComment, mdxComment } from './editorComment';
import { InsertFrame, frame } from './editorFrame';
import { InsertMdxLink, mdxLink } from './editorLink';

interface EditorInitProps extends MDXEditorProps {
  editorRef: ForwardedRef<MDXEditorMethods> | null;
  handleImageFile?: (file: File) => Promise<string>;
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [mdxLink, frame, mdxComment];

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
        // linkPlugin(),
        linkDialogPlugin(),
        frontmatterPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        imagePlugin(
          handleImageFile
            ? { imageUploadHandler: handleImageFile, disableImageResize: true }
            : { disableImageResize: true }
        ),
        thematicBreakPlugin(),
        tablePlugin(),
        jsxPlugin({ jsxComponentDescriptors: jsxComponentDescriptors }),
        diffSourcePlugin({ viewMode: 'rich-text' }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                {/* <CreateLink /> */}
                <InsertImage />
                <InsertThematicBreak />
                <InsertTable />
                <InsertMdxLink />
                <InsertFrame />
                <InsertMdxComment />
                <InsertFrontmatter />
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
