import { Link } from '@/i18n/routing';
import type { Internship } from '@/lib/mock/data';
import { badge } from './ui';

const FORMAT_STYLES: Record<Internship['format'], string> = {
  onsite: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
  remote: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
  hybrid: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
};

export default function InternshipCard({
  internship,
  formatLabel,
  paidLabel,
  matchPercent
}: {
  internship: Internship;
  formatLabel: string;
  paidLabel: string;
  matchPercent?: number;
}) {
  return (
    <Link
      href={`/internships/${internship.id}`}
      className="group flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-zinc-900 group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
            {internship.title}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {internship.company} · {internship.city}
          </p>
        </div>
        {matchPercent !== undefined && (
          <span className={`${badge} shrink-0 bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300`}>
            {matchPercent}%
          </span>
        )}
      </div>

      <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">{internship.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {internship.skills.slice(0, 4).map((skill) => (
          <span key={skill} className={`${badge} bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300`}>
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
        <span className={`${badge} ${FORMAT_STYLES[internship.format]}`}>{formatLabel}</span>
        {internship.paid && (
          <span className={`${badge} bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300`}>
            {paidLabel}
          </span>
        )}
        <span>{internship.durationWeeks}w</span>
      </div>
    </Link>
  );
}
