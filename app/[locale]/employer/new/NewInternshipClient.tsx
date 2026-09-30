'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import AppShell from '@/components/AppShell';
import SkillPicker from '@/components/SkillPicker';
import { internshipSchema } from '@/lib/validations/internship';
import { addInternship } from '@/lib/mock/store';
import { FORMATS, type Format } from '@/lib/mock/data';
import { input, btnPrimary } from '@/components/ui';

export default function NewInternshipClient({
  locale,
  employerId,
  fullName,
  logoutAction
}: {
  locale: string;
  employerId: string;
  fullName: string;
  logoutAction: () => Promise<void>;
}) {
  const t = useTranslations('EmployerNewPage');
  const tFormats = useTranslations('Formats');
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [format, setFormat] = useState<Format>('onsite');
  const [paid, setPaid] = useState(true);
  const [durationWeeks, setDurationWeeks] = useState(8);
  const [skills, setSkills] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [touched, setTouched] = useState(false);

  const formData = { title, company, city, format, paid, durationWeeks, skills, description };
  const validation = internshipSchema.safeParse(formData);
  const fieldErrors = !validation.success ? validation.error.flatten().fieldErrors : {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!validation.success) return;

    addInternship({
      id: `local-${Date.now()}`,
      ...validation.data,
      ownerId: employerId,
      postedAt: new Date().toISOString()
    });

    router.push('/employer');
  };

  return (
    <AppShell locale={locale} role="employer" fullName={fullName} logoutAction={logoutAction}>
      <div className="mx-auto flex max-w-xl flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>
          <p className="text-zinc-600 dark:text-zinc-400">{t('subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t('fields.title')}</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className={input} />
            {touched && fieldErrors.title?.[0] && (
              <span className="text-xs text-red-500">{t(`errors.${fieldErrors.title[0]}`)}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t('fields.company')}</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} className={input} />
            {touched && fieldErrors.company?.[0] && (
              <span className="text-xs text-red-500">{t(`errors.${fieldErrors.company[0]}`)}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t('fields.city')}</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} className={input} />
            {touched && fieldErrors.city?.[0] && (
              <span className="text-xs text-red-500">{t(`errors.${fieldErrors.city[0]}`)}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t('fields.format')}</label>
              <select value={format} onChange={(e) => setFormat(e.target.value as Format)} className={input}>
                {FORMATS.map((f) => (
                  <option key={f} value={f}>
                    {tFormats(f)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t('fields.duration')}</label>
              <input
                type="number"
                min={1}
                max={52}
                value={durationWeeks}
                onChange={(e) => setDurationWeeks(Number(e.target.value))}
                className={input}
              />
              {touched && fieldErrors.durationWeeks?.[0] && (
                <span className="text-xs text-red-500">{t(`errors.${fieldErrors.durationWeeks[0]}`)}</span>
              )}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={paid}
              onChange={(e) => setPaid(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300"
            />
            {t('fields.paid')}
          </label>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t('fields.skills')}</label>
            <SkillPicker selected={skills} onChange={setSkills} />
            {touched && fieldErrors.skills?.[0] && (
              <span className="text-xs text-red-500">{t(`errors.${fieldErrors.skills[0]}`)}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {t('fields.description')}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-violet-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
            {touched && fieldErrors.description?.[0] && (
              <span className="text-xs text-red-500">{t(`errors.${fieldErrors.description[0]}`)}</span>
            )}
          </div>

          <button type="submit" className={btnPrimary}>
            {t('submit')}
          </button>
        </form>
      </div>
    </AppShell>
  );
}
