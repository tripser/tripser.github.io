import { forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor';

const Editorsk = dynamic(() => import('./editorInit'), {
  ssr: false,
});

export const Editor = forwardRef<
  MDXEditorMethods,
  MDXEditorProps & { handleImageFile: (image: File) => Promise<string> }
>((props, ref) => <Editorsk {...props} editorRef={ref} />);

Editor.displayName = 'ForwardRefEditor';
