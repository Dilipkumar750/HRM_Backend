import mongoose from 'mongoose';


// Define Counter Schema
const counterSchema = new mongoose.Schema({
  count: { type: Number, default: 0 }
});

// Create Models

const Counter = mongoose.model('Counter', counterSchema);

export default  Counter; // Export separately
