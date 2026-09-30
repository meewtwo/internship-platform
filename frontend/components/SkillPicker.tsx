'use client';

import { SKILLS } from '@/lib/mock/data';

// Toggleable skill chips, used both for "skills required" on a posting
// and "my skills" on the student profile.
export default function SkillPicker({
  selected,
  onChange
}: {
  selected: string[];
  onChange: (skills: string[]) => void;
}) {
  const toggle = (skill: string) => {
    onChange(selected.includes(skill) ? selected.filter((s) => s !== skill) : [...selected, skill]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {SKILLS.map((skill) => {
        const active = selected.includes(skill);
        return (
          <button
            key={skill}
            type="button"
            onClick={() => toggle(skill)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? 'border-violet-600 bg-violet-600 text-white'
                : 'border-zinc-300 text-zinc-700 hover:border-violet-400 dark:border-zinc-700 dark:text-zinc-300'
            }`}
          >
            {skill}
          </button>
        );
      })}
    </div>
  );
}
