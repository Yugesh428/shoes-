import { Request, Response } from "express";
import User from "../../database/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../../middleware/sendMail"; // Make sure this is working correctly

// Register user
const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      message: "Please enter username, email, and password",
    });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 12);

    await User.create({
      username,
      password: hashedPassword,
      email,
    });

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

// Login user
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter email and password",
    });
  }

  try {
    const users = await User.findAll({ where: { email } });

    if (users.length === 0) {
      return res.status(404).json({
        message: "User not registered",
      });
    }

    const user = users[0];
    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user.id }, "thisissecret", {
      expiresIn: "30d",
    });

    // Send welcome email
    const mailInformation = {
      to: user.email,
      subject: "Welcome Back to ShoeVerse 👟",
      html: `
    <h2>Hello ${user.username},</h2>
    <p>We're glad to see you again on <strong>ShoeVerse</strong>!</p>
    <p>Enjoy exploring our latest shoes and exclusive offers!</p>
    <hr>
    <p>Login Successful ✔️</p>
  `,
      text: `Hello ${user.username}, Welcome back to ShoeVerse! Login Successful.`, // <- required for plain-text emails
    };

    await sendMail(mailInformation);

    return res.status(200).json({
      data: {
        token,
        username: user.username,
      },
      message: "Login successful and welcome email sent",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

export { registerUser, loginUser };
