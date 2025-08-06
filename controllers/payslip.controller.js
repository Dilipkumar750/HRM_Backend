import nodemailer from "nodemailer";
import User from "../models/User.js";
import Payroll from "../models/Payroll.js";

export async function sendPayslip(req, res) {
  const { employee_id, month, year } = req.body;

  if (!employee_id || !month || !year) {
    return res
      .status(400)
      .json({ message: "employee_id, month, and year are required" });
  }

  try {
    const employee = await User.findOne({ employee_id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    console.log("Searching payroll for:", { employee_id, month, year });
    const payroll = await Payroll.findOne({ employee_id, month, year });
    if (!payroll) {
      return res.status(404).json({ message: "Payslip not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: employee.email,
      subject: `Payslip for ${month}/${year}`,
      html: `
        <p>Dear ${employee.name},</p>
        <p>Your payslip for ${month}/${year}:</p>
        <ul>
          <li>Salary: ${payroll.salary}</li>
          <li>Department: ${employee.department}</li>
          <li>Designation: ${employee.designation}</li>
        </ul>
        <br />
        <p>Best regards,<br />HR Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Payslip sent successfully!" });
  } catch (error) {
    console.error("Error sending payslip:", error);
    res.status(500).json({ error: "Failed to send payslip" });
  }
}

/* Test Data
{
  "employee_id": "GGSCB2501",
  "month": "August",
  "year": "2025"
}
*/