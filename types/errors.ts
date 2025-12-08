/**
 * Custom error classes for better error handling and debugging
 */

/**
 * Base application error
 */
export class AppError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Authentication-related errors
 */
export class AuthError extends AppError {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Profile operation errors
 */
export class ProfileError extends AppError {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Input validation errors
 */
export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message);
  }
}

/**
 * Repository/database errors
 */
export class RepositoryError extends AppError {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}
