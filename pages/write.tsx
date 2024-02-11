import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { Layout } from '@components/layout';
import { Editor } from '@components/editor';
import { UploadImage } from '@components/uploadImage';
import { handleMdxFile } from 'services/handleMdxFile';
import { handleImageFile } from 'services/handleImageFile';
import { PhotoType } from 'types';

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
***
- liste
> citation
`;

export default function Write({ title, description, splash }: WritePageType) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [slug, setSlug] = useState('');
  const [file, setFile] = useState<string>(null);

  return (
    <Layout title={title} description={description} splash={splash} url="https://tripser.blog/photos">
      <div className="write-page">
        <section>
          <div className="container mt-3" data-aos="fade-right" style={{ maxWidth: 'calc(800px + 1.5rem + 2px)' }}>
            <p>SLUG</p>
            <input placeholder="slug" onChange={(e) => setSlug(e.currentTarget.value)} className="mb-4" autoFocus />

            {slug ? (
              <>
                <p>IMAGE</p>
                <UploadImage
                  file={file}
                  setFile={setFile}
                  onChange={async (e) => {
                    if (e.target.files[0]) {
                      const f = await handleImageFile(
                        e.target.files[0],
                        `${slug}.${e.target.files[0].name.split('.').pop()}`,
                        `articles`
                      );
                      if (f) setFile(f);
                    } else {
                      setFile(null);
                    }
                  }}
                  className="mb-4"
                />
              </>
            ) : null}

            {/* TODO: style the RTE elements as an article page */}

            <p className={slug ? '' : 'hidden'}>EDITOR</p>
            <Editor
              ref={editorRef}
              markdown={i18n.language === 'en' ? baseEditorEN : baseEditorFR}
              contentEditableClassName="article__content"
              className={slug ? 'mb-4' : 'mb-4 hidden'}
              handleImageFile={(e) => handleImageFile(e, null, `content/${slug}`)}
            />

            {slug ? (
              <button
                className="btn btn-primary"
                onClick={async () => {
                  const getMarkdown = editorRef.current?.getMarkdown();
                  if (getMarkdown) {
                    const url = await handleMdxFile(slug, editorRef.current?.getMarkdown());
                    router.push(url);
                  } else {
                    alert('Invalid Markdown');
                  }
                }}
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
