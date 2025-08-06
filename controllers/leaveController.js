
// controllers/leaveController.js
import Leave from '../models/Leave.js';

export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaves', error });
  }
};

export const getAllLeavesbyEmployee_id = async (req, res) => {
  try {
     console.log(req.params)
    const id=req.params.id;
    const leaves = await Leave.find({employeeId:id});
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error hello fetching leaves', error });
  }
};

export const createLeave = async (req, res) => {
  try {
    const newLeave = new Leave(req.body);
    const savedLeave = await newLeave.save();
    res.status(201).json(savedLeave);
  } catch (error) {
    res.status(400).json({ message: 'Error creating leave', error });
  }
};

export const updateLeave = async (req, res) => {
  try {
    const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLeave);
  } catch (error) {
    res.status(400).json({ message: 'Error updating leave', error });
  }
};

export const deleteLeave = async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.json({ message: 'Leave deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting leave', error });
  }
};

// export const updateLeaveStatus = async (req, res) => {
//   try {
//     const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
//     res.json(updatedLeave);
//   } catch (error) {
//     res.status(400).json({ message: 'Error updating status', error });
//   }
// };



// Update Leave Status and Add Attendance if Approved
export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await Leave.findById(id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = status;
    await leave.save();

    // ✅ If Approved, create attendance entries
    if (status === "Approved") {
      const fromDate = DateTime.fromISO(leave.from).startOf("day");
      const toDate = DateTime.fromISO(leave.to).startOf("day");

      const allDates = [];
      for (let dt = fromDate; dt <= toDate; dt = dt.plus({ days: 1 })) {
        allDates.push(dt.toISODate());
      }

      // Check existing attendance
      const existing = await Attendance.find({
        employee_id: leave.employeeId,
        date: { $in: allDates },
      });
      const existingDates = existing.map((entry) => entry.date);

      const newAttendance = allDates
        .filter(date => !existingDates.includes(date))
        .map(date => ({
          employee_id: leave.employeeId,
          status: "Absent",
          date,
          checkIn: "-",
          checkOut: "-"
        }));

      if (newAttendance.length > 0) {
        await Attendance.insertMany(newAttendance);
      }
    }
    

    res.status(200).json({ message: "Leave status updated", leave });
  } catch (error) {
    console.error("Error updating leave:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
