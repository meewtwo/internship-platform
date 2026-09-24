import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { logoutAction } from './actions';

export default async function DashboardPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('DashboardPage');
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect(`/${locale}/login`);
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('first_name, last_name, role')
    .eq('id', user.id)
    .single();

  if (profileError || !profile) {
    redirect(`/${locale}/login`);
  }

  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black p-6">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-black dark:text-zinc-50">
            {t('title')}
          </h1>
        </div>

        <div className="flex flex-col gap-2 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
          <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            {t('welcome', { name: fullName })}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 capitalize">
            {t('role', { role: profile.role })}
          </p>
        </div>

        <form action={logoutAction.bind(null, locale)}>
          <button
            type="submit"
            className="w-full flex h-11 items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
          >
            {t('logout')}
          </button>
        </form>
      </div>
    </div>
  );
}
