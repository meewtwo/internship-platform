import { requireProfile } from '@/lib/auth/session';
import { logoutAction } from '../../dashboard/actions';
import InternshipDetailClient from './InternshipDetailClient';

export default async function InternshipDetailPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const profile = await requireProfile(locale);

  return (
    <InternshipDetailClient
      locale={locale}
      id={id}
      role={profile.role}
      studentId={profile.id}
      fullName={`${profile.firstName} ${profile.lastName}`.trim()}
      logoutAction={logoutAction.bind(null, locale)}
    />
  );
}
