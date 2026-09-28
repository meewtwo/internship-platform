'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function verifyOtpAction(locale: string, email: string, token: string) {
  if (!email || !token || token.length !== 6) {
    return { success: false, error: 'codeInvalid' };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup',
  });

  if (error || !data.user) {
    return { success: false, error: error?.message || 'wrongOrExpired' };
  }

  const user = data.user;
  const { role, first_name, last_name, university_id } = user.user_metadata || {};

  const { error: profileError } = await supabase.from('profiles').upsert({
    id: user.id,
    email: user.email,
    role: role || 'student',
    first_name: first_name || '',
    last_name: last_name || '',
    university_id: role === 'student' ? university_id : null,
    updated_at: new Date().toISOString(),
  });

  if (profileError) {
    console.error('Profile creation error:', profileError);
  }

  redirect(`/${locale}/dashboard`);
}

export async function resendOtpAction(email: string) {
  if (!email) return { success: false };

  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
