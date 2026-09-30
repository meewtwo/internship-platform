'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LocaleSwitcher from './LocaleSwitcher';

type NavItem = { href: string; labelKey: string };

const STUDENT_NAV: NavItem[] = [
  { href: '/dashboard', labelKey: 'dashboard' },
  { href: '/internships', labelKey: 'internships' },
  { href: '/applications', labelKey: 'applications' },
  { href: '/profile', labelKey: 'profile' }
];

const EMPLOYER_NAV: NavItem[] = [
  { href: '/dashboard', labelKey: 'dashboard' },
  { href: '/employer', labelKey: 'myPostings' },
  { href: '/profile', labelKey: 'profile' }
];

// Shared shell for every signed-in page: top bar with role-aware nav,
// language switcher and logout, plus a centered content area.
export default function AppShell({
  locale,
  role,
  fullName,
  logoutAction,
  children
}: {
  locale: string;
  role: 'student' | 'employer';
  fullName: string;
  logoutAction: () => Promise<void>;
  children: React.ReactNode;
}) {
  const t = useTranslations('AppNav');
  const pathname = usePathname();
  const items = role === 'employer' ? EMPLOYER_NAV : STUDENT_NAV;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/70">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-sm font-black text-white">
              IM
            </span>
            InternMatch
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LocaleSwitcher locale={locale} />
            <span className="hidden max-w-[8rem] truncate text-sm text-zinc-600 sm:inline dark:text-zinc-400">
              {fullName}
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex h-9 items-center rounded-full border border-zinc-300 px-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                {t('logout')}
              </button>
            </form>
          </div>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto border-t border-zinc-200 px-4 py-2 md:hidden dark:border-zinc-800">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>
    </div>
  );
}
