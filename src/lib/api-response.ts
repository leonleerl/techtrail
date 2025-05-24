import { NextResponse } from 'next/server';

export class AlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AlreadyExistsError';
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Error {
  errors: string[];
  
  constructor(message: string, errors: string[]) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export interface PaginationMeta {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  data?: T;
  errors?: string[];
  meta?: PaginationMeta;
}

export function success<T>(
  message?: string, 
  data?: T, 
  status: number = 200,
  meta?: PaginationMeta
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    status: true,
    message,
    data,
    meta
  }, { status });
}

export function failure(
  error: Error | ValidationError | NotFoundError | AlreadyExistsError
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

  if (error instanceof AlreadyExistsError) {
    return NextResponse.json({
      status: false,
      message: 'resource already exists',
      errors: [error.message]
    }, { status: 409 });
  }

  return NextResponse.json({
    status: false,
    message: 'server error',
    errors: [error.message]
  }, { status: 500 });
}
