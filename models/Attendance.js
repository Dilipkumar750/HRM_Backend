import mongoose from "mongoose";

// const attendanceSchema = new mongoose.Schema({
//   employee_id: { type: String, required: true, ref: "User" }, 
//   date: { type: Date, required: true }, 
//   checkIn: { type: Date, required: true },
//   checkOut: { type: Date }, 
//   totalHours: { type: Number, default: 0 },
//   isPresent: { type: Boolean, default: true },
//   archived:{type: Boolean, default:false}
// });

const attendanceSchema = new mongoose.Schema(
  {
    employee_id: { type: String, required: true, ref: "User" },
    date: { type: Date, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date },
    totalHours: { type: Number, default: 0 },
    isPresent: { type: Boolean, default: true },
    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);
// Middleware to calculate total working hours before saving
attendanceSchema.pre("save", function (next) {
  if (this.checkIn && this.checkOut) {
    this.totalHours = (this.checkOut - this.checkIn) / (1000 * 60 * 60); // Convert ms to hours
  }
  next();
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;