import { requireProfile } from '@/lib/auth/session';
import { logoutAction } from '../dashboard/actions';
import ProfileClient from './ProfileClient';

export default async function ProfilePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const profile = await requireProfile(locale);

  return (
    <ProfileClient
      locale={locale}
      userId={profile.id}
      email={profile.email}
      role={profile.role}
      firstName={profile.firstName}
      lastName={profile.lastName}
      logoutAction={logoutAction.bind(null, locale)}
    />
  );
}
