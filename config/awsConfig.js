// // import AWS from "aws-sdk";
// // const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
// import {S3Client} from "@aws-sdk/client-s3"
// import dotenv from "dotenv";

// dotenv.config();

// // AWS.config.update({
// //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// //     region: process.env.AWS_REGION
// // })

// const s3 = new S3Client({
//     region: process.env.AWS_REGION, // e.g., "us-east-1"
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     },
//   });
// // const s3 = new AWS.S3();

// export default s3;

import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default s3;
