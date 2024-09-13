import { useRef, useState } from 'react';
import fs from 'fs';
import path from 'path';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { useTranslation } from 'react-i18next';
import { baseEditorEN, baseEditorFR } from '@data/editorDefaults';
import { handleImageFile } from '@services/handleImageFile';
import { handleMdxFile } from '@services/handleMdxFile';
import { Editor } from '@components/editor';
import { Layout } from '@components/layout';
import { Linkk } from '@components/link';
import { UploadImage } from '@components/uploadImage';
import { ArticleType } from '@types';
import '@mdxeditor/editor/style.css';

type WritePageType = {
  title: string;
  description: string;
  article: ArticleType;
  articleContent: any;
};

export default function Write({ title, description, article, articleContent }: WritePageType) {
  const { t, i18n } = useTranslation();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [slug, setSlug] = useState(article?.slug || '');
  const [file, setFile] = useState<string>(article?.img || null);
  const [response, setResponse] = useState('');

  const isNew = !article;

  // TODO: add loading state
  // TODO: handle title passed in editor photo upload to use it as file name?

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
    <Layout title={title} description={description} url="https://tripser.blog/admin/write" lang={'en'}>
      <div className="write-page">
        <section className="py-5">
          <div className="container mt-3" style={{ maxWidth: 'calc(800px + 1.5rem + 19px)' }}>
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
                        `articles`,
                        [800, 400]
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

            <p className={slug ? 'mb-2' : 'mb-2 hidden'}>EDITOR</p>
            <Editor
              ref={editorRef}
              markdown={mdx}
              contentEditableClassName="article__content"
              className={slug ? 'mb-4' : 'mb-4 hidden'}
              handleImageFile={(e) => handleImageFile(e, null, `temp/${article.lang === 'en' ? slug : article.en}`)}
            />

            {slug ? (
              <>
                {response === 'saving' ? <p className="mb-2">Saving...</p> : null}

                {!isNew && response !== 'saving' ? (
                  <p className="mb-2">
                    <Linkk href={`/blog/${slug}`}>Check out the article</Linkk>
                  </p>
                ) : null}

                <button
                  className="btn btn-primary mr-2"
                  onClick={async () => {
                    const getMarkdown = editorRef.current?.getMarkdown();
                    if (getMarkdown) {
                      setResponse('saving');
                      const url = await handleMdxFile(slug, getMarkdown);
                      setResponse(url);
                      window.location.reload();
                    } else {
                      alert('Invalid Markdown');
                    }
                  }}
                >
                  save
                </button>

                <button
                  className="btn mr-2"
                  onClick={async () => {
                    const getMarkdown = editorRef.current?.getMarkdown();
                    console.log(getMarkdown);
                  }}
                >
                  log
                </button>
              </>
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
