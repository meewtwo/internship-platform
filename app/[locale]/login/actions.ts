'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function loginAction(locale: string, rawData: unknown) {
  const result = loginSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, error: 'general' };
  }

  const { email, password } = result.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.toLowerCase().includes('email not confirmed')) {
      return { success: false, error: 'emailNotConfirmed', email };
    }
    return { success: false, error: 'general' };
  }

  redirect(`/${locale}/dashboard`);
}
