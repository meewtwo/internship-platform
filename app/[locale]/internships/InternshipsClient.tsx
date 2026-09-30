'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import AppShell from '@/components/AppShell';
import InternshipCard from '@/components/InternshipCard';
import { getInternships } from '@/lib/mock/store';
import { FORMATS, SKILLS, type Internship, type Format } from '@/lib/mock/data';
import { input } from '@/components/ui';

export default function InternshipsClient({
  locale,
  role,
  fullName,
  logoutAction
}: {
  locale: string;
  role: 'student' | 'employer';
  fullName: string;
  logoutAction: () => Promise<void>;
}) {
  const t = useTranslations('InternshipsPage');
  const tFormats = useTranslations('Formats');

  const [internships, setInternships] = useState<Internship[]>([]);
  const [query, setQuery] = useState('');
  const [format, setFormat] = useState<Format | 'all'>('all');
  const [skill, setSkill] = useState('all');

  // Data lives in localStorage (see lib/mock/store.ts), which isn't
  // available during server rendering, so it has to be read after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage read, can't run during SSR
    setInternships(getInternships());
  }, []);

  const filtered = useMemo(() => {
    return internships.filter((i) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = q === '' || i.title.toLowerCase().includes(q) || i.company.toLowerCase().includes(q);
      const matchesFormat = format === 'all' || i.format === format;
      const matchesSkill = skill === 'all' || i.skills.includes(skill);
      return matchesQuery && matchesFormat && matchesSkill;
    });
  }, [internships, query, format, skill]);

  return (
    <AppShell locale={locale} role={role} fullName={fullName} logoutAction={logoutAction}>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>
          <p className="text-zinc-600 dark:text-zinc-400">{t('subtitle')}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className={`${input} flex-1`}
          />
          <select value={format} onChange={(e) => setFormat(e.target.value as Format | 'all')} className={input}>
            <option value="all">{t('allFormats')}</option>
            {FORMATS.map((f) => (
              <option key={f} value={f}>
                {tFormats(f)}
              </option>
            ))}
          </select>
          <select value={skill} onChange={(e) => setSkill(e.target.value)} className={input}>
            <option value="all">{t('allSkills')}</option>
            {SKILLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            {t('empty')}
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                formatLabel={tFormats(internship.format)}
                paidLabel={t('paid')}
              />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
