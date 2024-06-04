const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const passport = require("passport");

exports.registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      mobileNo,
      profileImage,
      DOB,
      gender,
    } = req.body;
    // Checking Already Register or Not
    let user = await User.findOne({ email: email, isDelete: false });
    // console.log(user);

    if (user) {
      return res.json({ message: "You are Already Registered....." });
    }

    // Encrypt Password
    let hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);

    // Create New User
    user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      mobileNo,
      profileImage,
      DOB,
      gender,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking User Exist Or Not
    let user = await User.findOne({ email: email, isDelete: false });
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    let matchedPassword = await bcrypt.compare(password, user.password);
    // console.log(matchedPassword);

    if (!matchedPassword) {
      return res.json({ message: "Password is Not Matched...." });
    }

    let token = JWT.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.json({ token, message: "Login Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.getProfile = async (req, res) => {
  try {
    let userProfile = req.user;
    res.json(userProfile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.updateProfile = async (req, res) => {
  try {
    let user = req.user;
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    user = await User.findByIdAndUpdate(
      user._id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.json({user, message: "Update Success"});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.changePassword = async (req,res) => {
    try {
        let user = req.user;
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if(oldPassword === newPassword){
            res.json({message: "Your Password Allready Used...."});
        }
        if(newPassword !== confirmPassword){
            res.json({message: "newPassword An confirmPassword Doesn't Match...."});
        }
        let hashPassword = await bcrypt.hash(newPassword, 10);

        user = await User.findByIdAndUpdate(
          user._id,
          { $set: { password: hashPassword } },
          { new: true }
        );
        res.json({user, message: "Update Success"});
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      } 
}


exports.deleteUser = async (req,res) => {
    try {
        let user = req.user;
        user = await User.findByIdAndUpdate(
          user._id,
          { $set: { isDelete: true } },
          { new: true }
        );
        res.json({user, message: "Delete Success"});
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
};

