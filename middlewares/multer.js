// import multer from "multer";
// import path from "path";

// // Set up storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Ensure "uploads/" directory exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // File filter to allow images, PDFs, and Word documents
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/png",
//     "application/pdf",
//     "application/msword", // .doc
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Allowed: Images, PDFs, Word documents"), false);
//   }
// };

// // Multer upload middleware (supports multiple files)
// const upload = multer({ storage, fileFilter });

// export default upload;


import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure "uploads" directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow images, PDFs, and Word documents
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Allowed: Images, PDFs, Word documents"), false);
  }
};

// Multer upload middleware (handle multiple named files)
const upload = multer({
  storage,
  fileFilter,
}).fields([
  { name: "panCard", maxCount: 1 },
  { name: "ugDegreeOrMarksheet", maxCount: 1 },
  { name: "aadharCard", maxCount: 1 },
]);

export default upload;
