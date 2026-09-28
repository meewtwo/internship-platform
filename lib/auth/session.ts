import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export type Role = 'student' | 'employer';

export type SessionProfile = {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
};

// Fetches the current user + their `profiles` row, or sends them to /login.
// Every protected page calls this (or requireRole below) so the auth +
// role check lives in one place instead of being copy-pasted per page.
export async function requireProfile(locale: string): Promise<SessionProfile> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(`/${locale}/login`);
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('first_name, last_name, role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    redirect(`/${locale}/login`);
  }

  return {
    id: user.id,
    email: user.email ?? '',
    role: (profile.role as Role) ?? 'student',
    firstName: profile.first_name ?? '',
    lastName: profile.last_name ?? ''
  };
}

// Same as requireProfile, but also sends the user to /dashboard if their
// role isn't in the allowed list (e.g. a student opening /employer/new).
export async function requireRole(locale: string, allowed: Role[]): Promise<SessionProfile> {
  const profile = await requireProfile(locale);

  if (!allowed.includes(profile.role)) {
    redirect(`/${locale}/dashboard`);
  }

  return profile;
}
