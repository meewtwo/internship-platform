import { z } from 'zod';

const nameRegex = /^[\p{L}\s\-]+$/u;

export const registerSchema = z.object({
  role: z.enum(['student', 'employer']),
  first_name: z
    .string()
    .min(1, { message: 'firstNameRequired' })
    .regex(nameRegex, { message: 'firstNameInvalid' }),
  last_name: z
    .string()
    .min(1, { message: 'lastNameRequired' })
    .regex(nameRegex, { message: 'lastNameInvalid' }),
  // Not every university uses a numeric student ID, so this is a free-text,
  // optional field — just capped at a sane length.
  university_id: z.string().max(30, { message: 'universityIdInvalid' }).optional(),
  email: z
    .string()
    .min(1, { message: 'emailRequired' })
    .email({ message: 'emailInvalid' }),
  password: z
    .string()
    .min(8, { message: 'passwordMin' }),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
  message: 'passwordsMismatch',
  path: ['confirm_password'],
});

export type RegisterInput = z.infer<typeof registerSchema>;
