'use client';

import { useState, useTransition, use } from 'react';
import { useTranslations } from 'next-intl';
import { loginAction } from './actions';
import { Link } from '@/i18n/routing';
import SiteHeader from '@/components/SiteHeader';

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
    <div className="bg-grid relative flex min-h-screen flex-col overflow-hidden bg-white dark:bg-black">
      <SiteHeader locale={locale} />

      <div className="relative flex flex-1 items-center justify-center px-6 py-16">
        <div className="bg-glow-violet pointer-events-none absolute -top-24 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full blur-3xl" />

        <div className="relative w-full max-w-md rounded-3xl border border-zinc-200 bg-white/90 p-8 shadow-xl shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
          <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
              {t('title')}
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('subtitle')}</p>
          </div>

          {errorKey && (
            <div className="mb-4 flex flex-col gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
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
                className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:ring-2 focus:ring-violet-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
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
                className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:ring-2 focus:ring-violet-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="mt-2 flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 font-medium text-white shadow-sm shadow-violet-600/30 transition-transform hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isPending ? '...' : t('submit')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            {t('noAccount')}{' '}
            <Link href="/register" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
              {t('registerLink')}
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
