import { Router } from 'express';
import Payroll from '../models/Payroll.js';
import { calculatePayroll } from '../controllers/payroll.controller.js';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const router = Router();

router.post('/generate', async (req, res) => {
  const { employee_id, month, allowances = 0, deductions = 0 } = req.body;

  try {
    const result = await calculatePayroll({ employee_id, month });
    const totalPay = result.totalSalary + allowances - deductions;

    const payroll = new Payroll({
      employee_id,
      month,
      basicSalary: result.basicSalary,
      allowances,
      deductions,
      totalPay,
    });

    await payroll.save();

    // ✅ Generate PDF
    const pdfPath = path.join('temp', `${employee_id}-${month}.pdf`);
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    doc.fontSize(20).text('Payslip', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Employee ID: ${employee_id}`);
    doc.text(`Name: ${result.empName}`);
    doc.text(`Month: ${month}`);
    doc.text(`Basic Salary: ₹${result.basicSalary}`);
    doc.text(`Total Hours: ${result.totalHoursWorked}`);
    doc.text(`Allowances: ₹${allowances}`);
    doc.text(`Deductions: ₹${deductions}`);
    doc.text(`Net Pay: ₹${totalPay.toFixed(2)}`);
    doc.end();

    writeStream.on('finish', () => {
      res.download(pdfPath, `payslip-${employee_id}-${month}.pdf`, (err) => {
        if (err) console.error(err);
        fs.unlinkSync(pdfPath);
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Payroll generation failed', error });
  }
});

export default router;
