export async function calculatePayroll(req, res) {
  const {employee_id, month, year} = req.body;
    try {
      const attendanceRecords = await Attendance.find({
        employee_id,
        date: {
          $gte: new Date(year, month - 1, 1), // Start of the month
          $lte: new Date(year, month, 0), // End of the month
        },
      });
  
      // Calculate total worked hours in the month
      const totalHoursWorked = attendanceRecords.reduce(
        (sum, record) => sum + record.totalHours,
        0
      );
  
      // Get employee salary details
      const employee = await User.findOne({ employee_id });
      const salaryPerHour = employee.salary / 160; // Assuming 160 working hours per month
  
      // Calculate payroll
      const totalSalary = totalHoursWorked * salaryPerHour;
      return { employee_id, totalHoursWorked, totalSalary };
    } catch (error) {
      console.error("Error calculating payroll:", error);
      return null;
    }
  };
  