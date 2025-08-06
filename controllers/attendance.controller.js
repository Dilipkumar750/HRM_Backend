// import Attendance from "../models/Attendance.js";
// import User from "../models/User.js";
// import asyncHandler from "express-async-handler";
// import { DateTime } from "luxon";
// import dns from "dns";

// // Create attendance with arrival time
// export const createAttendance = asyncHandler(async (req, res) => {


//   const { checkIn, employee_id } = req.body;
//   console.log(checkIn)
//   try {
//     const existingRecord = await Attendance.findOne({ employee_id, date: new Date().setHours(0,0,0,0) });
//     if (existingRecord) {
//       return res.status(400).json({ message: "Already checked in today" });
//     }

//     const attendance = new Attendance({ employee_id, date: new Date(), checkIn: new Date() });
//     await attendance.save();
//     res.status(201).json({ message: "Checked in successfully", attendance });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Update departure time
// export const updateDepartureTime = asyncHandler(async (req, res) => {
//   const now = new Date();
//   const currentHour = now.getHours();
//   const currentMinute = now.getMinutes();

//   const startOfDay = new Date(now.setHours(0, 0, 0, 0));
//   const endOfDay = new Date(now.setHours(23, 59, 59, 999));

//   const targetHour = 19;
//   const targetMinute = 30;
//   const isAfterTargetTime =
//     currentHour > targetHour ||
//     (currentHour === targetHour && currentMinute >= targetMinute);

//   const { emailId, remarks } = req.body;

//   try {
//     const existingRecord = await Attendance.findOne({
//       emailId,
//       createdAt: { $gte: startOfDay, $lt: endOfDay },
//     });

//     if (!existingRecord) {
//       return res.status(404).json({
//         success: false,
//         message: "Attendance record not found for today",
//       });
//     }

//     if (existingRecord.departureDate) {
//       return res.status(400).json({
//         success: false,
//         message: "Departure time already updated",
//       });
//     }

//     if (isAfterTargetTime || (remarks && existingRecord.status)) {
//       existingRecord.departureDate = new Date();
//       if (remarks) existingRecord.remarks = remarks;
//       await existingRecord.save();
//       return res.json({
//         success: true,
//         message: "Departure updated successfully",
//         data: existingRecord,
//       });
//     }

//     if (!remarks) {
//       return res.status(400).json({ success: false, message: "Please provide remarks" });
//     }

//     existingRecord.remarks = remarks;
//     await existingRecord.save();
//     return res.json({
//       success: true,
//       message: "Remarks updated, waiting for admin approval",
//       data: existingRecord,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// // Admin approval for departure
// export const approveDeparture = asyncHandler(async (req, res) => {
//   const { _id, approve } = req.body;

//   try {
//     const existingRecord = await Attendance.findById(_id);

//     if (!existingRecord) {
//       return res.status(404).json({
//         success: false,
//         message: "Attendance record not found",
//       });
//     }

//     existingRecord.status = approve;
//     await existingRecord.save();

//     return res.json({
//       success: true,
//       message: approve ? "Departure approved" : "Departure rejected",
//       data: existingRecord,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// // Get attendance for a specific user today
// export const getUserAttendance = asyncHandler(async (req, res) => {
//   const { emailId } = req.params;

//   const today = new Date();
//   const startOfDay = new Date(today.setHours(0, 0, 0, 0));
//   const endOfDay = new Date(today.setHours(23, 59, 59, 999));

//   try {
//     const record = await Attendance.findOne({
//       emailId,
//       createdAt: { $gte: startOfDay, $lt: endOfDay },
//     });

//     if (record) {
//       return res.json({ success: true, data: record });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: "No attendance record found for today",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// // Get attendance by name for today
// export const getAttendanceByName = asyncHandler(async (req, res) => {
//   const { name } = req.body;

//   const today = new Date();
//   const startOfDay = new Date(today.setHours(0, 0, 0, 0));
//   const endOfDay = new Date(today.setHours(23, 59, 59, 999));

