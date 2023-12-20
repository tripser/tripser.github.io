import fs, { writeFileSync } from 'fs';
import path from 'path';
import prettier from 'prettier';
import articles from './data/articles.js';

export const getPhotos = () => {
  const files = fs.readdirSync(path.join('pages/blog')).filter((file) => file.endsWith('.mdx'));

  const figuresRegex = /<Figures\b[^>]*\/>/g;

  const allPictures = files.map((file) => {
    const filePath = path.join('pages/blog', file);
    const mdxContent = fs.readFileSync(filePath, 'utf-8');

    const article = articles.find((x) => x.slug === file.replace('.mdx', ''));
    if (!article) return;

    const pictures = Array.from(mdxContent.matchAll(figuresRegex), (match) => {
      const ddd = match[0].trim();
      const srcMatch = ddd.match(/src: '([^']+)'/);
      const captionMatch = ddd.match(/caption: '([^']+)'/);
      if (srcMatch[1].includes('/maps/')) return;
      return {
        src: srcMatch ? srcMatch[1] : '',
        caption: captionMatch ? captionMatch[1] : '',
        title: article.title,
        lang: article.lang,
        link: article.link,
      };
    }).filter((x) => x);

    return pictures;
  });

  return allPictures.flat();
};

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const photos = getPhotos();

  const fileContent = `const photos = ${JSON.stringify(photos)}; module.exports = photos;`;

  const formatted = prettier.format(fileContent, {
    ...prettierConfig,
    parser: 'babel',
  });

  writeFileSync('data/photos.js', formatted);
}

generate();
