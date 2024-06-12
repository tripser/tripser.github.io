import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { slug, content } = req.body;

    const iLayout = "import { BlogLayout } from '@components/blogLayout';";
    const iFigures = "import { Figures } from '@components/figures';";

    // add blogLayout
    const splits = content.split('---\n');
    splits[2] =
      `\n${iLayout}\n` + splits[2] + `\n\nexport default ({ children }) => <BlogLayout>{children}</BlogLayout>;\n`;
    const withLayout = splits.join('---\n');

    // rename and move temp images to content
    let withImagesMoved = withLayout;
    const images = withLayout.match(/!\[(.*?)\]\((.*?)(?: "(.*?)")?\)/g).filter((img) => img.includes('\\temp\\'));
    for (const image of images) {
      const match = image.match(/!\[(.*?)\]\((.*?)(?: "(.*?)")?\)/);
      if (match) {
        const alt = match[1];
        const srcPath = match[2];
        const title = match[3];
        const destPath = srcPath
          .replace('temp', 'content')
          .replace(srcPath.split('\\')[4], (title || alt).replaceAll(' ', '-').toLowerCase() + '.jpg');

        const srcFullPath = path.join(process.cwd(), 'public', srcPath);
        const destFullPath = path.join(process.cwd(), 'public', destPath);

        try {
          await fs.promises.rename(srcFullPath, destFullPath);
          console.log(`Moved file from ${srcFullPath} to ${destPath}`);
          withImagesMoved = withImagesMoved.replace(srcPath, destPath);

          await fs.promises.rename(srcFullPath.replace('.jpg', '-400.jpg'), destFullPath.replace('.jpg', '-400.jpg'));
          console.log(`Moved file-400 from ${srcFullPath} to ${destPath}`);
        } catch (err) {
          console.error(`Failed to move file.s: ${err}`);
        }
      }
    }

    // replace ![]() with <Figures data={[{src: "", caption: ""}]} />
    let withFigures = withImagesMoved.replace(/!\[(.*?)\]\((.*?)(?: "(.*?)")?\)/g, (_, alt, src) => {
      src = src.replace(/\\/g, '/');
      return `<Figures data={[{ src: "${src}", caption: "${alt}"}]} />`;
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
