// Tiny localStorage-backed "database" for internships and applications,
// since those tables don't exist in Supabase yet. Every function is safe
// to call from a client component; on the server (no `window`) reads just
// fall back to the seed data.

import { Internship, Application, SEED_INTERNSHIPS } from './data';

const INTERNSHIPS_KEY = 'internmatch:internships';
const APPLICATIONS_KEY = 'internmatch:applications';

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked (private browsing) — fail silently, the
    // page still works, it just won't remember this change on refresh.
  }
}

export function getInternships(): Internship[] {
  return read<Internship[]>(INTERNSHIPS_KEY, SEED_INTERNSHIPS);
}

export function addInternship(internship: Internship) {
  write(INTERNSHIPS_KEY, [internship, ...getInternships()]);
}

export function getApplications(): Application[] {
  return read<Application[]>(APPLICATIONS_KEY, []);
}

export function addApplication(application: Application) {
  write(APPLICATIONS_KEY, [application, ...getApplications()]);
}

export function updateApplicationStatus(id: string, status: Application['status']) {
  const updated = getApplications().map((a) => (a.id === id ? { ...a, status } : a));
  write(APPLICATIONS_KEY, updated);
}
