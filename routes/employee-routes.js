// routes/employee-routes.js
import { Router } from 'express';
import {
  getEmployees,
  createEmployee,
  activateEmail,
  getEmployeeProfile,
  uploadMultipleFiles,
  updateEmployeeProfileDetails,
  deleteEmployee,
  getEmployeeProfileByIdForAdmin
} from '../controllers/employee.controller.js';

import upload from '../middlewares/upload.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

// For Admin & HR
router.post('/create', protect, createEmployee);
router.get('/get', protect, getEmployees);
router.get('/get-employee-profile', protect, getEmployeeProfile); // by employee
router.get('/admin-view/:id', protect, getEmployeeProfileByIdForAdmin); // NEW - by admin
router.post('/update-employee-profile-details', protect, upload.array('files', 8), uploadMultipleFiles);
router.patch('/delete-employee', protect, deleteEmployee);
router.put('/activate-email', protect, activateEmail);

export default router;
