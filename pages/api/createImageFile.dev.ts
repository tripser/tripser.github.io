import fs from 'fs';
import path from 'path';
import multer, { Multer } from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';

async function createOptimizedVersions(imagePath, sizes = [400]) {
  const directory = path.dirname(imagePath);
  const extension = path.extname(imagePath);
  const filename = path.basename(imagePath, extension);

  // optimize original image
  const outputPathTemp = path.join(directory, `${filename}-temp${extension}`);
  await sharp(imagePath).jpeg({ quality: 70 }).toFile(outputPathTemp);
  fs.rename(outputPathTemp, imagePath, async (err) => {
    if (err) {
      console.error(err);
    } else {
      // resize and save to 800 and 400
      if (sizes.includes(800)) {
        const outputPath800 = path.join(directory, `${filename}-800${extension}`);
        await sharp(imagePath).resize(800, 450).toFile(outputPath800);
      }
      if (sizes.includes(400)) {
        const outputPath400 = path.join(directory, `${filename}-400${extension}`);
        await sharp(imagePath).resize(400, 225).toFile(outputPath400);
      }
    }
  });
}

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

      console.log('File created successfully.');

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
        console.log('File moved successfully.');
        createOptimizedVersions(targetPath, req.body.sizes ? req.body.sizes.split(',').map((s) => parseInt(s)) : [400])
          .then(() => {
            console.log('File optimized successfully.');
            res.status(200).json({ message: 'File uploaded, moved and optimized successfully.', filePath: filePath });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ message: 'Error optimizing file.' });
          });
      });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