//   try {
//     const record = await Attendance.findOne({
//       name,
//       createdAt: { $gte: startOfDay, $lt: endOfDay },
//     });

//     if (record) {
//       return res.json({ success: true, data: record });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: "No attendance record found for today",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// // Delete attendance record
// export const deleteAttendance = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   try {
//     const attendance = await Attendance.findByIdAndDelete(id);

//     if (!attendance) {
//       return res.status(404).json({
//         success: false,
//         message: "Attendance record not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Attendance record deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// // Get all attendance records
// export const getprofile = asyncHandler(async (req, res) => {
//   try {
//     const records = await Attendance.find().sort({ arrivalDate: -1 });
//     return res.json({ success: true, data: records });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// // Get attendance records in a date range
// export const getRangeSelectedAttendance = asyncHandler(async (req, res) => {
//   const { fromDate, toDate } = req.body;

//   const start = new Date(fromDate).setHours(0, 0, 0, 0);
//   const end = new Date(toDate).setHours(23, 59, 59, 999);

//   try {
//     const records = await Attendance.find({
//       createdAt: { $gte: start, $lte: end },
//     });

//     return res.json({ success: true, data: records });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

// export const getTotalDaysPresent = asyncHandler ( async (req,res) => {
//   const {employee_id, month, year} = req.body;
//   try {
//     const totalDays = await Attendance.countDocuments({
//       employee_id,
//       isPresent: true,
//       date: {
//         $gte: new Date(year, month - 1, 1), // Start of the month
//         $lte: new Date(year, month, 0), // End of the month
//       },
//     });

//     return totalDays;
//   } catch (error) {
//     console.error("Error calculating total days present:", error);
//     return 0;
//   }
// });

// // Get attendance records for the last month
// export const getLastMonthAttendance = asyncHandler(async (req, res) => {
//   const today = new Date();

//   // Get the first day of the last month
//   const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

//   // Get the last day of the last month
//   const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

//   try {
//     // Query attendance records for the last month
//     const records = await Attendance.find({
//       createdAt: { $gte: firstDayOfLastMonth, $lt: lastDayOfLastMonth },
//     }).sort({ createdAt: -1 }); // Sort records by createdAt in descending order

//     if (records.length > 0) {
//       return res.json({ success: true, data: records });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: "No attendance records found for the last month",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });
// // Get attendance records for the last week
// export const getLastWeekAttendance = asyncHandler(async (req, res) => {
//   const today = new Date();

//   // Get the date 7 days ago from today
//   const lastWeekStartDate = new Date(today);
//   lastWeekStartDate.setDate(today.getDate() - 7);

//   try {
//     // Query attendance records for the last week
//     const records = await Attendance.find({
//       createdAt: { $gte: lastWeekStartDate, $lt: today },
//     }).sort({ createdAt: -1 }); // Sort records by createdAt in descending order

//     if (records.length > 0) {
//       return res.json({ success: true, data: records });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: "No attendance records found for the last week",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });
// // Get today's attendance records
// export const getTodayAttendance = asyncHandler(async (req, res) => {
//   const today = new Date();
//   const startOfDay = new Date(today.setHours(0, 0, 0, 0));  // Start of today (00:00:00)
//   const endOfDay = new Date(today.setHours(23, 59, 59, 999));  // End of today (23:59:59)

//   try {
//     // Query attendance records for today
//     const records = await Attendance.find({
//       createdAt: { $gte: startOfDay, $lt: endOfDay },
//     }).sort({ createdAt: -1 }); // Sort records by createdAt in descending order

//     if (records.length > 0) {
//       return res.json({ success: true, data: records });
//     } else {
//       return res.status(404).json({
//         success: false,
//         message: "No attendance records found for today",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import { DateTime } from "luxon";

