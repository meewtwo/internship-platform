import { requireProfile } from '@/lib/auth/session';
import { logoutAction } from '../dashboard/actions';
import InternshipsClient from './InternshipsClient';

export default async function InternshipsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const profile = await requireProfile(locale);

  return (
    <InternshipsClient
      locale={locale}
      role={profile.role}
      fullName={`${profile.firstName} ${profile.lastName}`.trim()}
      logoutAction={logoutAction.bind(null, locale)}
    />
  );
}
