import mongoose from "mongoose";

const employeeDetailsSchema = new mongoose.Schema({
  employee_id: { type: String, required: true, unique: true },
  personalDetails: {
    name: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, sparse: true },

    mobile: { type: Number, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfJoining: { type: String, required: true },
    bloodGroup: { type: String },
    fatherName: { type: String, required: true },
    alternateNumber: { type: Number },
    aadharNumber: { type: Number, required: true },
    panNumber: { type: String, required: true },
    contactPersonName: { type: String, required: true },
    contactPersonRelationship: { type: String, required: true },
    image: [{ type: String, required: false }]
  },
  educationalDetails: {
    tenthMarks: { type: Number, required: true },
    twelfthMarks: { type: String },
    ugDomain: { type: String, required: true },
    ugPassedOutYear: { type: Number, required: true },
    pgDomain: { type: String },
    pgPassedOutYear: { type: Number }
  },
  experienceDetails: [
  {
    companyName: { type: String, default: "" },
    jobDescription: { type: String, default: "" },
    startDate: { type: String, default: "" },
    eventDate: { type: String, default: "" }
  }
],

  documents: [
    {
      fileName: { type: String, required: true },
      fileUrl: { type: String, required: true },
      fileType: { type: String, required: true },
      fileSize: { type: String, required: true },
      uploadedAt: { type: Date, default: Date.now }
    }
  ],
  addressDetails: {
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  bankDetails: {
    accountName: { type: String },
    accountNumber: { type: Number },
    bankBranch: { type: String },
    IFScode: { type: String }
  },
  archived: { type: Boolean, default: false }
});

const EmployeeDetails = mongoose.model("EmployeeDetails", employeeDetailsSchema);
export default EmployeeDetails;
