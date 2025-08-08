import User from "../models/User.js";
import EmployeeDetails from "../models/EmployeeDetails.js";
import Payroll from "../models/Payroll.js";
import Attendance from "../models/Attendance.js";
import Counter from "../models/Counter.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import multer from "multer";

// -------------------------------
// Create New Employee
// -------------------------------
export async function createEmployee(req, res) {
  const {
    name,
    department,
    salary,
    email,
    password,
    designation,
    employeeType = "regular",
    employee_id, // Accept employee_id from request body
  } = req.body;

  // Add this validation
  if (!employee_id) {
    return res.status(400).json({ error: "employee_id is required in request body" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newEmployee = new User({
      name,
      department,
      salary,
      email,
      password: hashPassword,
      employee_id, // Use the provided employee_id
      designation,
      employeeType,
    });

    await newEmployee.save();

    const activationRoute = `${process.env.BASE_URL}/auth/login`;

    const transporter = nodemailer  .createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Employee Email Validation from Gessdemn",
      html: `
        <p>Dear ${name},</p>
        <p>We are excited to have you join <strong>Gessdemn</strong>! To get started, please activate your employee account.</p>
        <p>Login with your email and password: ${password}.</p>
        <p><a href="${activationRoute}" style="color: #007bff; text-decoration: none;">Activate My Account</a></p>
        <p>If you have any issues, contact <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>.</p>
        <br />
        <p>Best regards,</p>
        <p><strong>fly HR Team</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "Employee created! Please check your email to validate." });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(400).json({ error: "Failed to add employee" });
  }
}

// -------------------------------
// Email Activation
// -------------------------------
export async function activateEmail(req, res) {
  const { token } = req.params;
  if (!token) return res.status(400).send("Invalid activation link");

  try {
    const employee = await User.findOne({ validationToken: token });
    if (!employee)
      return res.status(400).json({ message: "Invalid or expired token" });

    employee.isValidated = true;
    employee.validationToken = null;
    await employee.save();

    res.status(200).json({ message: "Email validated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

// -------------------------------
// Get All Active Employees
// -------------------------------
export async function getEmployees(req, res) {
  try {
    const employees = await User.find({ archived: false });
    if (employees.length === 0)
      return res.status(200).json({ message: "No active employees" });
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// -------------------------------
// Employee: Get Own Profile
// -------------------------------
export async function getEmployeeProfile(req, res) {
  const { employee_id } = req.query;

  if (!employee_id) {
    return res.status(400).json({ message: "Employee ID is required" });
  }

  try {
    const employee = await EmployeeDetails.findOne({ employee_id });
    return res.status(200).json(employee);
  } catch (err) {
    console.error("Error fetching profile:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

// -------------------------------
// Admin: View Employee Profile by ID
// -------------------------------
export async function getEmployeeProfileByIdForAdmin(req, res) {
  const { id: employee_id } = req.params;

  if (!employee_id) {
    return res.status(400).json({ message: "Employee ID is required" });
  }

  try {
    const employee = await EmployeeDetails.findOne({ employee_id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json({ data: employee });
  } catch (err) {
    console.error("Error fetching profile for admin:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

// -------------------------------
// Update Employee Profile
// -------------------------------
export async function updateEmployeeProfileDetails(req, res) {
  try {
    const { employee_id, updateData } = req.body;

    const updatedEmployee = await EmployeeDetails.findOneAndUpdate(
      { employee_id },
      updateData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedEmployee });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// -------------------------------
// File Uploads
// -------------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = req.file.location; // S3 URL expected
    res.status(200).json({ message: "File uploaded successfully", fileUrl });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
};

export const uploadMultipleFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedFiles = req.files.map((file) => ({
      fileName: file.originalname,
      fileUrl: file.location,
    }));

    res
      .status(200)
      .json({ message: "Files uploaded successfully", files: uploadedFiles });
  } catch (error) {
    res.status(500).json({ error: "File upload failed" });
  }
};

// -------------------------------
// Delete Employee (Soft Delete)
// -------------------------------
export async function deleteEmployee(req, res) {
  try {
    const { employee_id } = req.query;
    if (!employee_id) {
      return res
        .status(400)
        .json({ message: "Employee ID is required" });
    }

    const deletedEmployee = await User.findOneAndUpdate(
      { employee_id },
      { archived: true },
      { new: true }
    );
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Server error" });
  }
}