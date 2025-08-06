import express from 'express';
import {
  getLeaveRequests,
  createLeaveRequest,
  updateLeaveStatus,
  deleteLeaveRequest
} from '../controllers/RequestLeaveController.js';

const router = express.Router();

// Routes
router.get('/get-Reuestleave-requests', getLeaveRequests);            // Get all leave requests
router.post('/post-Reuestleave-requests', createLeaveRequest);         // Create new leave request
router.put('/put-Reuestleave-requests/:id', updateLeaveStatus);       // Update leave request status
router.delete('/delete-Reuestleave-requests/:id', deleteLeaveRequest);   // Delete leave request

export default router;

// http://localhost:5000/requestLeave/put-Reuestleave-requests/