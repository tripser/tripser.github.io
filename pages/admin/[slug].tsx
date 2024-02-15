import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { Layout } from '@components/layout';
import { Editor } from '@components/editor';
import { UploadImage } from '@components/uploadImage';
import { handleMdxFile } from 'services/handleMdxFile';
import { handleImageFile } from 'services/handleImageFile';
import { baseEditorEN, baseEditorFR } from '@data/editorDefaults';
import { ArticleType } from 'types';

import fs from 'fs';
import path from 'path';

type WritePageType = {
  title: string;
  description: string;
  article: ArticleType;
  articleContent: any;
};

export default function Write({ title, description, article, articleContent }: WritePageType) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [slug, setSlug] = useState(article?.slug || '');
  const [file, setFile] = useState<string>(article?.img || null);
  const [response, setResponse] = useState('');

  const isNew = !article;

  useEffect(() => {
    process.env.NODE_ENV !== 'development' && router.push('/404');
  }, []);

  // TODO: add loading state
  // TODO: handle title passed in editor photo upload

  const defaultMarkdown = i18n.language === 'fr' ? baseEditorFR : baseEditorEN;
  const markdown = isNew ? defaultMarkdown : articleContent;
  const mdx = markdown
    .replace(/{\/\*\s?/g, '<MdxComment>\n')
    .replace(/\s?\*\/}/g, '\n</MdxComment>')
    .replace(/<a/g, '<MdxLink')
    .replace(/<\/a>/g, '</MdxLink>')
    .replace(/target="_blank"/g, '')
    .replace(
      /<Figures\s+data={\s*\[\s*{\s*src:\s*"([^"]*)",\s*caption:\s*"([^"]*)",?\s*},?\s*\]\s*}\s*\/>/gs,
      '![$2]($1)'
    );

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <Layout title={title} description={description} url="https://tripser.blog/admin/write">
      <div className="write-page">
        <section className="py-5">
          <div className="container mt-3" style={{ maxWidth: 'calc(800px + 1.5rem + 2px)' }}>
            <p>SLUG</p>
            <input
              placeholder="slug"
              value={slug}
              onChange={(e) => setSlug(e.currentTarget.value)}
              className="mb-4"
              autoFocus
              disabled={!isNew}
            />

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
              markdown={mdx}
              contentEditableClassName="article__content"
              className={slug ? 'mb-4' : 'mb-4 hidden'}
              handleImageFile={(e) => handleImageFile(e, null, `content/${slug}`)}
            />

            {slug && !response ? (
              <button
                className="btn btn-primary"
                onClick={async () => {
                  const getMarkdown = editorRef.current?.getMarkdown();
                  console.log(getMarkdown);
                  if (getMarkdown) {
                    setResponse('saving');
                    const url = await handleMdxFile(slug, getMarkdown);
                    setResponse(url);
                  } else {
                    alert('Invalid Markdown');
                  }
                }}
              >
                save
              </button>
            ) : null}

            {response === 'saving' ? <p>Saving...</p> : null}

            {response && response !== 'saving' ? (
              <button className="btn btn-primary" onClick={() => router.push(response)}>
                Check out your new article
              </button>
            ) : null}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const articles = require('@data/articles') as ArticleType[];
  const article = articles.find((p) => p.slug === context.params.slug) || null;
  const articleContent = article ? fs.readFileSync(path.join(`pages/blog/${article.slug}.mdx`), 'utf8') : null;

  return {
    props: {
      title: article ? `Edit: ${article.title}` : 'Write new Article',
      description: '',
      article,
      articleContent,
    },
  };
}

export async function getStaticPaths() {
  const articles = require('@data/articles') as ArticleType[];
  const paths = articles.map((a) => ({ params: { slug: a.slug } }));

  return {
    paths: [...paths, { params: { slug: 'new' } }],
    fallback: false,
  };
}
