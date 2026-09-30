'use client';

import { useState, useTransition, use, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { registerSchema } from '@/lib/validations/auth';
import { registerAction } from './actions';
import { Link } from '@/i18n/routing';
import SiteHeader from '@/components/SiteHeader';

function RegisterForm({ locale }: { locale: string }) {
  const t = useTranslations('RegisterPage');

  // Pre-select the role from the landing page's "I'm a student" / "I'm
  // hiring" buttons (e.g. /register?role=employer), defaulting to student.
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'employer' ? 'employer' : 'student';

  const [role, setRole] = useState<'student' | 'employer'>(initialRole);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [universityId, setUniversityId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const formData = {
    role,
    first_name: firstName,
    last_name: lastName,
    university_id: role === 'student' ? universityId : undefined,
    email,
    password,
    confirm_password: confirmPassword
  };

  const validationResult = registerSchema.safeParse(formData);
  const fieldErrors = !validationResult.success ? validationResult.error.flatten().fieldErrors : {};

  const isFormValid = validationResult.success;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      first_name: true,
      last_name: true,
      university_id: true,
      email: true,
      password: true,
      confirm_password: true
    });

    if (!isFormValid) return;

    setGeneralError(null);
    startTransition(async () => {
      const res = await registerAction(locale, formData);
      if (res && !res.success) {
        setGeneralError(res.generalError || t('errors.general'));
      }
    });
  };

  const inputClass =
    'rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:ring-2 focus:ring-violet-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100';

  return (
    <div className="bg-grid relative flex min-h-screen flex-col overflow-hidden bg-white dark:bg-black">
      <SiteHeader locale={locale} />

      <div className="relative flex flex-1 items-center justify-center px-6 py-16">
        <div className="bg-glow-blue pointer-events-none absolute -top-24 right-1/3 h-[30rem] w-[30rem] rounded-full blur-3xl" />

        <div className="relative w-full max-w-md rounded-3xl border border-zinc-200 bg-white/90 p-8 shadow-xl shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
          <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
              {t('title')}
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('subtitle')}</p>
          </div>

          {generalError && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Role Toggle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t('role')}</label>
              <div className="grid grid-cols-2 gap-2 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`rounded-md py-2 text-sm font-medium transition-all ${
                    role === 'student'
                      ? 'bg-white text-black shadow-sm dark:bg-zinc-900 dark:text-zinc-50'
                      : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  {t('student')}
                </button>
                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={`rounded-md py-2 text-sm font-medium transition-all ${
                    role === 'employer'
                      ? 'bg-white text-black shadow-sm dark:bg-zinc-900 dark:text-zinc-50'
                      : 'text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  {t('employer')}
                </button>
              </div>
            </div>

            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {t('firstName')}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() => handleBlur('first_name')}
                className={inputClass}
              />
              {touched.first_name && fieldErrors.first_name?.[0] && (
                <span className="text-xs text-red-500">{t(`errors.${fieldErrors.first_name[0]}`)}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {t('lastName')}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={() => handleBlur('last_name')}
                className={inputClass}
              />
              {touched.last_name && fieldErrors.last_name?.[0] && (
                <span className="text-xs text-red-500">{t(`errors.${fieldErrors.last_name[0]}`)}</span>
              )}
            </div>

            {/* University ID (Student Only) */}
            {role === 'student' && (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {t('universityId')}
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                  onBlur={() => handleBlur('university_id')}
                  className={inputClass}
                />
                {touched.university_id && fieldErrors.university_id?.[0] && (
                  <span className="text-xs text-red-500">{t(`errors.${fieldErrors.university_id[0]}`)}</span>
                )}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t('email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                className={inputClass}
              />
              {touched.email && fieldErrors.email?.[0] && (
                <span className="text-xs text-red-500">{t(`errors.${fieldErrors.email[0]}`)}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {t('password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                className={inputClass}
              />
              {touched.password && fieldErrors.password?.[0] && (
                <span className="text-xs text-red-500">{t(`errors.${fieldErrors.password[0]}`)}</span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {t('confirmPassword')}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur('confirm_password')}
                className={inputClass}
              />
              {touched.confirm_password && fieldErrors.confirm_password?.[0] && (
                <span className="text-xs text-red-500">
                  {t(`errors.${fieldErrors.confirm_password[0]}`)}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isPending}
              className="mt-2 flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 font-medium text-white shadow-sm shadow-violet-600/30 transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {isPending ? '...' : t('submit')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            {t('haveAccount')}{' '}
            <Link href="/login" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
              {t('loginLink')}
            </Link>
          </p>

          <p className="mt-3 text-center text-sm">
            <Link href="/" className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-200">
              {t('backHome')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <Suspense fallback={null}>
      <RegisterForm locale={locale} />
    </Suspense>
  );
}
