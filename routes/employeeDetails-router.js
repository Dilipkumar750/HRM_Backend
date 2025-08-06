// import express from "express";
// import {
//     createEmployee,
//     getAllEmployees,
//     getEmployeeById,
//     updateEmployee,
//     deleteEmployee
// } from "../controllers/emplyeeDetails.js";

// const router = express.Router();

// // Define routes
// router.post("/create", createEmployee); // Create an employee
// router.get("/get", getAllEmployees); // Get all employees
// router.get("/get:id", getEmployeeById); // Get a single employee by ID
// router.put("/put:id", updateEmployee); // Update an employee
// router.delete("/delete:id", deleteEmployee); // Delete an employee

// export default router;




// import express from "express";
// import upload from "../middlewares/multer.js";
// import { saveEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from "../controllers/emplyeeDetails.js";

// const router = express.Router();

// router.post("/save", upload.array("documents", 5), saveEmployee)
// router.get("/all", getAllEmployees);
// router.get("/:id", getEmployeeById);
// router.put("/:id", updateEmployee);
// router.delete("/:id", deleteEmployee);

// export default router;


import express from "express";
import path from "path";
import fs from "fs";
import upload from "../middlewares/multer.js"; // ✅ Correct import
import {
  saveEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/emplyeeDetails.js";

const router = express.Router();

// ✅ File upload
router.post("/save", upload, saveEmployee);

// ✅ CRUD
router.get("/all", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

// ✅ NEW: Download route for documents
router.get("/download/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(process.cwd(), "uploads", fileName);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).send("File not found");

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("Error in download:", err);
        res.status(500).send("Error downloading file");
      }
    });
  });
});

export default router;
