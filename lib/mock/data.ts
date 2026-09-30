// Types + seed data for the internship catalog.
//
// There is no `internships` or `applications` table in Supabase yet (see
// AGENTS.md — only profiles, student_profiles, companies exist), so this
// feature runs on realistic seed data plus whatever the visitor creates,
// persisted in the browser's localStorage via lib/mock/store.ts. Swap that
// file for real Supabase queries once those tables exist — the pages that
// use it don't need to change, only where the data comes from.

export type Format = 'onsite' | 'remote' | 'hybrid';
export type Status = 'sent' | 'review' | 'interview' | 'accepted' | 'rejected';

export type Internship = {
  id: string;
  title: string;
  company: string;
  city: string;
  format: Format;
  paid: boolean;
  durationWeeks: number;
  skills: string[];
  description: string;
  ownerId: string; // profiles.id of the employer who posted it
  postedAt: string; // ISO date
};

export type Application = {
  id: string;
  internshipId: string;
  studentId: string; // profiles.id of the applicant
  studentName: string;
  note: string;
  status: Status;
  createdAt: string; // ISO date
};

export const FORMATS: Format[] = ['onsite', 'remote', 'hybrid'];
export const STATUSES: Status[] = ['sent', 'review', 'interview', 'accepted', 'rejected'];

export const SKILLS = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'SQL',
  'Git',
  'Figma',
  'UI design',
  'Data analysis',
  'Machine learning',
  'Excel',
  'Marketing',
  'SEO',
  'Copywriting',
  'English',
  'Project management'
];

export const SEED_INTERNSHIPS: Internship[] = [
  {
    id: 'seed-1',
    title: 'Frontend Intern',
    company: 'Steppe Analytics',
    city: 'Almaty',
    format: 'hybrid',
    paid: true,
    durationWeeks: 12,
    skills: ['React', 'TypeScript', 'Git'],
    description:
      'Help build internal dashboards used by our data team. You will work with React and TypeScript alongside two senior engineers, with code review on every change.',
    ownerId: 'seed-employer',
    postedAt: '2026-09-10'
  },
  {
    id: 'seed-2',
    title: 'Data Analyst Intern',
    company: 'Nomad Fintech',
    city: 'Astana',
    format: 'onsite',
    paid: true,
    durationWeeks: 8,
    skills: ['SQL', 'Excel', 'Data analysis'],
    description:
      'Support the analytics team with reporting, dashboards, and ad-hoc queries on transaction data. Great fit if you enjoy finding patterns in messy numbers.',
    ownerId: 'seed-employer',
    postedAt: '2026-09-05'
  },
  {
    id: 'seed-3',
    title: 'Marketing Intern',
    company: 'Qyzyl Media',
    city: 'Qyzylorda',
    format: 'remote',
    paid: false,
    durationWeeks: 6,
    skills: ['Marketing', 'SEO', 'Copywriting'],
    description:
      'Write and schedule content across our social channels, and help track how well each campaign performs.',
    ownerId: 'seed-employer',
    postedAt: '2026-09-01'
  },
  {
    id: 'seed-4',
    title: 'UI/UX Design Intern',
    company: 'Steppe Analytics',
    city: 'Almaty',
    format: 'hybrid',
    paid: true,
    durationWeeks: 10,
    skills: ['Figma', 'UI design'],
    description:
      'Redesign key flows in our product alongside the design lead — from wireframes to a working prototype in Figma.',
    ownerId: 'seed-employer',
    postedAt: '2026-08-28'
  },
  {
    id: 'seed-5',
    title: 'Machine Learning Intern',
    company: 'Nomad Fintech',
    city: 'Astana',
    format: 'onsite',
    paid: true,
    durationWeeks: 12,
    skills: ['Python', 'Machine learning', 'SQL'],
    description: 'Prototype credit-risk models under the guidance of our data science team.',
    ownerId: 'seed-employer',
    postedAt: '2026-08-20'
  },
  {
    id: 'seed-6',
    title: 'Project Coordinator Intern',
    company: 'Qyzyl Media',
    city: 'Qyzylorda',
    format: 'remote',
    paid: false,
    durationWeeks: 8,
    skills: ['Project management', 'English'],
    description:
      'Keep our small team organized: track deadlines, run weekly check-ins, and write up decisions so nothing gets lost.',
    ownerId: 'seed-employer',
    postedAt: '2026-08-15'
  }
];
