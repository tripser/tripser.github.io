import type { NextApiRequest, NextApiResponse } from 'next';
import multer, { Multer } from 'multer';
import fs from 'fs';
import path from 'path';

interface MulterRequest extends NextApiRequest {
  file: Multer.File;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/images/`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default async function handler(req: MulterRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    upload.single('image')(req, res, function (err) {
      if (err) {
        res.status(500).json({ message: 'Error uploading file.' });
        return;
      }

      if (!req.file) {
        res.status(400).json({ message: 'No file uploaded.' });
        return;
      }

      const fileName = req.body.name || req.file.originalname;
      const tempPath = req.file.path;
      const targetDir = path.join('public/images/', req.body.path || '');
      const targetPath = path.join(targetDir, fileName);
      const filePath = path.join('/images/', req.body.path || '', fileName);

      // TODO: compress image and resize and save to 800 and 400

      fs.mkdirSync(targetDir, { recursive: true });

      fs.rename(tempPath, targetPath, function (err) {
        if (err) {
          res.status(500).json({ message: 'Error moving file.' });
          return;
        }
        res.status(200).json({ message: 'File uploaded and moved successfully.', filePath: filePath });
      });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
