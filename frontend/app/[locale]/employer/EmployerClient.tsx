'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import AppShell from '@/components/AppShell';
import { getInternships, getApplications, updateApplicationStatus } from '@/lib/mock/store';
import { STATUSES, type Internship, type Application, type Status } from '@/lib/mock/data';
import { badge, btnPrimary } from '@/components/ui';

const STATUS_STYLES: Record<Status, string> = {
  sent: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
  review: 'bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300',
  interview: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
  accepted: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
};

export default function EmployerClient({
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
  const t = useTranslations('EmployerPage');
  const tStatuses = useTranslations('Statuses');

  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  // localStorage isn't available during server rendering, so this data is
  // read after mount instead.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage read, can't run during SSR
    setInternships(getInternships().filter((i) => i.ownerId === employerId));
    setApplications(getApplications());
  }, [employerId]);

  const myPostingIds = useMemo(() => new Set(internships.map((i) => i.id)), [internships]);
  const myApplications = applications.filter((a) => myPostingIds.has(a.internshipId));

  const handleStatusChange = (id: string, status: Status) => {
    updateApplicationStatus(id, status);
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  return (
    <AppShell locale={locale} role="employer" fullName={fullName} logoutAction={logoutAction}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>
            <p className="text-zinc-600 dark:text-zinc-400">{t('subtitle')}</p>
          </div>
          <Link href="/employer/new" className={btnPrimary}>
            {t('newButton')}
          </Link>
        </div>

        {internships.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            {t('noPostings')}
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {internships.map((posting) => {
              const postingApplications = myApplications.filter((a) => a.internshipId === posting.id);
              return (
                <div
                  key={posting.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-semibold text-zinc-900 dark:text-white">{posting.title}</h2>
                    <span className="text-sm text-zinc-500">
                      {t('applicantCount', { count: postingApplications.length })}
                    </span>
                  </div>

                  {postingApplications.length === 0 ? (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('noApplicants')}</p>
                  ) : (
                    <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
                      {postingApplications.map((application) => (
                        <div
                          key={application.id}
                          className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <p className="font-medium text-zinc-900 dark:text-white">{application.studentName}</p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">{application.note}</p>
                          </div>
                          <select
                            value={application.status}
                            onChange={(e) => handleStatusChange(application.id, e.target.value as Status)}
                            className={`${badge} border-0 ${STATUS_STYLES[application.status]}`}
                          >
                            {STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {tStatuses(status)}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
