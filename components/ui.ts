// Shared Tailwind class fragments so inputs/buttons/badges look identical
// across every page instead of copy-pasted strings slowly drifting apart.

export const input =
  'rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-violet-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100';

export const btnPrimary =
  'inline-flex h-11 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 font-medium text-white shadow-sm shadow-violet-600/30 transition-transform hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100';

export const btnSecondary =
  'inline-flex h-11 items-center justify-center rounded-lg border border-zinc-300 px-6 font-medium text-zinc-800 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900';

export const badge = 'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium';

export const card = 'rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900';
