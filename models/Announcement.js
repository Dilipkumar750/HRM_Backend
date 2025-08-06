import mongoose from 'mongoose';

// Define schema for Company Policy
const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },

  eventDate:{
    type:Date,
    required:true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  archived: {type: Boolean,default: false}
}, {
  timestamps: true 
});

// Create model from schema
const Announcement = mongoose.model('announcement',AnnouncementSchema);

export default  Announcement;
