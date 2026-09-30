import { requireRole } from '@/lib/auth/session';
import { logoutAction } from '../dashboard/actions';
import EmployerClient from './EmployerClient';

export default async function EmployerPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const profile = await requireRole(locale, ['employer']);

  return (
    <EmployerClient
      locale={locale}
      employerId={profile.id}
      fullName={`${profile.firstName} ${profile.lastName}`.trim()}
      logoutAction={logoutAction.bind(null, locale)}
    />
  );
}
