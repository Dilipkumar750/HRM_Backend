// import EmployeeDetails from "../models/EmployeeDetails.js";

// ✅ Save Employee
// export const saveEmployee = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);
//     const { employee_id, personalInfo, education, experiences, documents, address, bank } = req.body;

//     if (!employee_id || !personalInfo) {
//       return res.status(400).json({ success: false, message: "Employee ID and Personal info are required" });
//     }

//     // Check if employee already exists
//     const existingEmployee = await Employee.findOne({ employee_id });
//     if (existingEmployee) {
//       return res.status(400).json({ success: false, message: "Employee ID already exists" });
//     }

//     const employee = new Employee({ employee_id, personalInfo, education, experiences, documents, address, bank });
//     await employee.save();

//     res.status(201).json({ success: true, message: "Employee saved successfully", data: employee });
//   } catch (error) {
//     console.error("Error saving employee:", error);
//     res.status(500).json({ success: false, message: "Failed to save employee", error: error.message });
// //   }
// // };
// export const saveEmployee = async (req, res) => {
//   try {
//     console.log("Received Data:", req.body);

//     // const { employee_id, personalDetails, educationalDetails, experienceDetails, documentDetails, addressDetails, bankDetails } = req.body;
//     const { personalDetails, educationalDetails, experienceDetails, documentDetails, addressDetails, bankDetails } = req.body;
//     const employeeId = personalDetails.employee_id;
//     if (!employeeId || !personalDetails) {
//       return res.status(400).json({ success: false, message: "Employee ID and Personal info are required" });
//     }

//     const existingEmployee = await EmployeeDetails.findOne({ employeeId });
//     if (existingEmployee) {
//       return res.status(400).json({ success: false, message: "Employee ID already exists" });
//     }

//     const employee = new EmployeeDetails({
//       employeeId,
//       personalInfo: personalDetails,
//       education: educationalDetails,
//       experiences: experienceDetails,
//       documents: documentDetails,
//       address: addressDetails,
//       bank: bankDetails,
//     });

//     await employee.save();

//     res.status(201).json({ success: true, message: "Employee saved successfully", data: employee });
//   } catch (error) {
//     console.error("Error saving employee:", error);
//     res.status(500).json({ success: false, message: "Failed to save employee", error: error.message });
//   }
// };


// // ✅ Get All Employees with Pagination
// export const getAllEmployees = async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query; // Default values
//     const employees = await Employee.find()
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .exec();

//     const count = await EmployeeDetails.countDocuments();

//     res.status(200).json({
//       success: true,
//       total: count,
//       pages: Math.ceil(count / limit),
//       currentPage: page,
//       data: employees
//     });
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch employees", error: error.message });
//   }
// };

// // ✅ Get Employee by ID
// export const getEmployeeById = async (req, res) => {
//   try {
//     const employee = await EmployeeDetails.findOne({ employee_id: req.params.id });
//     if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

//     res.status(200).json({ success: true, data: employee });
//   } catch (error) {
//     console.error("Error fetching employee by ID:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch employee", error: error.message });
//   }
// };

// // ✅ Update Employee (Partial Update)
// export const updateEmployee = async (req, res) => {
//   try {
//     const { employee_id, ...updateFields } = req.body;

//     const updatedEmployee = await EmployeeDetails.findOneAndUpdate(
//       { employee_id: req.params.id },
//       { $set: updateFields },
//       { new: true, runValidators: true }
//     );

//     if (!updatedEmployee) return res.status(404).json({ success: false, message: "Employee not found" });

//     res.status(200).json({ success: true, message: "Employee updated successfully", data: updatedEmployee });
//   } catch (error) {
//     console.error("Error updating employee:", error);
//     res.status(500).json({ success: false, message: "Failed to update employee", error: error.message });
//   }
// };

// // ✅ Delete Employee
// export const deleteEmployee = async (req, res) => {
//   try {
//     const deletedEmployee = await EmployeeDetails.findOneAndDelete({ employee_id: req.params.id });
//     if (!deletedEmployee) return res.status(404).json({ success: false, message: "Employee not found" });

//     res.status(200).json({ success: true, message: "Employee deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting employee:", error);
//     res.status(500).json({ success: false, message: "Failed to delete employee", error: error.message });
//   }
// };
// import EmployeeDetails from "../models/EmployeeDetails.js"; // Ensure correct model import

// // ✅ Save Employeeexport
// export const saveEmployee = async (req, res) => {
//   try {
//     console.log("Received Data:", JSON.stringify(req.body, null, 2));

//     const { personalDetails, educationalDetails, experienceDetails, documents, addressDetails, bankDetails } = req.body;
//     const employeeId = personalDetails?.employee_id;

//     if (!employeeId || !personalDetails) {
//       return res.status(400).json({ success: false, message: "Employee ID and Personal info are required" });
//     }

//     if (!addressDetails) {
//       return res.status(400).json({ success: false, message: "Address details are required" });
     
//     }


