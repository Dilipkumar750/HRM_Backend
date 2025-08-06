import mongoose from 'mongoose';

// Define schema for Company Policy
const companyPolicySchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  archived: {type: Boolean,default: false}
}, {
  timestamps: true
});

// Create model from schema
const CompanyPolicy = mongoose.model('CompanyPolicy', companyPolicySchema);

export default CompanyPolicy;
