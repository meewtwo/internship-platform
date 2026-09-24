'use client';

import { useState, useTransition, use } from 'react';
import { useTranslations } from 'next-intl';
import { loginAction } from './actions';
import { Link } from '@/i18n/routing';

export default function LoginPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const t = useTranslations('LoginPage');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [unconfirmedEmail, setUnconfirmedEmail] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorKey(null);
    setUnconfirmedEmail(null);

    startTransition(async () => {
      const res = await loginAction(locale, { email, password });
      if (res && !res.success) {
        setErrorKey(res.error || 'general');
        if (res.error === 'emailNotConfirmed' && res.email) {
          setUnconfirmedEmail(res.email);
        }
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

        {errorKey && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 rounded-lg flex flex-col gap-2">
            <span>{t(`errors.${errorKey}`)}</span>
            {errorKey === 'emailNotConfirmed' && unconfirmedEmail && (
              <Link
                href={`/verify?email=${encodeURIComponent(unconfirmedEmail)}`}
                className="text-xs font-medium underline hover:opacity-80"
              >
                {t('verifyLink')}
              </Link>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {t('email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {t('password')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 flex h-11 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50"
          >
            {isPending ? '...' : t('submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
