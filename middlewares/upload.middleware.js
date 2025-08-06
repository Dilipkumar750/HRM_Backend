import multer from "multer";
import multerS3 from 'multer-s3';
import s3 from "../config/awsConfig.js";


// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: process.env.AWS_S3_BUCKET_NAME,
//         metadata: (req, file, cb) => {
//             cb(null, { fieldName: file.fieldName });
//         },
//         key: (req, file, cb) => {
//             cb(null, `uploads/${Date.now()}_${file.originalName}`)
//         }
//     })
// });

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, `uploads/${Date.now()}-${file.originalname}`);
      },
    }),
  });

export default upload;