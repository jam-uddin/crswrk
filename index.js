import express from 'express';
import path from 'path';
import fileUpload from 'express-fileupload';
import{ PutObjectCommand, DeleteObjectCommand, S3Client, ListObjectsCommand} from "@aws-sdk/client-s3";
import fs from "fs"

const app = express()
app.use(fileUpload());
const port = 3000

const credentials ={
  accessKeyId:"Y0DYAUAO53TE8KL29254",
  secretAccessKey:"3HBwAarUBaUOl8bWpNSYBXEvbBAXAzd4FzCktPoP"
}

const s3Client = new S3Client({
  endpoint:"https://fr-par-1.linodeobjects.com",
  region:"fr-par-1",
  credentials:credentials
})

export const uploadObject = async(name, data)=>{
  const params ={
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

app.get('/', (req, res) => {
  res.sendFile("index.html", { root: path.join("./") });
});

app.post('/upload', (req, res) => {
  uploadObject(req.files.file.name, req.files.file.data)
  res.send("Your file has been successfully uploaded ")
})

app.listen(port, () => {
  console.log(`Example app listening on port http//localhost:${port}`)
})

