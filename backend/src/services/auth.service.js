import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

// Register User
export const registerUser = async ({ name, email, password }) => {
  // Validate required fields
  if (!name || !email || !password) {
    return {
      status: 400,
      success: false,
      message: "Name, email and password are required.",
    };
  }

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      status: 409,
      success: false,
      message: "Email already exists.",
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Remove password from response
  const { password: _, ...userData } = user;

  return {
    status: 201,
    success: true,
    message: "User registered successfully.",
    data: userData,
  };
};

// Login User
export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    return {
      status: 400,
      success: false,
      message: "Email and password are required.",
    };
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      status: 401,
      success: false,
      message: "Invalid email or password.",
    };
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return {
      status: 401,
      success: false,
      message: "Invalid email or password.",
    };
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  const { password: _, ...userData } = user;

  return {
    status: 200,
    success: true,
    message: "Login successful.",
    token,
    data: userData,
  };
};
