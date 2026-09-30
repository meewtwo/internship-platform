'use client';

import { Link, usePathname } from '@/i18n/routing';

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'kk', label: 'KZ' }
] as const;

// Small pill switcher used in the site header. Keeps the visitor on the
// same page, just re-rendered in the other language.
export default function LocaleSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-zinc-200 bg-white/70 p-1 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      {LOCALES.map(({ code, label }) => (
        <Link
          key={code}
          href={pathname}
          locale={code}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            locale === code
              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
