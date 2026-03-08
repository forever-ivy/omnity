import { ApiResponse, PaginatedResponse } from "../types/api";
import { CreateUserRequest, GetUsersParams, UpdateUserRequest, User } from "../types/user";
import { http } from "./http";

export class UserService {
  private readonly baseUrl = "/api/users";

  async getUsers(
    params?: GetUsersParams,
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    return http.get<PaginatedResponse<User>>(this.baseUrl, params);
  }

  async createUser(data:CreateUserRequest):Promise<User>{
    const response = await http.post<User>(this.baseUrl,data);
    return response.data;
  }

  async updateUser(id:number,data:UpdateUserRequest):Promise<User>{
    const response = await http.put<User>(`${this.baseUrl}/${id}`,data);
    return response.data;
  }

  async deleteUser(id:number):Promise<void>{
    await http.delete<void>(`${this.baseUrl}/${id}`);
  }

}

export const userService = new UserService();