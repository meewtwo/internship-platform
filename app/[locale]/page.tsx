import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-6">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center gap-8 py-16 px-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
            {t('title')}
          </h1>
          <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
            {t('description')}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/register"
            className="flex h-11 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black px-6 font-medium transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
          >
            {t('register')}
          </Link>
          <Link
            href="/login"
            className="flex h-11 items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 px-6 font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
          >
            {t('login')}
          </Link>
        </div>

        <div className="flex flex-col items-center gap-2 pt-6 border-t border-zinc-200 dark:border-zinc-800 w-full">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {t('languageSwitcher')}
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              locale="en"
              className="px-3 py-1.5 text-sm font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 transition-colors"
            >
              EN
            </Link>
            <Link
              href="/"
              locale="ru"
              className="px-3 py-1.5 text-sm font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 transition-colors"
            >
              RU
            </Link>
            <Link
              href="/"
              locale="kk"
              className="px-3 py-1.5 text-sm font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 transition-colors"
            >
              KZ
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
