import express, { json } from 'express';
import { config } from 'dotenv';
import cors from "cors";
import bcrypt from 'bcrypt';
import connectDB from './config/mongoConfig.js';
import authRoutes from './routes/auth-routes.js';
import employeeRoutes from './routes/employee-routes.js';
import attendanceRoutes from './routes/attendance-routes.js';
import companyPolicyRoutes from './routes/company-policy-routes.js';
import User from './models/User.js';
import employeeDetailsRouter from './routes/employeeDetails-router.js';
import leaveRouter from './routes/leave-routes.js';
import RequestLeave from './routes/RequestLeave-router.js';
import path from 'path';
import payslipRoutes from "./routes/payslip.js";


config();
connectDB();

const app = express();
app.use(json());
app.use(cors());
// app.use('/uploads', express.static('uploads')); // Serve static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


// Routes
app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/company-policies',companyPolicyRoutes);
app.use('/employeDetails',employeeDetailsRouter);
app.use('/leaveRequest', leaveRouter);
app.use('/requestLeave', RequestLeave);
app.use("/payslip", payslipRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Function to create the admin user
const createAdminUser = async () => {
    try {
        // Establish database connection
        await connectDB();

        // Password hashing (you should always hash passwords)
        const hashedPassword = await bcrypt.hash('12345', 10);  // Replace with a more secure password

        // Create the admin user
        const adminUser = new User({
            employee_id: "GGSCB250003",
            name: 'Admin User',
            email: 'Admin1@gmail.com',
            password: hashedPassword,
            department: "Admin",
            designation:"Manager",
            role: 'Admin',
            archieved: false,
        });

        // Save to database
        const savedUser = await adminUser.save();

        console.log('Admin user created:', savedUser);
    } catch (err) {
        console.error('Error creating admin user:', err);
    }
};

// Uncomment the line below to create an admin user when needed
// createAdminUser();