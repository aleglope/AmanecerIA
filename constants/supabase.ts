/**
 * Supabase error codes and constants
 * @see https://postgrest.org/en/stable/errors.html
 */
export const SUPABASE_ERRORS = {
  /** Profile not found in database */
  PROFILE_NOT_FOUND: "PGRST116",
  /** Column does not exist in table */
  MISSING_COLUMN: "42703",
  /** Unique constraint violation */
  UNIQUE_VIOLATION: "23505",
} as const;

/**
 * Default user preferences
 */
export const DEFAULT_NOTIFICATION_PREFERENCES = {
  tone: "Amable",
  length: "Medio",
} as const;
