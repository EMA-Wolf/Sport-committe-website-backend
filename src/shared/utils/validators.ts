/**
 * Validates that a payload contains all required fields
 * @param payload - The payload to validate
 * @param requiredFields - Array of required field names
 * @throws Error if any required fields are missing
 */
export const validatePayload = (payload: any, requiredFields: string[]): void => {
  const missingFields = requiredFields.filter(field => {
    const value = payload[field];
    return value === undefined || value === null || value === '';
  });
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
};

/**
 * Validates that an ID is valid
 * @param id - The ID to validate
 * @returns True if valid, false otherwise
 */
export const validateId = (id: string): boolean => {
  return typeof id === 'string' && id.length > 0;
};

/**
 * Validates email format
 * @param email - The email to validate
 * @returns True if valid email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

