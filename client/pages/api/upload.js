import { Web3Storage, getFilesFromPath } from 'web3.storage';
import { IncomingForm } from 'formidable';
const client = new Web3Storage({ token: process.env.WEB3_STORAGE_API_TOKEN });

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  // parse form with a Promise wrapper
  try {
    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const path = data.files.selectedFile.filepath;
    const name = path.slice(5);
    console.log(path, name);
    const files = await getFilesFromPath(data.files.selectedFile.filepath);
    // read file from the temporary path
    const cid = await client.put(files, {
      name: name,
      maxRetries: 3,
    });
    console.log(cid);
    res.status(200).json({ url: `https://${cid}.ipfs.dweb.link/${name}` });
  } catch (err) {
    res.status(500).json(err);
  }
};
