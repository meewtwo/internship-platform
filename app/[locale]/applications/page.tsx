import { requireRole } from '@/lib/auth/session';
import { logoutAction } from '../dashboard/actions';
import ApplicationsClient from './ApplicationsClient';

export default async function ApplicationsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const profile = await requireRole(locale, ['student']);

  return (
    <ApplicationsClient
      locale={locale}
      studentId={profile.id}
      fullName={`${profile.firstName} ${profile.lastName}`.trim()}
      logoutAction={logoutAction.bind(null, locale)}
    />
  );
}
