'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import AppShell from '@/components/AppShell';
import SkillPicker from '@/components/SkillPicker';
import { btnPrimary } from '@/components/ui';

export default function ProfileClient({
  locale,
  userId,
  email,
  role,
  firstName,
  lastName,
  logoutAction
}: {
  locale: string;
  userId: string;
  email: string;
  role: 'student' | 'employer';
  firstName: string;
  lastName: string;
  logoutAction: () => Promise<void>;
}) {
  const t = useTranslations('ProfilePage');
  const tRoles = useTranslations('Roles');

  const [skills, setSkills] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const skillsKey = `internmatch:skills:${userId}`;

  // The student_profiles table exists in Supabase but its columns aren't
  // settled yet, so "skills" stays in localStorage for now — swap this for
  // a real query once the schema is confirmed (see AGENTS.md).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(skillsKey);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage read, can't run during SSR
      setSkills(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      setSkills([]);
    }
  }, [skillsKey]);

  const handleSave = () => {
    window.localStorage.setItem(skillsKey, JSON.stringify(skills));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell locale={locale} role={role} fullName={`${firstName} ${lastName}`.trim()} logoutAction={logoutAction}>
      <div className="mx-auto flex max-w-xl flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>
          <p className="text-zinc-600 dark:text-zinc-400">{t('subtitle')}</p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{t('name')}</dt>
              <dd className="text-zinc-900 dark:text-white">
                {firstName} {lastName}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{t('email')}</dt>
              <dd className="text-zinc-900 dark:text-white">{email}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{t('role')}</dt>
              <dd className="text-zinc-900 dark:text-white">{tRoles(role)}</dd>
            </div>
          </dl>
        </div>

        {role === 'student' && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-1 font-semibold text-zinc-900 dark:text-white">{t('skillsTitle')}</h2>
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{t('skillsHint')}</p>
            <SkillPicker selected={skills} onChange={setSkills} />
            <button type="button" onClick={handleSave} className={`${btnPrimary} mt-4 w-full sm:w-auto`}>
              {saved ? t('saved') : t('save')}
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
