import { z } from 'zod';

export const internshipSchema = z.object({
  title: z.string().min(3, { message: 'titleRequired' }),
  company: z.string().min(1, { message: 'companyRequired' }),
  city: z.string().min(1, { message: 'cityRequired' }),
  format: z.enum(['onsite', 'remote', 'hybrid']),
  paid: z.boolean(),
  durationWeeks: z.coerce
    .number()
    .int()
    .min(1, { message: 'durationInvalid' })
    .max(52, { message: 'durationInvalid' }),
  skills: z.array(z.string()).min(1, { message: 'skillsRequired' }),
  description: z.string().min(20, { message: 'descriptionMin' })
});

export type InternshipInput = z.infer<typeof internshipSchema>;

export const applicationSchema = z.object({
  note: z.string().min(10, { message: 'noteMin' }).max(600, { message: 'noteMax' })
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
