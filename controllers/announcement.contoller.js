import Announcement from '../models/Announcement.js';
import { ObjectId } from 'mongodb'; // Import ObjectId for validation


// Create a new policy
export const createAnnouncement = async (req, res) => {
  try {
    const { title, description, eventDate } = req.body;

    const newAnnouncement = new Announcement({
      title,
      description,
      eventDate
    });

    await newPolicy.save();
    res.status(201).json({ message: 'Announcement created successfully', data: newAnnouncement });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all policies
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcement = await Announcement.find();

    // Delete announcements where expiryDate has passed
    const currentDate = new Date();
    const result = await Announcement.deleteMany({ eventDate: { $lt: currentDate } });
    
    res.status(200).json({ message: 'Announcement fetched successfully', data: announcement });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const getAnnouncementById = async (req, res) => {
  const _id = req.query._id; // Destructure `id` from URL params
  // console.log(_id)

  // Validate if `id` is a valid MongoDB ObjectId
  if (!ObjectId.isValid(_id)) {
    return res.status(400).json({ message: 'Invalid Announcement ID format' });
  }

  try {
    // Query the policy by ID
    const announcement = await Announcement.findById(_id);

    // If no policy is found with that ID
    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    // Return the policy if found
    res.status(200).json({ message: 'announcement fetched successfully', data: announcement });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a policy by ID
export const updateAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const _id = req.query._id;
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      _id,
      { title, description },
      { new: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json({ message: ' updated successfully', data: updatedAnnouncement });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete policy by ID
export const deleteAnnouncementById = async (req, res) => {
  const _id = req.query._id;

  try {
    const announcement = await Announcement.findByIdAndDelete(_id);

    if (!announcement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
