import { PaginatedResponse } from '@/lib/types/api';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';


// 模拟数据库操作（实际项目中应该使用真实的数据库）
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active' as const,
    roleId: 1,
    roleName: 'Admin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'active' as const,
    roleId: 2,
    roleName: 'User',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

// 创建用户验证 schema
const createUserSchema = z.object({
  name: z.string().min(1, '姓名不能为空').max(50, '姓名不能超过50个字符'),
  email: z.string().email('邮箱格式不正确'),
  password: z.string().min(6, '密码至少6位').max(20, '密码不能超过20位'),
  phone: z.string().optional(),
  roleId: z.number().int().positive('角色ID必须是正整数'),
  status: z.enum(['active', 'inactive']).optional().default('active'),
});

// 查询参数验证 schema
const getUsersParamsSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().int().positive()).optional().default(1),
  pageSize: z.string().transform(Number).pipe(z.number().int().positive().max(100)).optional().default(10),
  keyword: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  roleId: z.string().transform(Number).pipe(z.number().int().positive()).optional(),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    const validatedParams = getUsersParamsSchema.parse(params);

    // 实现搜索、过滤、排序、分页逻辑
    let filteredUsers = [...mockUsers];

    if (validatedParams.keyword) {
      const keyword = validatedParams.keyword.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
      );
    }

    // 分页处理
    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / validatedParams.pageSize);
    const startIndex = (validatedParams.page - 1) * validatedParams.pageSize;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + validatedParams.pageSize);

    const response: PaginatedResponse = {
      data: paginatedUsers,
      total,
      page: validatedParams.page,
      pageSize: validatedParams.pageSize,
      totalPages,
    };

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: '参数验证失败',
        errors: error.errors,
      }, { status: 400 });
    }
    return NextResponse.json({
      success: false,
      message: '获取用户列表失败',
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createUserSchema.parse(body);

    // 检查邮箱是否已存在
    const existingUser = mockUsers.find(user => user.email === validatedData.email);
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: '邮箱已存在',
      }, { status: 409 });
    }

    // 创建新用户
    const newUser = {
      id: mockUsers.length + 1,
      ...validatedData,
      roleName: validatedData.roleId === 1 ? 'Admin' : 'User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    return NextResponse.json({
      success: true,
      data: newUser,
      message: '用户创建成功',
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: '数据验证失败',
        errors: error.errors,
      }, { status: 400 });
    }
    return NextResponse.json({
      success: false,
      message: '创建用户失败',
    }, { status: 500 });
  }
}