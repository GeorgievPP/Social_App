// DEPENDENCIES
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// DB MODEL
import User from "../models/user.js";

// LOGIN (Sign In)
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // USER CHECK BY EMAIL
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "Email Not Exist!" });
    }

    // PASSWORD CHECK
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password!" });
    }

    // SIGN TOKEN
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// REGISTER (Sign Up)
export const register = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, imageUrl } = req.body;

  try {
    // CHECK USER BY EMAIL
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist!" });
    }

    // CHECK PASSWORD MATCH
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password Don't Match!" });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 12);

    // CREATE USER
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      imageUrl
    });

    // SIGN TOKEN
    const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

// EDIT USER
export const editUser = async (req, res) => {
  try{
    const {_id, firstName, lastName, email, imageUrl} = req.body;
    const name = `${firstName} ${lastName}`;
    const user = await User.findById(_id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.imageUrl = imageUrl || user.imageUrl;
      // user.isAdmin = Boolean(req.body.isAdmin);

      const updatedUser = await user.save();
      res.status(200).json({ updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};