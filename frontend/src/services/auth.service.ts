import axiosInstance from "@/lib/axios";
import { LoginRequest, LoginResponse } from "@/types/auth";

class AuthService {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      payload,
    );

    return response.data;
  }
}

const authService = new AuthService();

export default authService;
