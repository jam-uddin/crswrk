import express from 'express';
import path from 'path';
import fileUpload from 'express-fileupload';
import { PutObjectCommand, DeleteObjectCommand, S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";
import fs from "fs"
import { fileURLToPath } from 'url';
import { OAuth2Client } from 'google-auth-library';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

const credentials = {
  accessKeyId: "Y0DYAUAO53TE8KL29254",
  secretAccessKey: "3HBwAarUBaUOl8bWpNSYBXEvbBAXAzd4FzCktPoP"
};

const s3Client = new S3Client({
  endpoint: "https://fr-par-1.linodeobjects.com",
  region: "fr-par-1",
  credentials: credentials
});
const CLIENT_ID = '619144172013-84eqpr97bl51t26bt4v442pho3fvnn2e.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

export const uploadObject = async (name, data) => {
  const params = {
    Bucket: "jamal",
    Key: name,
    Body: data,
    ACL: 'public-read'
  };

  const results = await s3Client.send(new PutObjectCommand(params));
  console.log(
    "Successfully created" +
    params.Key +
    " and uploaded it to" +
    params.Bucket +
    "/" +
    params.Key
  );
};

const ListObjects = async () => {
  const results = await s3Client.send(new ListObjectsCommand({
    Bucket: "jamal",
    ACL: 'public-read'
  }));
  console.log(results)
  let links = []
  for (let item of results.Contents) {
    links.push("https://cloud.linode.com/object-storage/buckets/fr-par-1/jamal" + item.Key)
  }
  return links
};



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/files', async (req, res) => {
  let links = await ListObjects()
  console.log(links)
  res.json({ "file": links })
});

app.post('/upload', fileUpload(), (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('No file was uploaded.');
  }
  uploadObject(req.files.file.name, req.files.file.data)
  res.send("Your file has been successfully uploaded ")
});

async function verifyToken(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    return payload; // Contains user information and token details
  }

  app.post('/verifyGoogleToken', async (req, res) => {
    try {
      const { token } = req.body;
      const googleUser = await verifyToken(token);
      console.log("User Verified: ", googleUser);
      // Proceed with user information if needed, e.g., creating session
      res.json({ success: true, message: 'User verified', user: googleUser });
    } catch (error) {
      res.status(401).json({ success: false, message: 'Token verification failed', error: error.toString() });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});
