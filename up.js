import{ PutObjectCommand, DeleteObjectCommand, S3Client} from "@aws-sdk/client-s3";


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
  Key: "file.txt",
  Body: "I am file.txt",
  ACL: 'public-read'
};

const run = async() =>{
  try{
    //const results = await s3Client.send(new PutObjectCommand(params));
    const results = await s3Client.send(new DeleteObjectCommand(params));
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
run();