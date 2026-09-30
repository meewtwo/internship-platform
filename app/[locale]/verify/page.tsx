'use client';

import { useState, useTransition, useEffect, use, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { verifyOtpAction, resendOtpAction } from './actions';

function VerifyContent({ locale }: { locale: string }) {
  const t = useTranslations('VerifyPage');
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(60);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError(t('errors.codeInvalid'));
      return;
    }

    setError(null);
    startTransition(async () => {
      const res = await verifyOtpAction(locale, email, code);
      if (res && !res.success) {
        setError(t(`errors.${res.error}`) || res.error || t('errors.general'));
      }
    });
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setError(null);
    setSuccessMessage(null);

    const res = await resendOtpAction(email);
    if (res.success) {
      setSuccessMessage(t('resendSuccess'));
      setCooldown(60);
    } else {
      setError(res.error || t('errors.general'));
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black p-6">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
            {t('title')}
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t('instruction', { email })}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400 rounded-lg">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {t('codeLabel')}
            </label>
            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              className="px-3 py-3 text-center tracking-widest text-lg font-mono rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <button
            type="submit"
            disabled={code.length !== 6 || isPending}
            className="mt-2 flex h-11 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? '...' : t('verify')}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0}
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {cooldown > 0 ? t('resendIn', { seconds: cooldown }) : t('resend')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <Suspense fallback={<div className="flex flex-1 items-center justify-center">Loading...</div>}>
      <VerifyContent locale={locale} />
    </Suspense>
  );
}
