// import express from "express";
// import {
//   markCheckIn,
//   markCheckOut,
//   getTodayAttendance,
//   getMonthlyAttendance,
//   getAllAttendance,
//   getCustomAttendance,
//   manualAttendanceEntry,
// } from "../controllers/attendance.controller.js";


// const router = express.Router();

// router.post("/mark-check-in", markCheckIn);
// router.patch("/mark-check-out", markCheckOut);
// router.get("/get-today-attendance", getTodayAttendance);
// router.get("/get-monthly-attendance", getMonthlyAttendance);
// router.get("/get-all-attendance", getAllAttendance);
// router.get("/get-custom-attendance", getCustomAttendance);
// // router.get("/get-manual-attendance",manualAttendanceEntry)
// router.post("/manual-entry", manualAttendanceEntry);

// export default router;



import express from "express";
import {
  markCheckIn,
  markCheckOut,
  getTodayAttendance,
  getMonthlyAttendance,
  getAllAttendance,
  getCustomAttendance,
  manualAttendanceEntry,
  getWeeklyAttendance, // 🆕 import
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.post("/mark-check-in", markCheckIn);
router.patch("/mark-check-out", markCheckOut);
router.get("/get-today-attendance", getTodayAttendance);
router.get("/get-monthly-attendance", getMonthlyAttendance);
router.get("/get-weekly-attendance", getWeeklyAttendance); // 🆕 route
router.get("/get-all-attendance", getAllAttendance);
router.get("/get-custom-attendance", getCustomAttendance);
router.post("/manual-entry", manualAttendanceEntry);

export default router;
