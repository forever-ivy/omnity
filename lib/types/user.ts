export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive';
  roleId: number;
  roleName: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  roleId: number;
  status?: 'active' | 'inactive';
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  roleId?: number;
  status?: 'active' | 'inactive';
  avatar?: string;
}

export interface GetUsersParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  status?: 'active' | 'inactive';
  roleId?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}