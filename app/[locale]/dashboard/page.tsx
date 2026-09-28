import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { requireProfile } from '@/lib/auth/session';
import { logoutAction } from './actions';
import AppShell from '@/components/AppShell';

export default async function DashboardPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const profile = await requireProfile(locale);
  const t = await getTranslations('DashboardPage');
  const tRoles = await getTranslations('Roles');
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();

  const cardClass =
    'rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900';

  return (
    <AppShell locale={locale} role={profile.role} fullName={fullName} logoutAction={logoutAction.bind(null, locale)}>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            {t('welcome', { name: fullName })}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {t('role', { role: tRoles(profile.role) })}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {profile.role === 'student' ? (
            <>
              <Link href="/internships" className={cardClass}>
                <h2 className="mb-1 font-semibold text-zinc-900 dark:text-white">
                  {t('cards.browse.title')}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('cards.browse.desc')}</p>
              </Link>
              <Link href="/applications" className={cardClass}>
                <h2 className="mb-1 font-semibold text-zinc-900 dark:text-white">
                  {t('cards.applications.title')}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('cards.applications.desc')}</p>
              </Link>
            </>
          ) : (
            <>
              <Link href="/employer/new" className={cardClass}>
                <h2 className="mb-1 font-semibold text-zinc-900 dark:text-white">
                  {t('cards.post.title')}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('cards.post.desc')}</p>
              </Link>
              <Link href="/employer" className={cardClass}>
                <h2 className="mb-1 font-semibold text-zinc-900 dark:text-white">
                  {t('cards.manage.title')}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('cards.manage.desc')}</p>
              </Link>
            </>
          )}
          <Link href="/profile" className={cardClass}>
            <h2 className="mb-1 font-semibold text-zinc-900 dark:text-white">
              {t('cards.profile.title')}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('cards.profile.desc')}</p>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
