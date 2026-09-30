'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import AppShell from '@/components/AppShell';
import { getApplications, getInternships } from '@/lib/mock/store';
import type { Application, Internship, Status } from '@/lib/mock/data';
import { badge } from '@/components/ui';

const STATUS_STYLES: Record<Status, string> = {
  sent: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
  review: 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300',
  interview: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
  accepted: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
};

export default function ApplicationsClient({
  locale,
  studentId,
  fullName,
  logoutAction
}: {
  locale: string;
  studentId: string;
  fullName: string;
  logoutAction: () => Promise<void>;
}) {
  const t = useTranslations('ApplicationsPage');
  const tStatuses = useTranslations('Statuses');

  const [applications, setApplications] = useState<Application[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);

  // localStorage isn't available during server rendering, so this data is
  // read after mount instead.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage read, can't run during SSR
    setApplications(getApplications().filter((a) => a.studentId === studentId));
    setInternships(getInternships());
  }, [studentId]);

  const internshipById = new Map(internships.map((i) => [i.id, i]));

  return (
    <AppShell locale={locale} role="student" fullName={fullName} logoutAction={logoutAction}>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>
          <p className="text-zinc-600 dark:text-zinc-400">{t('subtitle')}</p>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
            <p className="mb-4 text-zinc-500 dark:text-zinc-400">{t('empty')}</p>
            <Link href="/internships" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
              {t('browseLink')}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {applications.map((application) => {
              const internship = internshipById.get(application.internshipId);
              return (
                <div
                  key={application.id}
                  className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-white">
                      {internship?.title ?? t('unknownPosting')}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{internship?.company}</p>
                  </div>
                  <span className={`${badge} ${STATUS_STYLES[application.status]}`}>
                    {tStatuses(application.status)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
