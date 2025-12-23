// Validation helper to parse backend validation tags and validate field values
// This mirrors the validation logic from the Go backend

export interface ValidationRules {
  required?: boolean;
  requiredMessage?: string;
  minlength?: number;
  minlengthMessage?: string;
  maxlength?: number;
  maxlengthMessage?: string;
  min?: number;
  minMessage?: string;
  max?: number;
  maxMessage?: string;
  email?: boolean;
  phone?: boolean;
  url?: boolean;
  creditcard?: boolean;
  alphanumeric?: boolean;
  alpha?: boolean;
  numeric?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  pattern?: string;
  positive?: boolean;
  negative?: boolean;
  minDate?: string;
  minDateMessage?: string;
  maxDate?: string;
  maxDateMessage?: string;
  enum?: string[];
  unique?: boolean;
  auto?: boolean;
}

/**
 * Parse validation rules from a backend tag string
 * Supports both formats:
 * - "required,minlength=5,maxlength=20,email"
 * - "validate:\"required,email\""
 */
export function parseValidationRules(tag?: string): ValidationRules {
  if (!tag) return {};
  
  const rules: ValidationRules = {};
  
  // Check if tag has validate:"..." format
  let tagContent = tag;
  const validateMatch = tag.match(/validate:\s*"([^"]+)"/);
  if (validateMatch) {
    tagContent = validateMatch[1];
  } else {
    // Also try without quotes
    const validateMatch2 = tag.match(/validate:\s*([^,]+)/);
    if (validateMatch2) {
      tagContent = validateMatch2[1].replace(/\\/g, '');
    }
  }
  
  const parts = tagContent.split(',').map(part => part.trim());
  
  for (const part of parts) {
    // Auto field (skip required validation)
    if (part.includes('auto')) {
      rules.auto = true;
      continue;
    }
    
    // Required field
    if (part.includes('required')) {
      rules.required = true;
      const message = extractMessage(part, 'requiredMessage');
      if (message) rules.requiredMessage = message;
      continue;
    }
    
    // Length constraints
    if (part.includes('minlength=')) {
      const { value, message } = extractValueAndMessage(part, 'minlength', 'minlengthMessage');
      if (value !== null) rules.minlength = value;
      if (message) rules.minlengthMessage = message;
      continue;
    }
    
    if (part.includes('maxlength=')) {
      const { value, message } = extractValueAndMessage(part, 'maxlength', 'maxlengthMessage');
      if (value !== null) rules.maxlength = value;
      if (message) rules.maxlengthMessage = message;
      continue;
    }
    
    // Numeric constraints
    if (part.includes('min=')) {
      const { value, message } = extractValueAndMessage(part, 'min', 'minMessage');
      if (value !== null) rules.min = value;
      if (message) rules.minMessage = message;
      continue;
    }
    
    if (part.includes('max=')) {
      const { value, message } = extractValueAndMessage(part, 'max', 'maxMessage');
      if (value !== null) rules.max = value;
      if (message) rules.maxMessage = message;
      continue;
    }
    
    // Date constraints
    if (part.includes('minDate=')) {
      const dateStr = extractDateValue(part, 'minDate');
      if (dateStr) rules.minDate = dateStr;
      const message = extractMessage(part, 'minDateMessage');
      if (message) rules.minDateMessage = message;
      continue;
    }
    
    if (part.includes('maxDate=')) {
      const dateStr = extractDateValue(part, 'maxDate');
      if (dateStr) rules.maxDate = dateStr;
      const message = extractMessage(part, 'maxDateMessage');
      if (message) rules.maxDateMessage = message;
      continue;
    }
    
    // Enum validation
    if (part.includes('enum=')) {
      const enumStr = part.split('enum=')[1];
      if (enumStr) {
        const cleaned = enumStr.replace(/\\/g, '').replace(/"/g, '');
        rules.enum = cleaned.split('|');
      }
      continue;
    }
    
    // Format validations (boolean flags)
    if (part.includes('email')) rules.email = true;
    if (part.includes('phone')) rules.phone = true;
    if (part.includes('url')) rules.url = true;
    if (part.includes('creditcard')) rules.creditcard = true;
    if (part.includes('alphanumeric')) rules.alphanumeric = true;
    if (part.includes('alpha')) rules.alpha = true;
    if (part.includes('numeric')) rules.numeric = true;
    if (part.includes('lowercase')) rules.lowercase = true;
    if (part.includes('uppercase')) rules.uppercase = true;
    if (part.includes('positive')) rules.positive = true;
    if (part.includes('negative')) rules.negative = true;
    if (part.includes('unique')) rules.unique = true;
    
    // Pattern validation
    if (part.includes('pattern=')) {
      const patternStr = extractPatternValue(part);
      if (patternStr) rules.pattern = patternStr;
    }
  }
  
  // If auto is set, remove required
  if (rules.auto) {
    delete rules.required;
    delete rules.requiredMessage;
  }
  
  return rules;
}

