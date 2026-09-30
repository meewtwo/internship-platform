'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import AppShell from '@/components/AppShell';
import MatchBar from '@/components/MatchBar';
import { getInternships, getApplications, addApplication } from '@/lib/mock/store';
import { applicationSchema } from '@/lib/validations/internship';
import { matchScore } from '@/lib/mock/match';
import type { Internship } from '@/lib/mock/data';
import { btnPrimary, badge } from '@/components/ui';

export default function InternshipDetailClient({
  locale,
  id,
  role,
  studentId,
  fullName,
  logoutAction
}: {
  locale: string;
  id: string;
  role: 'student' | 'employer';
  studentId: string;
  fullName: string;
  logoutAction: () => Promise<void>;
}) {
  const t = useTranslations('InternshipDetailPage');
  const tFormats = useTranslations('Formats');
  const router = useRouter();

  const [internship, setInternship] = useState<Internship | null | undefined>(undefined);
  const [note, setNote] = useState('');
  const [touched, setTouched] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mySkills, setMySkills] = useState<string[]>([]);

  // localStorage isn't available during server rendering, so this data
  // (the posting, whether we already applied, and the student's skills)
  // is read after mount instead.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage read, can't run during SSR
    setInternship(getInternships().find((i) => i.id === id) ?? null);
    setAlreadyApplied(getApplications().some((a) => a.internshipId === id && a.studentId === studentId));
    try {
      const raw = window.localStorage.getItem(`internmatch:skills:${studentId}`);
      setMySkills(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      setMySkills([]);
    }
  }, [id, studentId]);

  const validation = applicationSchema.safeParse({ note });
  const noteError = touched && !validation.success ? validation.error.flatten().fieldErrors.note?.[0] : null;

  const percent = useMemo(() => (internship ? matchScore(mySkills, internship.skills) : 0), [mySkills, internship]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!validation.success || !internship) return;

    addApplication({
      id: `app-${Date.now()}`,
      internshipId: internship.id,
      studentId,
      studentName: fullName,
      note,
      status: 'sent',
      createdAt: new Date().toISOString()
    });
    setSubmitted(true);
    setAlreadyApplied(true);
  };

  if (internship === undefined) {
    return (
      <AppShell locale={locale} role={role} fullName={fullName} logoutAction={logoutAction}>
        <p className="text-zinc-500">{t('loading')}</p>
      </AppShell>
    );
  }

  if (internship === null) {
    return (
      <AppShell locale={locale} role={role} fullName={fullName} logoutAction={logoutAction}>
        <p className="text-zinc-500">{t('notFound')}</p>
      </AppShell>
    );
  }

  return (
    <AppShell locale={locale} role={role} fullName={fullName} logoutAction={logoutAction}>
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="self-start text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          {t('back')}
        </button>

        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{internship.title}</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            {internship.company} · {internship.city} · {tFormats(internship.format)}
          </p>
        </div>

        {role === 'student' && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{t('matchLabel')}</span>
              <span className="font-semibold text-violet-600 dark:text-violet-400">{percent}%</span>
            </div>
            <MatchBar percent={percent} />
            {mySkills.length === 0 && <p className="mt-2 text-xs text-zinc-500">{t('addSkillsHint')}</p>}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {internship.skills.map((s) => (
            <span key={s} className={`${badge} bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300`}>
              {s}
            </span>
          ))}
          {internship.paid && (
            <span className={`${badge} bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300`}>
              {t('paid')}
            </span>
          )}
        </div>

        <p className="whitespace-pre-line text-zinc-700 dark:text-zinc-300">{internship.description}</p>

        {role === 'student' && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            {alreadyApplied ? (
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {submitted ? t('applySuccess') : t('alreadyApplied')}
              </p>
            ) : (
              <form onSubmit={handleApply} className="flex flex-col gap-3">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t('noteLabel')}</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onBlur={() => setTouched(true)}
                  rows={4}
                  placeholder={t('notePlaceholder')}
                  className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-violet-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
                {noteError && <span className="text-xs text-red-500">{t(`errors.${noteError}`)}</span>}
                <button type="submit" className={btnPrimary}>
                  {t('applyButton')}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
