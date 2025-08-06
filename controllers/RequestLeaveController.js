import Requestleave from '../models/RequestLeave.js';

// Get all leave requests
export const getLeaveRequests = async (req, res) => {
  try {
    const leaves = await Requestleave.find();
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leave requests', error });
  }
};

// Create a new leave request
export const createLeaveRequest = async (req, res) => {
  const newLeave = new Requestleave(req.body);
  try {
    const savedLeave = await newLeave.save();
    res.status(201).json(savedLeave);
  } catch (error) {
    res.status(400).json({ message: 'Error creating leave request', error });
  }
};

// Update leave request status
export const updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log('Update Leave Status Request:', { id, status }); // Log the request details

  try {
    const updatedLeave = await Requestleave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    console.error('Error updating leave status:', error); // Log the error details
    res.status(500).json({ message: 'Error updating leave status', error });
  }
};

// Delete leave request
export const deleteLeaveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLeave = await Requestleave.findByIdAndDelete(id);

    if (!deletedLeave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    res.status(200).json({ message: 'Leave request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting leave request', error });
  }
};
