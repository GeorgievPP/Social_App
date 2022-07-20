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
      return res.status(404).json({ message: "User Not Exist!" });
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
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// REGISTER (Sign Up)
export const register = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

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
    });

    // SIGN TOKEN...... SET SECRET
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};
