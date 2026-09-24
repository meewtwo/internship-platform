'use client';

import { useState, useTransition, use } from 'react';
import { useTranslations } from 'next-intl';
import { registerSchema } from '@/lib/validations/auth';
import { registerAction } from './actions';

export default function RegisterPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = useTranslations('RegisterPage');

  const [role, setRole] = useState<'student' | 'employer'>('student');
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
    confirm_password: confirmPassword,
  };

  const validationResult = registerSchema.safeParse(formData);
  const fieldErrors = !validationResult.success
    ? validationResult.error.flatten().fieldErrors
    : {};

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
      confirm_password: true,
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

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black p-6">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
            {t('title')}
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t('subtitle')}
          </p>
        </div>

        {generalError && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 rounded-lg">
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Role Toggle */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {t('role')}
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-2 text-sm font-medium rounded-md transition-all ${
                  role === 'student'
                    ? 'bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200'
                }`}
              >
                {t('student')}
              </button>
              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`py-2 text-sm font-medium rounded-md transition-all ${
                  role === 'employer'
                    ? 'bg-white dark:bg-zinc-900 text-black dark:text-zinc-50 shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200'
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
              className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
            {touched.first_name && fieldErrors.first_name?.[0] && (
              <span className="text-xs text-red-500">
                {t(`errors.${fieldErrors.first_name[0]}`)}
              </span>
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
              className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
            {touched.last_name && fieldErrors.last_name?.[0] && (
              <span className="text-xs text-red-500">
                {t(`errors.${fieldErrors.last_name[0]}`)}
              </span>
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
                maxLength={9}
                value={universityId}
                onChange={(e) => setUniversityId(e.target.value.replace(/\D/g, ''))}
                onBlur={() => handleBlur('university_id')}
                className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
              {touched.university_id && fieldErrors.university_id?.[0] && (
                <span className="text-xs text-red-500">
                  {t(`errors.${fieldErrors.university_id[0]}`)}
                </span>
              )}
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {t('email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
            {touched.email && fieldErrors.email?.[0] && (
              <span className="text-xs text-red-500">
                {t(`errors.${fieldErrors.email[0]}`)}
              </span>
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
              className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
            {touched.password && fieldErrors.password?.[0] && (
              <span className="text-xs text-red-500">
                {t(`errors.${fieldErrors.password[0]}`)}
              </span>
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
              className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
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
            className="mt-2 flex h-11 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? '...' : t('submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
