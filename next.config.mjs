import remarkFrontmatter from 'remark-frontmatter';
import sitemap from './data/sitemap.js';

// Notice that we use the ES2015 import and export statement because we can only import remark-frontmatter, instead of using the require statement. So with that, you can rename next.config.js to next.config.mjs.

async function generateRedirects() {
  // Generate redirects for the blog (e.g., /blog -> /en/blog)
  const redirects = sitemap
    .map((entry) => {
      const source = entry.base.replace('https://tripser.blog', '');
      const destination = entry.loc.replace('https://tripser.blog', '');

      // Exclude invalid redirects
      if (!source || !destination || source === destination) {
        return null;
      }

      return {
        source,
        destination,
        permanent: true,
      };
    })
    .filter(Boolean);

  return redirects;
}

const conf = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: {
            providerImportSource: '@mdx-js/react',
            remarkPlugins: [remarkFrontmatter],
            rehypePlugins: [],
          },
        },
      ],
    });

    return config;
  },
  reactStrictMode: true,
  transpilePackages: process.env.NODE_ENV !== 'development' ? [] : ['@mdxeditor/editor'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions:
    process.env.NODE_ENV !== 'development' ? ['prod.ts', 'prod.tsx'] : ['prod.ts', 'prod.tsx', 'dev.ts', 'dev.tsx'],
  // had to change how mdx work because it didn't work with the [locale] folder on first load
  // temporary solution in blog/[slug].prod.tsx
  // TODO: find a better solution
  // process.env.NODE_ENV !== 'development'
  //   ? ['prod.ts', 'prod.tsx', 'md', 'mdx']
  //   : ['prod.ts', 'prod.tsx', 'dev.ts', 'dev.tsx', 'md', 'mdx'],
  async redirects() {
    return await generateRedirects();
  },
};

export default conf;
