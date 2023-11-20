import{ PutObjectCommand, DeleteObjectCommand, S3Client, ListObjectsCommand} from "@aws-sdk/client-s3";
import fs from "fs"

const credentials ={
  accessKeyId:"Y0DYAUAO53TE8KL29254",
  secretAccessKey:"3HBwAarUBaUOl8bWpNSYBXEvbBAXAzd4FzCktPoP"
}

const s3Client = new S3Client({
  endpoint:"https://fr-par-1.linodeobjects.com",
  region:"fr-par-1",
  credentials:credentials
})
const params ={
  Bucket: "jamal",
  Key: "fileThis.txt",
  Body: fs.createReadStream("fileThis.txt"),
  ACL: 'public-read'
};

const uploadObject = async(params)=>{

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

const ListObject = async(params)=>{
  const results = await s3Client.send(new ListObjectsCommand(params));
  console.log(results)
  for(let item of results.Contents){
    console.log("https://jamal.fr-par-1.linodeobjects.com/" + item.Key)
  }
}

const deleteObject = async(params)=>{
  const results = await s3Client.send(new DeleteObjectCommand(params));
  console.log(
    "Successfully deleted" +
    params.Key +
    " and uploaded it to" +
    params.Bucket +
    "/" +
    params.Key
  );
}

uploadObject(params)
ListObject(params)
/*const run = async() =>{
  try{
    //const results = await s3Client.send(new PutObjectCommand(params));
    //const results = await s3Client.send(new DeleteObjectCommand(params));
    const results = await s3Client.send(new ListObjectsCommand(params));
    console.log(results)
    console.log(
      "Successfully created" +
      params.Key +
      " and uploaded it to" +
      params.Bucket +
      "/" +
      params.Key
    );
    return results;
  }catch (err){
    console.log("Error",err);
  }
};
run();*/