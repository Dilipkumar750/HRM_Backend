import User from '../models/User.js'
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// User Registration
export async function register(req, res) {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

// User Login
export async function login(req, res) {
    
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // console.log(user)
    if (!user) return res.status(400).json({ message: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = JWT.sign(
      { id: user._id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token will expire in 1 hour
    );
    // { expiresIn: '1d' }
    // console.log("reached-login  ")
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function resetPassword(req,res){

    try{
      const {email, oldPassword, newPassword} = req.body;
      const user = await User.findOne({email});

      if(!user){
       return res.status(400).json({message: "Invalid Email"});
      }

      const passwordChecker = await bcrypt.compare(oldPassword,user.password);
      if(!passwordChecker) return res.status(400).json({message: "Invalid Password"});

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
      user.isValidated = true;
      await user.save();
      
      res.status(200).json({message: "Password updated succesfully"});
    }catch(err){
      res.status(500).json({message:"Interval Server Error",err})
    }
}

export async function getUserInfo(req,res){

  // console.log("reached-getuser")
  try {
    const email = req.user.email;
    const user = await User.findOne({ email: email });
    // console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Get User Detail", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error });
  }
}