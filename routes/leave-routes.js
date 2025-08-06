// routes/leaveRoutes.js
import express from 'express';
import { getAllLeaves, createLeave, updateLeave, deleteLeave, updateLeaveStatus, getAllLeavesbyEmployee_id } from '../controllers/leaveController.js';

const router = express.Router();

router.get('/get-leaves', getAllLeaves);
router.get('/get-leavess/employee/:id', getAllLeavesbyEmployee_id);
router.post('/create-leaves',createLeave);
router.put('/update-leaves/:id',updateLeave);
router.delete('/leaves/:id',deleteLeave);
router.patch('/leaves/:id', updateLeaveStatus);

export default router;
