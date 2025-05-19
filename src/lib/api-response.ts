import { NextResponse } from 'next/server';

/**
 * 自定义 404 错误类
 */
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

/**
 * 验证错误类
 */
export class ValidationError extends Error {
  errors: string[];
  
  constructor(message: string, errors: string[]) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

/**
 * 响应数据接口
 */
export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

/**
 * 请求成功
 * @param message 成功信息
 * @param data 响应数据
 * @param code HTTP状态码
 */
export function success<T>(
  message?: string, 
  data?: T, 
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    status: true,
    message,
    data
  }, { status });
}

/**
 * 请求失败
 * @param error 错误对象
 */
export function failure(
  error: Error | ValidationError | NotFoundError
): NextResponse<ApiResponse<null>> {
  if (error instanceof ValidationError) {
    return NextResponse.json({
      status: false,
      message: 'request parameter error',
      errors: error.errors
    }, { status: 400 });
  }

  if (error instanceof NotFoundError) {
    return NextResponse.json({
      status: false,
      message: 'resource not found',
      errors: [error.message]
    }, { status: 404 });
  }

  // 默认服务器错误
  return NextResponse.json({
    status: false,
    message: 'server error',
    errors: [error.message]
  }, { status: 500 });
}
