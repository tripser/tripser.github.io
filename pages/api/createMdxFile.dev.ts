import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { slug, content } = req.body;

    const iLayout = "import { BlogLayout } from '@components/blogLayout';";
    const iFigures = "import { Figures } from '@components/figures';";

    // add blogLayout
    const splits = content.split('---\n');
    splits[2] =
      `\n${iLayout}\n` + splits[2] + `\n\nexport default ({ children }) => <BlogLayout>{children}</BlogLayout>;`;
    const withLayout = splits.join('---\n');

    // replace ![]() with <Figures data={[{src: "", caption: ""}]} />
    let withFigures = withLayout.replace(/!\[(.*?)\]\((.*?)(?: "(.*?)")?\)/g, (_, alt, src) => {
      src = src.replace(/\\/g, '/');
      return `<Figures data={[{ src: "${src}", caption: "${alt}"}]} />\n\n`;
    });

    if (withFigures.includes('<Figures')) {
      withFigures = withFigures.replace(iLayout, `${iLayout}\n\n${iFigures}`);
    }

    const finalContent = withFigures;

    fs.writeFile(path.join(process.cwd(), 'pages/blog', `${slug}.mdx`), finalContent, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while creating the file.' });
      } else {
        exec('node generate-blog-list.mjs', (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
        });
        res.status(200).json({ message: 'File created successfully.', filePath: `/blog/${slug}` });
      }
    });

    // add prettier?
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
