import { z } from 'zod';

// Auth validation schemas
export const emailSchema = z
  .string()
  .email('Invalid email address')
  .min(1, 'Email is required')
  .max(254, 'Email too long');

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(128, 'Password too long');

export const confirmPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(100, 'Name too long')
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Name contains invalid characters');

// Auth forms validation
export const signUpSchema = z
  .object({
    fullName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// Onboarding validation
export const onboardingDataSchema = z.object({
  adhd_type: z.string().optional(),
  notification_style: z.string().optional(),
  energy_pattern: z.string().optional(),
  focus_preference: z.string().optional(),
  selected_goal: z.string().optional(),
});

// Profile validation
export const profileUpdateSchema = z.object({
  full_name: nameSchema.optional(),
  avatar_url: z.string().url('Invalid avatar URL').optional().nullable(),
  preferences: z
    .object({
      notifications: z.boolean(),
      darkMode: z.boolean(),
      reminders: z.boolean(),
      accessibility: z.boolean(),
    })
    .optional()
    .nullable(),
});

// Data sanitization utilities
export function sanitizeInput(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validation helper functions
export function validateSignUp(
  fullName: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  try {
    return signUpSchema.parse({
      fullName: sanitizeInput(fullName),
      email: sanitizeInput(email),
      password,
      confirmPassword,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error[0].message);
    }
    throw error;
  }
}

export function validateSignIn(email: string, password: string) {
  try {
    return signInSchema.parse({
      email: sanitizeInput(email),
      password,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error[0].message);
    }
    throw error;
  }
}

export function validateEmail(email: string) {
  try {
    return emailSchema.parse(sanitizeInput(email));
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error[0].message);
    }
    throw error;
  }
}

export function validatePassword(password: string) {
  try {
    return passwordSchema.parse(password);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error[0].message);
    }
    throw error;
  }
}

export function validateName(name: string) {
  try {
    return nameSchema.parse(sanitizeInput(name));
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error[0].message);
    }
    throw error;
  }
}

export function validateOnboardingData(data: any) {
  try {
    return onboardingDataSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error[0].message);
    }
    throw error;
  }
}

export function validateProfileUpdate(profile: any) {
  try {
    return profileUpdateSchema.parse(profile);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error[0].message);
    }
    throw error;
  }
}

// Rate limiting utility for client-side
export class ClientRateLimiter {
  private requests: Map<string, number[]> = new Map();

  constructor(
    private maxRequests: number = 5,
    private windowMs: number = 60000 // 1 minute
  ) {}

  canMakeRequest(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    const userRequests = this.requests.get(identifier) || [];
    const validRequests = userRequests.filter((time) => time > windowStart);

    if (validRequests.length >= this.maxRequests) {
      return false;
    }

    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }

  getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    const userRequests = this.requests.get(identifier) || [];
    const validRequests = userRequests.filter((time) => time > windowStart);

    return Math.max(0, this.maxRequests - validRequests.length);
  }
}
