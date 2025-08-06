import CompanyPolicy from "../models/CompanyPolicy.js";
import { ObjectId } from 'mongodb'; // Import ObjectId for validation


// Create a new policy
export const createPolicy = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newPolicy = new CompanyPolicy({
      title,
      description,
    //   role
    });

    await newPolicy.save();
    res.status(201).json({ message: 'Policy created successfully', data: newPolicy });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all policies
export const getAllPolicies = async (req, res) => {
  try {
    const policies = await CompanyPolicy.find();
    return res.status(200).json({ message: 'Policies fetched successfully', data: policies });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

//Get Policy by Id
export const getPolicyById = async (req, res) => {
  const  _id  = req.query._id; // Destructure `id` from URL params
  // console.log(_id)

  // Validate if `id` is a valid MongoDB ObjectId
  if (!ObjectId.isValid(_id)) {
    return res.status(400).json({ message: 'Invalid Policy ID format' });
  }

  try {
    // Query the policy by ID
    const policy = await CompanyPolicy.findById(_id);

    // If no policy is found with that ID
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    // Return the policy if found
    res.status(200).json({ message: 'Policy fetched successfully', data: policy });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a policy by ID
export const updatePolicy = async (req, res) => {
  try {
    const { title, description } = req.body;
    const _id = req.query._id;
    const updatedPolicy = await CompanyPolicy.findByIdAndUpdate(
      _id,
      { title, description},
      { new: true }
    );

    if (!updatedPolicy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    res.status(200).json({ message: 'Policy updated successfully', data: updatedPolicy });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete policy by ID
export const deletePolicyById = async (req, res) => {
  const _id = req.query._id
  try {
    const policy = await CompanyPolicy.findByIdAndDelete(_id);

    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    res.status(200).json({ message: 'Policy deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
