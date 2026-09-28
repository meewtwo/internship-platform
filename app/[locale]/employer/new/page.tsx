import { requireRole } from '@/lib/auth/session';
import { logoutAction } from '../../dashboard/actions';
import NewInternshipClient from './NewInternshipClient';

export default async function NewInternshipPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const profile = await requireRole(locale, ['employer']);

  return (
    <NewInternshipClient
      locale={locale}
      employerId={profile.id}
      fullName={`${profile.firstName} ${profile.lastName}`.trim()}
      logoutAction={logoutAction.bind(null, locale)}
    />
  );
}
