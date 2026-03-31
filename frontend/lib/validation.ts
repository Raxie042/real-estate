import { useState } from 'react';

// Form validation utilities

export const validators = {
  email: (value: string): string | null => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Invalid email address';
    return null;
  },

  password: (value: string): string | null => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
    return null;
  },

  phone: (value: string): string | null => {
    if (!value) return null; // Phone is optional
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(value)) return 'Invalid phone number';
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10) return 'Phone number must be at least 10 digits';
    return null;
  },

  required: (value: any): string | null => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return null;
  },

  minLength: (min: number) => (value: string): string | null => {
    if (!value || value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (max: number) => (value: string): string | null => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return null;
  },

  number: (value: string): string | null => {
    if (!value) return 'Number is required';
    if (isNaN(Number(value))) return 'Must be a valid number';
    return null;
  },

  positiveNumber: (value: string | number): string | null => {
    const num = Number(value);
    if (isNaN(num)) return 'Must be a valid number';
    if (num <= 0) return 'Must be greater than zero';
    return null;
  },

  url: (value: string): string | null => {
    if (!value) return null; // URL is optional
    try {
      new URL(value);
      return null;
    } catch {
      return 'Invalid URL';
    }
  },

  zipCode: (value: string): string | null => {
    if (!value) return 'ZIP code is required';
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(value)) return 'Invalid ZIP code (use 12345 or 12345-6789)';
    return null;
  },

  currency: (value: string | number): string | null => {
    const num = Number(value);
    if (isNaN(num)) return 'Must be a valid amount';
    if (num < 0) return 'Amount cannot be negative';
    return null;
  },
};

// Compose multiple validators
export function composeValidators(...validators: Array<(value: any) => string | null>) {
  return (value: any): string | null => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };
}

// Validate entire form object
export function validateForm<T extends Record<string, any>>(
  values: T,
  rules: Partial<Record<keyof T, (value: any) => string | null>>
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const field in rules) {
    const validator = rules[field];
    if (validator) {
      const error = validator(values[field]);
      if (error) {
        errors[field] = error;
      }
    }
  }

  return errors;
}

// Hook for form validation
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  rules: Partial<Record<keyof T, (value: any) => string | null>>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validate = (fieldName?: keyof T) => {
    if (fieldName) {
      const validator = rules[fieldName];
      if (validator) {
        const error = validator(values[fieldName]);
        setErrors((prev) => ({ ...prev, [fieldName]: error || undefined }));
        return !error;
      }
      return true;
    } else {
      const newErrors = validateForm(values, rules);
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
  };

  const handleChange = (field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      // Validate on change only if field has been touched
      const validator = rules[field];
      if (validator) {
        const error = validator(value);
        setErrors((prev) => ({ ...prev, [field]: error || undefined }));
      }
    }
  };

  const handleBlur = (field: keyof T) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate(field);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setValues,
  };
}