/**
 * Extract a numeric value and optional message from a tag part
 */
function extractValueAndMessage(
  part: string,
  key: string,
  messageKey: string
): { value: number | null; message?: string } {
  let value: number | null = null;
  let message: string | undefined;
  
  const keyIndex = part.indexOf(`${key}=`);
  if (keyIndex !== -1) {
    let valueStr = part.substring(keyIndex + key.length + 1);
    valueStr = valueStr.replace(/"/g, '').trim();
    
    // Find end of value (comma or end of string)
    const commaIndex = valueStr.indexOf(',');
    if (commaIndex !== -1) {
      valueStr = valueStr.substring(0, commaIndex);
    }
    
    const parsed = parseInt(valueStr, 10);
    if (!isNaN(parsed)) {
      value = parsed;
    }
  }
  
  message = extractMessage(part, messageKey);
  
  return { value, message };
}

/**
 * Extract a message value from a tag part
 */
function extractMessage(part: string, messageKey: string): string | undefined {
  const keyIndex = part.indexOf(`${messageKey}=`);
  if (keyIndex !== -1) {
    let messageStr = part.substring(keyIndex + messageKey.length + 1);
    messageStr = messageStr.replace(/^"/, '').replace(/"$/, '').trim();
    
    // Find end of message (comma or end of string)
    const commaIndex = messageStr.indexOf(',');
    if (commaIndex !== -1) {
      messageStr = messageStr.substring(0, commaIndex);
    }
    
    return messageStr;
  }
  return undefined;
}

/**
 * Extract a date value from a tag part
 */
function extractDateValue(part: string, key: string): string | undefined {
  const keyIndex = part.indexOf(`${key}=`);
  if (keyIndex !== -1) {
    let dateStr = part.substring(keyIndex + key.length + 1);
    dateStr = dateStr.replace(/"/g, '').trim();
    
    // Find end of date (comma or end of string)
    const commaIndex = dateStr.indexOf(',');
    if (commaIndex !== -1) {
      dateStr = dateStr.substring(0, commaIndex);
    }
    
    return dateStr;
  }
  return undefined;
}

/**
 * Extract a pattern value from a tag part
 */
function extractPatternValue(part: string): string | undefined {
  const keyIndex = part.indexOf('pattern=');
  if (keyIndex !== -1) {
    let patternStr = part.substring(keyIndex + 'pattern='.length);
    patternStr = patternStr.replace(/^"/, '').replace(/"$/, '').trim();
    
    // Find end of pattern (comma or end of string)
    const commaIndex = patternStr.indexOf(',');
    if (commaIndex !== -1) {
      patternStr = patternStr.substring(0, commaIndex);
    }
    
    return patternStr;
  }
  return undefined;
}

/**
 * Validate a field value against validation rules
 * Returns an error message if validation fails, null if valid
 */
export function validateField(
  value: any,
  rules: ValidationRules,
  fieldType: string
): string | null {
  // Check required
  if (rules.required && (value === null || value === undefined || value === '')) {
    return rules.requiredMessage || 'This field is required';
  }
  
  // If value is empty and not required, skip other validations
  if (value === null || value === undefined || value === '') {
    return null;
  }
  
  const stringValue = String(value);
  
  // String validations
  if (fieldType === 'string' || fieldType === 'text') {
    // Length constraints
    if (rules.minlength !== undefined && stringValue.length < rules.minlength) {
      return rules.minlengthMessage || `Minimum length is ${rules.minlength} characters`;
    }
    
    if (rules.maxlength !== undefined && stringValue.length > rules.maxlength) {
      return rules.maxlengthMessage || `Maximum length is ${rules.maxlength} characters`;
    }
    
    // Email validation
    if (rules.email) {
      const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(stringValue)) {
        return 'Please enter a valid email address';
      }
    }
    
    // Phone validation
    if (rules.phone) {
      const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(stringValue)) {
        return 'Please enter a valid phone number';
      }
    }
    
    // URL validation
    if (rules.url) {
      try {
        const url = new URL(stringValue);
        if (!url.protocol || !url.host) {
          return 'Please enter a valid URL';
        }
      } catch {
        return 'Please enter a valid URL';
      }
    }
    
    // Credit card validation (Luhn algorithm)
    if (rules.creditcard) {
      const cleaned = stringValue.replace(/[\s-]/g, '');
      if (!isValidCreditCard(cleaned)) {
        return 'Please enter a valid credit card number';
      }
    }
    
    // Alphanumeric validation
    if (rules.alphanumeric) {
      const alphanumericRegex = /^[a-zA-Z0-9]+$/;
      if (!alphanumericRegex.test(stringValue)) {
        return 'Only alphanumeric characters are allowed';
      }
    }
    
    // Alpha validation (letters only)
    if (rules.alpha) {
      const alphaRegex = /^[a-zA-Z]+$/;
      if (!alphaRegex.test(stringValue)) {
        return 'Only alphabetic characters are allowed';
      }
    }
    
    // Numeric validation (digits only)
    if (rules.numeric) {
      const numericRegex = /^[0-9]+$/;
      if (!numericRegex.test(stringValue)) {
        return 'Only numeric characters are allowed';
      }
    }
    
    // Lowercase validation
    if (rules.lowercase) {
      if (stringValue !== stringValue.toLowerCase()) {
        return 'Value must be in lowercase';
      }
    }
    
    // Uppercase validation
    if (rules.uppercase) {
      if (stringValue !== stringValue.toUpperCase()) {
        return 'Value must be in uppercase';
      }
    }
    
    // Pattern validation
    if (rules.pattern) {
      try {
        const regex = new RegExp(rules.pattern);
        if (!regex.test(stringValue)) {
          return 'Value does not match the required pattern';
        }
      } catch {
        return 'Invalid pattern validation';
      }
    }
  }
  
  // Numeric validations
  if (fieldType === 'number' || fieldType === 'int' || fieldType === 'float' || fieldType === 'decimal') {
    const numValue = typeof value === 'number' ? value : parseFloat(stringValue);
    
    if (isNaN(numValue)) {
      return 'Please enter a valid number';
    }
    
    // Min/Max constraints
    if (rules.min !== undefined && numValue < rules.min) {
      return rules.minMessage || `Minimum value is ${rules.min}`;
    }
    
    if (rules.max !== undefined && numValue > rules.max) {
      return rules.maxMessage || `Maximum value is ${rules.max}`;
    }
    
    // Positive validation
    if (rules.positive && numValue <= 0) {
      return 'Value must be positive';
    }
    
    // Negative validation
    if (rules.negative && numValue >= 0) {
      return 'Value must be negative';
    }
  }
  
  // Date validations
  if (fieldType === 'date') {
    let dateValue: Date;
    
    if (value instanceof Date) {
      dateValue = value;
    } else {
      dateValue = new Date(stringValue);
    }
    
    if (isNaN(dateValue.getTime())) {
      return 'Please enter a valid date';
    }
    
    // Normalize to date only (no time)
    const normalizedDate = new Date(
      dateValue.getFullYear(),
      dateValue.getMonth(),
      dateValue.getDate()
    );
    
    if (rules.minDate) {
      const minDate = new Date(rules.minDate);
      if (normalizedDate < minDate) {
        return rules.minDateMessage || `Date must be on or after ${rules.minDate}`;
      }
    }
    
    if (rules.maxDate) {
      const maxDate = new Date(rules.maxDate);
      if (normalizedDate > maxDate) {
        return rules.maxDateMessage || `Date must be on or before ${rules.maxDate}`;
      }
    }
  }
  
  // Enum validation
  if (rules.enum && rules.enum.length > 0) {
    if (!rules.enum.includes(stringValue)) {
      return `Value must be one of: ${rules.enum.join(', ')}`;
    }
  }
  
  // Array validations
  if (Array.isArray(value)) {
    if (rules.minlength !== undefined && value.length < rules.minlength) {
      return rules.minlengthMessage || `Minimum ${rules.minlength} items required`;
    }
    
    if (rules.maxlength !== undefined && value.length > rules.maxlength) {
      return rules.maxlengthMessage || `Maximum ${rules.maxlength} items allowed`;
    }
  }
  
  return null;
}

/**
 * Check if a field is required based on its tag
 */
export function isFieldRequired(tag?: string): boolean {
  if (!tag) return false;
  const rules = parseValidationRules(tag);
  return rules.required === true;
}

/**
 * Get field constraints for use in input components
 */
export function getFieldConstraints(tag?: string) {
  const rules = parseValidationRules(tag);
  return {
    required: rules.required,
    minLength: rules.minlength,
    maxLength: rules.maxlength,
    min: rules.min,
    max: rules.max,
    pattern: rules.pattern,
  };
}

/**
 * Luhn algorithm for credit card validation
 */
function isValidCreditCard(cardNumber: string): boolean {
  if (!/^\d+$/.test(cardNumber)) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
}
