// import JWT from 'jsonwebtoken';

// export function protect(req, res, next) {
//   console.log("reached middleware")
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Not authorized, no token' });
//   console.log(token)

//   try {
//     const decoded = JWT.verify(token, process.env.JWT_SECRET)
//     console.log(user);
//     req.user = user;  
//     // console.log({ "message user": user });
//     // console.log({ "message decoded": decoded });
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid token" })
//   }
//   // Check if the user is an Admin
//   // if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Not an Admin' });
//   next();
// };


import JWT from 'jsonwebtoken';

export function protect(req, res, next) {
  // console.log("reached middleware")  
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
      // console.log({message:user});
      if (err) {
        return res.status(403).json({ message: "Invalid token" })
      }
      req.user = user;
      // console.log({message:user});
    });


    // Check if the user is an Admin
    // if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Not an Admin' });

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid' });
  }
};