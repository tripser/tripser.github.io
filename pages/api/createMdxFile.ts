import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { slug, content } = req.body;

    fs.writeFile(path.join(process.cwd(), 'pages/blog', `${slug}.mdx`), content, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while creating the file.' });
      } else {
        res.status(200).json({ message: 'File created successfully.' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
