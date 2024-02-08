import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { slug, content } = req.body;

    // add blogLayout
    const splits = content.split('---\n');
    splits[2] =
      `\nimport { BlogLayout } from '@components/blogLayout';\n` +
      splits[2] +
      `\n\nexport default ({ children }) => <BlogLayout>{children}</BlogLayout>;`;
    const newContent = splits.join('---\n');

    fs.writeFile(path.join(process.cwd(), 'pages/blog', `${slug}.mdx`), newContent, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while creating the file.' });
      } else {
        res.status(200).json({ message: 'File created successfully.' });
        return `/blog/${slug}.mdx`;
      }
    });

    // add prettier?
    // TODO: run generate-blog-list
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
