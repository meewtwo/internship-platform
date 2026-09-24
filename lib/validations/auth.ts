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
  university_id: z.string().optional(),
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
}).refine((data) => {
  if (data.role === 'student') {
    return /^\d{9}$/.test(data.university_id || '');
  }
  return true;
}, {
  message: 'universityIdInvalid',
  path: ['university_id'],
});

export type RegisterInput = z.infer<typeof registerSchema>;