//     if (!addressDetails.zipCode) {
//       return res.status(400).json({ success: false, message: "Zip code is required" });
//     }
//     console.log("Received Address Details:", addressDetails);
// console.log("Zip Code:", addressDetails?.zipCode);

//     // if (!documents?.fileUrl || !documents?.fileName) {
//     //   return res.status(400).json({ success: false, message: "Document details are required" });
//     // }
//     if (!documents || Object.keys(documents).length === 0) {
//       return res.status(400).json({ success: false, message: "Document details are required" });
//     }
    
    

//     if (!bankDetails?.accountNumber || !  bankDetails?.ifscCode || !bankDetails?.bankName) {
//       return res.status(400).json({ success: false, message: "Bank details are required" });
//     }


//     // ✅ Check if employee already exists
//     const existingEmployee = await EmployeeDetails.findOne({ employeeId });
//     if (existingEmployee) {
//       return res.status(400).json({ success: false, message: "Employee ID already exists" });
//     }

//     // ✅ Validate & Fix Image Field
//     let imageArray = [];

//     if (Array.isArray(personalDetails.image)) {
//       imageArray = personalDetails.image.map(img => {
//         if (typeof img === "string") {
//           return img; // ✅ If it's already a string URL, keep it
//         } else if (typeof img === "object" && img.url) {
//           return img.url; // ✅ Extract the URL if it's inside an object
//         } else {
//           console.warn("Invalid image format:", img);
//           return null; // ❌ Ignore invalid values
//         }
//       }).filter(img => img !== null); // ✅ Remove null values
//     } else {
//       console.warn("Image data is not an array:", personalDetails.image);
//     }

//     // ✅ Optional: Log imageArray to debug
//     console.log("Processed Image Array:", imageArray);

//     if (imageArray.length === 0) {
//       return res.status(400).json({ success: false, message: "At least one valid image URL is required" });
//     }

//     const employee = new EmployeeDetails({
//       employeeId,
//       personalInfo: { ...personalDetails, image: imageArray }, // ✅ Fixed image field
//       education: educationalDetails,
//       experiences: experienceDetails,
//       documents: documents,
//       address: addressDetails,
//       bank: bankDetails,
//     });

//     await employee.save();
//     res.status(201).json({ success: true, message: "Employee saved successfully", data: employee });

//   } catch (error) {
//     console.error("Error saving employee:", error);
//     res.status(500).json({ success: false, message: "Failed to save employee", error: error.message });
//   }
// };

// import EmployeeDetails from "../models/EmployeeDetails.js"; // Ensure correct model import

// export const saveEmployee = async (req, res) => {
//   try {
//     const {jsonData} = req.body;
//     const parsedData = JSON.parse(jsonData);
//     const {files} = req.files;
//     console.log("Parsed Data:", req);
//     res.status(200).json({ success: true, message: "Data received successfully", data: parsedData });
//     // Extract data from request
//     const { personalDetails, educationalDetails, experienceDetails, addressDetails, bankDetails } =parsedData;
//     const employeeId = personalDetails?.employee_id;

//     // Validate required fields
//     if (!employeeId || !personalDetails) {
//       return res.status(400).json({ success: false, message: "Employee ID and personal info are required" });
//     }
//     if (!addressDetails || !addressDetails.zipCode) {
//       return res.status(400).json({ success: false, message: "Address details and Zip code are required" });
//     }
//     if (!bankDetails?.accountNumber || !bankDetails?.IFScode || !bankDetails?.bankBranch) {
//       return res.status(400).json({ success: false, message: "Bank details are required" });
//     }

//     // ✅ Handle File Uploads (Documents) if using Multer
//     // let documents = [];
//     // if (req.files && req.files.length > 0) {
//     //   documents = req.files.map(file => ({
//     //     fileName: file.originalname,
//     //     fileUrl: file.path, // Store local path or cloud URL
//     //     fileType: file.mimetype,
//     //     fileSize: `${(file.size / 1024).toFixed(2)} KB`, // Convert bytes to KB
//     //     uploadedAt: new Date(),
//     //   }));
//     // }

//     let documents = [];
//     let reqDocs=req.body.documentDetails;
//     console.log("Documents:", reqDocs);
//     if (reqDocs) {
//       Object.keys(reqDocs).forEach((key) => {
//         let files = Array.isArray(reqDocs[key]) ? reqDocs[key] : [reqDocs[key]];
//         files.forEach((file) => {
//           documents.push({
//             fileName: file.originalname,
//             // fileUrl: file.path,
//             fileUrl: `/uploads/${file.filename}`,
//             fileType: file.mimetype,
//             fileSize: `${(file.size / 1024).toFixed(2)} KB`,
//             uploadedAt: new Date(),
//           });
//         });
//       });
//     }
    

//     // if (documents.length === 0) {
//     //   return res.status(400).json({ success: false, message: "At least one document is required" });
//     // }

