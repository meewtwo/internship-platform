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
    const friendlyMessage = mapSupabaseError(error.message);
    return { success: false, generalError: friendlyMessage };
  }

  redirect(`/${locale}/verify?email=${encodeURIComponent(email)}`);
}

function mapSupabaseError(message: string): string {
  const lower = message.toLowerCase();

  if (
    lower.includes('check_first_name_no_numbers') ||
    lower.includes('check_first_name_length')
  ) {
    return 'First name must be at least 2 characters and contain no numbers';
  }

  if (
    lower.includes('check_last_name_no_numbers') ||
    lower.includes('check_last_name_length')
  ) {
    return 'Last name must be at least 2 characters and contain no numbers';
  }

  if (lower.includes('check_email_format')) {
    return 'Please enter a valid email address';
  }

  if (lower.includes('check_student_email_matches_id')) {
    return 'Student email must strictly match your university ID and @sdu.edu.kz domain';
  }

  if (lower.includes('check_role_university_logic')) {
    return 'Students must provide a university ID, and employers must leave it empty';
  }

  if (lower.includes('users_university_id_key') || lower.includes('unique')) {
    return 'This university ID or email is already registered';
  }

  return message;
}
