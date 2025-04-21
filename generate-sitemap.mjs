import { writeFileSync } from 'fs';
import prettier from 'prettier';
import articles from './data/articles.js';

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const baseUrl = 'https://tripser.blog';

  // standard sitemap.xml
  const today = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date()
    .getDate()
    .toString()
    .padStart(2, '0')}`;
  const pages = [
    { link: '', modified: today, freq: 'weekly', prio: '1.0' },
    { link: '', lang: 'en', modified: today, freq: 'weekly', prio: '1.0' },
    { link: '', lang: 'fr', modified: today, freq: 'weekly', prio: '1.0' },
    { link: '/blog', lang: 'en', modified: today, freq: 'weekly', prio: '0.8' },
    { link: '/blog', lang: 'fr', modified: today, freq: 'weekly', prio: '0.8' },
    { link: '/photos', lang: 'en', modified: today, freq: 'weekly', prio: '0.8' },
    { link: '/photos', lang: 'fr', modified: today, freq: 'weekly', prio: '0.8' },
    { link: '/search', lang: 'en', modified: today, freq: 'weekly', prio: '0.6' },
    { link: '/search', lang: 'fr', modified: today, freq: 'weekly', prio: '0.6' },
  ];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

      ${[...pages, ...articles]
        .map((item) => {
          return `
            <url>
              <loc>${baseUrl}${item.lang ? `/${item.lang}` : ''}${item.link}</loc>
              <lastmod>${item.modified || '2023-11-15'}</lastmod>
              <changefreq>${item.freq || 'monthly'}</changefreq>
              <priority>${item.prio || '0.6'}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  writeFileSync('public/sitemap.xml', formatted);

  // a data sitemap is needed to handle locale redirections (from /blog to /en/blog)
  const _sitemap = [...pages.filter((p) => p.lang !== 'fr'), ...articles].map((item) => {
    return {
      base: `${baseUrl}${item.link}`,
      loc: `${baseUrl}${item.lang ? `/${item.lang}` : ''}${item.link}`,
    };
  });

  const fileContent = `const sitemap = ${JSON.stringify(_sitemap)}; module.exports = sitemap;`;

  const _formatted = prettier.format(fileContent, {
    ...prettierConfig,
    parser: 'babel',
  });

  writeFileSync('data/sitemap.js', _formatted);
}

generate();