//     // ✅ Check if employee already exists
//     const existingEmployee = await EmployeeDetails.findOne({ employeeId });
//     if (existingEmployee) {
//       return res.status(400).json({ success: false, message: "Employee ID already exists" });
//     }

//     // ✅ Validate & Fix Image Field
//     let imageArray = [];
//     if (Array.isArray(personalDetails.image)) {
//       imageArray = personalDetails.image.map(img => {
//         if (typeof img === "string") return img;
//         if (typeof img === "object" && img.url) return img.url;
//         console.warn("Invalid image format:", img);
//         return null;
//       }).filter(img => img !== null);
//     }
    
//     // if (imageArray.length === 0) {
//     //   return res.status(400).json({ success: false, message: "At least one valid image URL is required" });
//     // }
//     if (documents.length === 0) {
//   return res.status(400).json({ success: false, message: "At least one document is required" });
// }


//     // ✅ Create Employee Object
//     const employee = new EmployeeDetails({
//       employeeId,
//       personalInfo: { ...personalDetails, image: imageArray },
//       education: educationalDetails,
//       experiences: experienceDetails,
//       documents: documents, // Updated document field
//       address: addressDetails,
//       bank: bankDetails,
//     });

//     // ✅ Save to Database
//     await employee.save();
//     res.status(201).json({ success: true, message: "Employee saved successfully", data: employee });

//   } catch (error) {
//     console.error("Error saving employee:", error);
//     res.status(500).json({ success: false, message: "Failed to save employee", error: error.message });
//   }
// };

import EmployeeDetails from "../models/EmployeeDetails.js";

// ✅ Save New Employee
export const saveEmployee = async (req, res) => {
  try {
    const { jsonData } = req.body;
    const parsedData = JSON.parse(jsonData);
    const files = req.files;

    const {
      personalDetails,
      educationalDetails,
      experienceDetails,
      addressDetails,
      bankDetails
    } = parsedData;

    const employee_id = personalDetails?.employee_id;

    // ✅ Validation
    // if (!employee_id || !personalDetails?.name) {
    //   return res.status(400).json({ success: false, message: "Employee ID and personal name are required" });
    // }
   if (
  !employee_id ||
  !personalDetails?.name ||
  !personalDetails?.email ||
  personalDetails.email === null ||
  personalDetails.email === ""
) {
  return res.status(400).json({
    success: false,
    message: "Employee ID, name, and email are required and email cannot be null or empty"
  });
}



    if (!addressDetails?.zipCode) {
      return res.status(400).json({ success: false, message: "Address details are required" });
    }

    if (
      !bankDetails?.accountName ||
      !bankDetails?.accountNumber ||
      !bankDetails?.bankBranch ||
      !bankDetails?.IFScode
    ) {
      return res.status(400).json({ success: false, message: "Incomplete bank details" });
    }

    // ✅ Check for duplicate
    const existing = await EmployeeDetails.findOne({ employee_id });
    if (existing) {
      return res.status(400).json({ success: false, message: "Employee already exists" });
    }

    // ✅ Process images
    const imageArray = Array.isArray(personalDetails.image)
      ? personalDetails.image.map(img =>
          typeof img === "string" ? img : img?.url || null
        ).filter(Boolean)
      : [];

    // ✅ Process documents
    const documents = [];
    for (let field in files) {
      files[field].forEach(file => {
        documents.push({
          fileName: file.originalname,
          fileUrl: `/uploads/${file.filename}`,
          fileType: file.mimetype,
          fileSize: `${(file.size / 1024).toFixed(2)} KB`,
          uploadedAt: new Date()
        });
      });
    }

    if (documents.length === 0) {
      return res.status(400).json({ success: false, message: "At least one document is required" });
    }

    // ✅ Save to DB
    const employee = new EmployeeDetails({
      employee_id,
      personalDetails: { ...personalDetails, image: imageArray },
      educationalDetails,
      experienceDetails,
      documents,
      addressDetails,
      bankDetails
    });

    await employee.save();

    res.status(201).json({ success: true, message: "Employee saved successfully", data: employee });

  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get All Employees
export const getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const employees = await EmployeeDetails.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await EmployeeDetails.countDocuments();

    res.status(200).json({
      success: true,
      total: count,
      pages: Math.ceil(count / limit),
      currentPage: page,
      data: employees
    });

  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch", error: error.message });
  }
};

// ✅ Get by ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await EmployeeDetails.findOne({ employee_id: req.params.id });
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error", error: error.message });
  }
};

// ✅ Update
export const updateEmployee = async (req, res) => {
  try {
    const { employee_id, ...rest } = req.body;
    const updated = await EmployeeDetails.findOneAndUpdate(
      { employee_id: req.params.id },
      { $set: rest },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update error", error: error.message });
  }
};

// ✅ Delete
export const deleteEmployee = async (req, res) => {
  try {
    const deleted = await EmployeeDetails.findOneAndDelete({ employee_id: req.params.id });
    if (!deleted) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete error", error: error.message });
  }
};
