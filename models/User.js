
import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  employee_id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  designation: {type:String, required:true},
  role: { type: String, enum: ['Admin', 'Employee','Intern'], default: 'Employee' },
  salary: { type: Number },
  hireDate: { type: Date, default: Date.now },
  isValidated: { type: Boolean, default: false },  // New field for validation
  archived: { type: Boolean, default: false },
},{timestamps:true});

// Create the model

// Hash password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// const counterSchema = new mongoose.Schema({
//   employee_id: { type: String },
//   count: { type: Number }
// })
// const Counter = mongoose.model("Counter", counterSchema);
const User = mongoose.model('User', userSchema);

export default User;