import { ValidationError } from "../types/errors";

/**
 * Validates email format using standard regex pattern
 * @param email - Email address to validate
 * @returns true if valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * @param password - Password to validate
 * @returns true if valid, false otherwise
 */
export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

/**
 * Sanitizes user input by removing potentially dangerous characters
 * @param input - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

/**
 * Validates email and throws ValidationError if invalid
 * @param email - Email to validate
 * @throws ValidationError if email is invalid
 */
export function assertValidEmail(email: string): void {
  if (!email || !validateEmail(email)) {
    throw new ValidationError("Invalid email format", "email");
  }
}

/**
 * Validates password and throws ValidationError if invalid
 * @param password - Password to validate
 * @throws ValidationError if password is invalid
 */
export function assertValidPassword(password: string): void {
  if (!password || !validatePassword(password)) {
    throw new ValidationError(
      "Password must be at least 8 characters long",
      "password"
    );
  }
}

/**
 * Validates that a string is not empty
 * @param value - String to validate
 * @param fieldName - Name of the field for error message
 * @throws ValidationError if value is empty
 */
export function assertNotEmpty(value: string, fieldName: string): void {
  if (!value || value.trim().length === 0) {
    throw new ValidationError(`${fieldName} cannot be empty`, fieldName);
  }
}
