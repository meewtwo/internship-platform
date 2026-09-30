'use server';

import { registerSchema } from '@/lib/validations/auth';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function registerAction(locale: string, rawData: unknown) {
  const result = registerSchema.safeParse(rawData);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const { role, first_name, last_name, university_id, email, password } = result.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        first_name,
        last_name,
        university_id: role === 'student' ? university_id : null,
      },
    },
  });

  if (error) {
    return { success: false, generalError: error.message };
  }

  redirect(`/${locale}/verify?email=${encodeURIComponent(email)}`);
}
