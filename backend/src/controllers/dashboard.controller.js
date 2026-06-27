import { getDashboardService } from "../services/dashboard.service.js";

export const getDashboard = async (req, res) => {
  try {
    const dashboard = await getDashboardService();

    return res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully.",
      data: dashboard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
