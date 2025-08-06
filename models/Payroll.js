import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  employee_id: { type: String, ref: 'User', required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  totalPay: { type: Number, required: true },
  generatedAt: { type: Date, default: Date.now },
  archived: { type: Boolean, default: false }
});

const Payroll = mongoose.model("Payroll", payrollSchema);
export default Payroll;
