import remarkFrontmatter from 'remark-frontmatter';

// Notice that we use the ES2015 import and export statement because we can only import remark-frontmatter, instead of using the require statement. So with that, you can rename next.config.js to next.config.mjs.
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
};

export default conf;
