import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@components/layout';
import { PhotoType } from 'types';
import { Editor } from '@components/editor';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { handleMdxFile } from 'services/handleMdxFile';
import { handleImageFile } from 'services/handleImageFile';

type WritePageType = {
  title: string;
  description: string;
  splash: string;
  photos: PhotoType[];
};

const baseEditorEN = `
---
title: 'Title'
intro: 'Intro'
published: '2024-01-15'
modified: '2024-01-15'
lang: 'en'
fr: 'slug-fr'
categories: 'voyage, europe, france, hike, beach, christmas, city-trip'
---

## Heading 2
### Heading 3
paragraph
**bold**
*italic*
<u>underline</u>
[link](https://tripser.blog)
***
- list
> quote
`;

const baseEditorFR = `
---
title: 'Titre'
intro: 'Intro'
published: '2024-01-15'
modified: '2024-01-15'
lang: 'fr'
en: 'slug-en'
categories: 'voyage, europe, france, hike, beach, christmas, city-trip'
---

## Titre 2
### Titre 3
paragraphe
**gras**
*italique*
<u>souligné</u>
[lien](https://tripser.blog)
***
- liste
> citation
`;

export default function Write({ title, description, splash }: WritePageType) {
  const { t, i18n } = useTranslation();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [slug, setSlug] = useState('');

  return (
    <Layout title={title} description={description} splash={splash} url="https://tripser.blog/photos">
      <div className="write-page">
        <section>
          <div className="container narrow mt-3" data-aos="fade-right">
            <p>SLUG</p>
            <input placeholder="slug" onChange={(e) => setSlug(e.currentTarget.value)} className="mb-4" autoFocus />

            {/* TODO: style the RTE elements as an article page */}

            <p className={slug ? '' : 'hidden'}>EDITOR</p>
            <Editor
              ref={editorRef}
              markdown={i18n.language === 'en' ? baseEditorEN : baseEditorFR}
              contentEditableClassName="article__content"
              className={slug ? 'mb-4' : 'mb-4 hidden'}
              handleImageFile={(e) => handleImageFile(e, `content/${slug}`)}
            />

            {slug ? (
              <button
                className="btn btn-primary"
                onClick={() =>
                  editorRef.current?.getMarkdown()
                    ? handleMdxFile(slug, editorRef.current?.getMarkdown())
                    : alert('Invalid Markdown')
                }
              >
                {t('save')}
              </button>
            ) : null}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: 'Write',
      description: '',
      splash: '/images/kotor.jpg',
    },
  };
}
