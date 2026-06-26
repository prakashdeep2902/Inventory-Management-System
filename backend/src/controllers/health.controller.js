import prisma from "../config/prisma.js";

export const healthCheck = async (req, res) => {
  try {
    const userCount = await prisma.user.count();

    res.status(200).json({
      success: true,
      message: "Server and database are connected successfully.",
      data: {
        users: userCount,
      },
    });
  } catch (error) {
    console.error("Health Check Error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed.",
      error: error.message,
    });
  }
};
