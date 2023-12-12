import fs, { writeFileSync } from 'fs';
import path from 'path';
import prettier from 'prettier';
import matter from 'gray-matter';

export const getArticles = () => {
  const files = fs.readdirSync(path.join('pages/blog'));
  const allArticlesData = files
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const fileContents = fs.readFileSync(path.join(`pages/blog/${file}`), 'utf8');
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title,
        intro: data.intro || '',
        img: `/images/articles/${slug}.jpg`,
        published: data.published || '',
        modified: data.modified || '',
        lang: data.lang || 'en',
        en: data.en || '',
        fr: data.fr || '',
        categories: data.categories || '',
        link: `/blog/${slug}`,
        url: `https://tripser.github.io/blog/${slug}`,
      };
    })
    .filter((x) => x.title);
  return allArticlesData.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
};

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const articles = getArticles();

  const fileContent = `
    const articles = ${JSON.stringify(articles)}; 
    
    module.exports = articles;`;

  const formatted = prettier.format(fileContent, {
    ...prettierConfig,
    parser: 'typescript',
  });

  writeFileSync('data/articles.js', formatted);
}

generate();