// MARK CHECK-IN
export async function markCheckIn(req, res) {
  try {
    const { employee_id } = req.body;
    const today = DateTime.now().setZone("Asia/Kolkata").toISODate();

    const existingAttendance = await Attendance.findOne({ employee_id, date: today });

    if (existingAttendance) {
      return res.status(400).json({ message: "Already checked in today!" });
    }

    const attendance = new Attendance({
      employee_id,
      date: today,
      checkIn: DateTime.now().setZone("Asia/Kolkata").toJSDate(),
    });

    await attendance.save();
    res.status(201).json({ message: "Check-in successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}

// MARK CHECK-OUT
export async function markCheckOut(req, res) {
  try {
    const { employee_id } = req.body;
    const today = DateTime.now().setZone("Asia/Kolkata").toISODate();

    const attendance = await Attendance.findOne({ employee_id, date: today });

    if (!attendance) {
      return res.status(404).json({ message: "No check-in found for today" });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ message: "Already checked out!" });
    }

    const checkOutTime = DateTime.now().setZone("Asia/Kolkata");
    const checkInTime = DateTime.fromJSDate(attendance.checkIn).setZone("Asia/Kolkata");
    const totalHours = checkOutTime.diff(checkInTime, "hours").hours;

    attendance.checkOut = checkOutTime.toJSDate();
    attendance.totalHours = totalHours;
    await attendance.save();

    res.status(200).json({
      message: "Check-out successful",
      attendance: {
        _id: attendance._id,
        employee_id: attendance.employee_id,
        date: DateTime.fromJSDate(attendance.date).setZone("Asia/Kolkata").toFormat("yyyy-MM-dd"),
        checkIn: DateTime.fromJSDate(attendance.checkIn).setZone("Asia/Kolkata").toFormat("HH:mm"),
        checkOut: DateTime.fromJSDate(attendance.checkOut).setZone("Asia/Kolkata").toFormat("HH:mm"),
        totalHours: totalHours.toFixed(2),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}

// GET TODAY'S ATTENDANCE
export async function getTodayAttendance(req, res) {
  try {
    const todayStart = DateTime.now().setZone("Asia/Kolkata").startOf("day").toJSDate();
    const todayEnd = DateTime.now().setZone("Asia/Kolkata").endOf("day").toJSDate();

    const attendanceData = await Attendance.aggregate([
      { $match: { date: { $gte: todayStart, $lte: todayEnd } } },
      {
        $lookup: {
          from: "users",
          localField: "employee_id",
          foreignField: "employee_id",
          as: "employeeDetails",
        },
      },
      { $unwind: "$employeeDetails" },
      {
        $project: {
          _id: 1,
          employee_id: 1,
          name: "$employeeDetails.name",
          designation: "$employeeDetails.designation",
          department: "$employeeDetails.department",
          status: {
            $cond: {
              if: { $eq: ["$isPresent", true] },
              then: "Present",
              else: "Absent",
            },
          },
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date",
              timezone: "Asia/Kolkata",
            },
          },
          checkIn: {
            $dateToString: {
              format: "%H:%M",
              date: "$checkIn",
              timezone: "Asia/Kolkata",
            },
          },
          checkOut: {
            $cond: {
              if: { $eq: ["$checkOut", null] },
              then: "-",
              else: {
                $dateToString: {
                  format: "%H:%M",
                  date: "$checkOut",
                  timezone: "Asia/Kolkata",
                },
              },
            },
          },
          totalHours: 1,
        },
      },
    ]);

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}



// GET MONTHLY ATTENDANCE
// export async function getMonthlyAttendance(req, res) {
//   try {
//     const { employee_id, month, year } = req.query;

//     if (!employee_id || !month || !year) {
//       return res.status(400).json({ message: "employee_id, month, and year are required." });
//     }

//     const startOfMonth = DateTime.fromObject({ year: +year, month: +month }).setZone("Asia/Kolkata").startOf("month").toJSDate();
//     const endOfMonth = DateTime.fromObject({ year: +year, month: +month }).setZone("Asia/Kolkata").endOf("month").toJSDate();

//     const attendanceRecords = await Attendance.find({
//       employee_id,
//       date: { $gte: startOfMonth, $lte: endOfMonth },
//     }).sort({ date: 1 });

//     const formatted = attendanceRecords.map((record) => ({
//       _id: record._id,
//       employee_id: record.employee_id,
//       date: DateTime.fromJSDate(record.date).setZone("Asia/Kolkata").toFormat("yyyy-MM-dd"),
//       checkIn: record.checkIn
//         ? DateTime.fromJSDate(record.checkIn).setZone("Asia/Kolkata").toFormat("HH:mm")
//         : "-",
//       checkOut: record.checkOut
//         ? DateTime.fromJSDate(record.checkOut).setZone("Asia/Kolkata").toFormat("HH:mm")
//         : "-",
//       totalHours: record.totalHours?.toFixed(2) || "0.00",
//       status: record.isPresent ? "Present" : "Absent",
//     }));

//     res.status(200).json(formatted);
//   } catch (error) {
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// }


// ✅ GET ALL OR FILTERED ATTENDANCE
export async function getAllAttendance(req, res) {
  try {
    const { date } = req.query;

    let match = {};
    if (date) {
      const selectedDateStart = DateTime.fromISO(date).setZone("Asia/Kolkata").startOf("day").toJSDate();
      const selectedDateEnd = DateTime.fromISO(date).setZone("Asia/Kolkata").endOf("day").toJSDate();
      match.date = { $gte: selectedDateStart, $lte: selectedDateEnd };
    }

    const attendanceData = await Attendance.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "users",
          localField: "employee_id",
          foreignField: "employee_id",
          as: "employeeDetails",
        },
      },
      { $unwind: "$employeeDetails" },
      {
        $project: {
          _id: 1,
          employee_id: 1,
          name: "$employeeDetails.name",
          designation: "$employeeDetails.designation",
          department: "$employeeDetails.department",
          status: {
            $cond: {
              if: { $eq: ["$isPresent", true] },
              then: "Present",
              else: "Absent",
            },
          },
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date",
              timezone: "Asia/Kolkata",
            },
          },
          checkIn: {
            $cond: {
              if: { $eq: ["$checkIn", null] },
              then: "-",
              else: {
                $dateToString: {
                  format: "%H:%M",
                  date: "$checkIn",
                  timezone: "Asia/Kolkata",
                },
              },
            },
          },
          checkOut: {
            $cond: {
              if: { $eq: ["$checkOut", null] },
              then: "-",
              else: {
                $dateToString: {
                  format: "%H:%M",
                  date: "$checkOut",
                  timezone: "Asia/Kolkata",
                },
              },
            },
          },
          totalHours: 1,
        },
      },
    ]);

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}


