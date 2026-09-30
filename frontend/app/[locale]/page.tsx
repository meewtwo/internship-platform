import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SiteHeader from '@/components/SiteHeader';

const FEATURE_KEYS = ['student', 'employer', 'match', 'trilingual'] as const;
const STEP_KEYS = ['one', 'two', 'three'] as const;

// Small inline icons so we don't need to pull in an icon library.
const FEATURE_ICONS: Record<(typeof FEATURE_KEYS)[number], React.ReactNode> = {
  student: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.42A12.08 12.08 0 0112 21 12.08 12.08 0 015.84 10.58L12 14z" />
    </svg>
  ),
  employer: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1" />
    </svg>
  ),
  match: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  trilingual: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.05 12L11 19M8.5 12h.01M12.5 21l4-9 4 9m-6.5-3h5" />
    </svg>
  )
};

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('HomePage');

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <SiteHeader locale={locale} />

      {/* Hero */}
      <section className="bg-grid relative overflow-hidden">
        <div className="bg-glow-violet pointer-events-none absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="bg-glow-blue pointer-events-none absolute top-40 right-0 h-80 w-80 rounded-full blur-3xl" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center sm:py-32">
          <span className="rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-semibold text-violet-700 dark:border-violet-900 dark:bg-violet-950/60 dark:text-violet-300">
            {t('badge')}
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
            {t('title')}
          </h1>

          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">{t('subtitle')}</p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register?role=student"
              className="flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-violet-600/30 transition-transform hover:scale-[1.03]"
            >
              {t('ctaStudent')}
            </Link>
            <Link
              href="/register?role=employer"
              className="flex h-12 items-center justify-center rounded-full border border-zinc-300 px-8 text-base font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900"
            >
              {t('ctaEmployer')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <h2 className="mb-10 text-center text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
          {t('featuresTitle')}
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_KEYS.map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                {FEATURE_ICONS[key]}
              </div>
              <h3 className="mb-1.5 font-semibold text-zinc-900 dark:text-white">
                {t(`features.${key}.title`)}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{t(`features.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-4xl px-6 py-20">
          <h2 className="mb-10 text-center text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
            {t('stepsTitle')}
          </h2>

          <div className="grid gap-8 sm:grid-cols-3">
            {STEP_KEYS.map((key, i) => (
              <div key={key} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-white dark:text-zinc-900">
                  {i + 1}
                </span>
                <h3 className="mb-1.5 font-semibold text-zinc-900 dark:text-white">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t(`steps.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto w-full max-w-4xl px-6 py-20 text-center">
        <h2 className="mb-3 text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-white">
          {t('ctaTitle')}
        </h2>
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">{t('ctaSubtitle')}</p>
        <Link
          href="/register"
          className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-violet-600/30 transition-transform hover:scale-[1.03]"
        >
          {t('ctaButton')}
        </Link>
      </section>

      <footer className="border-t border-zinc-200 px-6 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        {t('footer')}
      </footer>
    </div>
  );
}
