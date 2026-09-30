'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LocaleSwitcher from './LocaleSwitcher';

// Public top bar (landing, login, register): logo, language switcher, and
// the two auth actions. Signed-in pages use AppShell instead.
export default function SiteHeader({ locale }: { locale: string }) {
  const t = useTranslations('Nav');

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/70 backdrop-blur-md dark:border-zinc-800/70 dark:bg-black/50">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-black text-white">
            IM
          </span>
          InternMatch
        </Link>

        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} />
          <Link
            href="/login"
            className="hidden h-9 items-center rounded-full px-4 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 sm:flex dark:text-zinc-300 dark:hover:text-white"
          >
            {t('login')}
          </Link>
          <Link
            href="/register"
            className="flex h-9 items-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-sm shadow-violet-600/30 transition-transform hover:scale-[1.03]"
          >
            {t('register')}
          </Link>
        </div>
      </div>
    </header>
  );
}