// GET CUSTOM ATTENDANCE (between start & end date)
export async function getCustomAttendance(req, res) {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ message: "Start and end dates are required." });
    }

    const startDate = DateTime.fromISO(start).setZone("Asia/Kolkata").startOf("day").toJSDate();
    const endDate = DateTime.fromISO(end).setZone("Asia/Kolkata").endOf("day").toJSDate();

    const attendanceData = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "employee_id",
          foreignField: "employee_id",
          as: "employeeDetails",
        },
      },
      { $unwind: "$employeeDetails" },
      {
        $project: {
          _id: 1,
          employee_id: 1,
          name: "$employeeDetails.name",
          designation: "$employeeDetails.designation",
          department: "$employeeDetails.department",
          status: {
            $cond: {
              if: { $eq: ["$isPresent", true] },
              then: "Present",
              else: "Absent",
            },
          },
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date",
              timezone: "Asia/Kolkata",
            },
          },
          checkIn: {
            $cond: {
              if: { $eq: ["$checkIn", null] },
              then: "-",
              else: {
                $dateToString: {
                  format: "%H:%M",
                  date: "$checkIn",
                  timezone: "Asia/Kolkata",
                },
              },
            },
          },
          checkOut: {
            $cond: {
              if: { $eq: ["$checkOut", null] },
              then: "-",
              else: {
                $dateToString: {
                  format: "%H:%M",
                  date: "$checkOut",
                  timezone: "Asia/Kolkata",
                },
              },
            },
          },
          totalHours: 1,
        },
      },
    ]);

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}




export async function manualAttendanceEntry(req, res) {
  try {
    const { employee_id, date, checkIn, checkOut } = req.body;

    if (!employee_id || !date || !checkIn || !checkOut) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const dateObj = DateTime.fromISO(date).setZone("Asia/Kolkata");
    const checkInObj = DateTime.fromISO(`${date}T${checkIn}`).setZone("Asia/Kolkata");
    const checkOutObj = DateTime.fromISO(`${date}T${checkOut}`).setZone("Asia/Kolkata");

    if (checkOutObj <= checkInObj) {
      return res.status(400).json({ message: "Check-out must be after check-in." });
    }

    const totalHours = checkOutObj.diff(checkInObj, "hours").hours;

    const existing = await Attendance.findOne({
      employee_id,
      date: dateObj.toISODate(),
    });

    if (existing) {
      return res.status(409).json({ message: "Attendance already exists for this date." });
    }

    const attendance = new Attendance({
      employee_id,
      date: dateObj.toISODate(),
      checkIn: checkInObj.toJSDate(),
      checkOut: checkOutObj.toJSDate(),
      totalHours,
      isPresent: true,
    });

    await attendance.save();

    res.status(201).json({ message: "Manual attendance recorded successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}




// 🟢 FIXED: GET MONTHLY ATTENDANCE with employee details
// export async function getMonthlyAttendance(req, res) {
//   try {
//     const { employee_id, month, year } = req.query;

//     if (!month || !year) {
//       return res.status(400).json({ message: "Month and year are required." });
//     }

//     const startOfMonth = DateTime.fromObject({ year: +year, month: +month })
//       .setZone("Asia/Kolkata")
//       .startOf("month")
//       .toJSDate();

//     const endOfMonth = DateTime.fromObject({ year: +year, month: +month })
//       .setZone("Asia/Kolkata")
//       .endOf("month")
//       .toJSDate();

//     const matchQuery = {
//       date: { $gte: startOfMonth, $lte: endOfMonth },
//     };

//     if (employee_id && employee_id !== "all") {
//       matchQuery.employee_id = employee_id;
//     }

//     const attendanceData = await Attendance.aggregate([
//       { $match: matchQuery },
//       {
//         $lookup: {
//           from: "users",
//           localField: "employee_id",
//           foreignField: "employee_id",
//           as: "employeeDetails",
//         },
//       },
//       { $unwind: "$employeeDetails" },
//       {
//         $project: {
//           _id: 1,
//           employee_id: 1,
//           name: "$employeeDetails.name",
//           designation: "$employeeDetails.designation",
//           department: "$employeeDetails.department",
//           status: {
//             $cond: {
//               if: { $eq: ["$isPresent", true] },
//               then: "Present",
//               else: "Absent",
//             },
//           },
//           date: {
//             $dateToString: {
//               format: "%Y-%m-%d",
//               date: "$date",
//               timezone: "Asia/Kolkata",
//             },
//           },
//           checkIn: {
//             $cond: {
//               if: { $eq: ["$checkIn", null] },
//               then: "-",
//               else: {
//                 $dateToString: {
//                   format: "%H:%M",
//                   date: "$checkIn",
//                   timezone: "Asia/Kolkata",
//                 },
//               },
//             },
//           },
//           checkOut: {
//             $cond: {
//               if: { $eq: ["$checkOut", null] },
//               then: "-",
//               else: {
//                 $dateToString: {
//                   format: "%H:%M",
//                   date: "$checkOut",
//                   timezone: "Asia/Kolkata",
//                 },
//               },
//             },
//           },
//           totalHours: 1,
//         },
//       },
//     ]);

//     res.status(200).json(attendanceData);
//   } catch (error) {
//     res.status(500).json({ error: "Server error", details: error.message });
//   }
// }



export async function getMonthlyAttendance(req, res) {
  try {
    const { employee_id, month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ message: "Month and year are required." });
    }

    const dt = DateTime.fromObject({ year: +year, month: +month }).setZone("Asia/Kolkata");
    const startOfMonth = dt.startOf("month").toJSDate();
    const endOfMonth = dt.endOf("month").toJSDate();
    const daysInMonth = dt.daysInMonth;

    const matchQuery = {
      date: { $gte: startOfMonth, $lte: endOfMonth },
    };

    if (employee_id && employee_id !== "all") {
      matchQuery.employee_id = employee_id;
    }

    const attendanceData = await Attendance.aggregate([
      { $match: matchQuery },
      {
        $lookup: {
          from: "users",
          localField: "employee_id",
          foreignField: "employee_id",
          as: "employeeDetails",
        },
      },
      { $unwind: "$employeeDetails" },
      {
        $project: {
          _id: 1,
          employee_id: 1,
          name: "$employeeDetails.name",
          designation: "$employeeDetails.designation",
          department: "$employeeDetails.department",
          status: {
            $cond: {
              if: { $eq: ["$isPresent", true] },
              then: "Present",
              else: "Absent",
            },
          },
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date",
              timezone: "Asia/Kolkata",
            },
          },
          checkIn: {
            $cond: {
              if: { $eq: ["$checkIn", null] },
              then: "-",
              else: {
                $dateToString: {
                  format: "%H:%M",
                  date: "$checkIn",
                  timezone: "Asia/Kolkata",
                },
              },
            },
          },
          checkOut: {
            $cond: {
              if: { $eq: ["$checkOut", null] },
              then: "-",
              else: {
                $dateToString: {
                  format: "%H:%M",
                  date: "$checkOut",
                  timezone: "Asia/Kolkata",
                },
              },
            },
          },
          totalHours: 1,
        },
      },
    ]);

    res.status(200).json({
      daysInMonth,
      records: attendanceData,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}


// 🆕 NEW: GET WEEKLY ATTENDANCE
export async function getWeeklyAttendance(req, res) {
  try {
    const end = DateTime.now().setZone("Asia/Kolkata").endOf("day");
    const start = end.minus({ days: 6 }).startOf("day");

    const attendanceData = await Attendance.aggregate([
      {
        $match: {
          date: {
            $gte: start.toJSDate(),
            $lte: end.toJSDate(),
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "employee_id",
          foreignField: "employee_id",
          as: "employeeDetails",
        },
      },
      { $unwind: "$employeeDetails" },
      {
        $project: {
          _id: 1,
          employee_id: 1,
          name: "$employeeDetails.name",
          department: "$employeeDetails.department",
          designation: "$employeeDetails.designation",
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$date",
              timezone: "Asia/Kolkata",
            },
          },
          status: {
            $cond: [{ $eq: ["$isPresent", true] }, "Present", "Absent"],
          },
          checkIn: {
            $cond: [
              { $eq: ["$checkIn", null] },
              "-",
              {
                $dateToString: {
                  format: "%H:%M",
                  date: "$checkIn",
                  timezone: "Asia/Kolkata",
                },
              },
            ],
          },
          checkOut: {
            $cond: [
              { $eq: ["$checkOut", null] },
              "-",
              {
                $dateToString: {
                  format: "%H:%M",
                  date: "$checkOut",
                  timezone: "Asia/Kolkata",
                },
              },
            ],
          },
          totalHours: 1,
        },
      },
    ]);

    res.status(200).json(attendanceData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

