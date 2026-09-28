// Percentage of an internship's required skills that also appear in the
// student's own skill list (case-insensitive). Used to show the match bar.
export function matchScore(have: string[], required: string[]): number {
  if (required.length === 0) return 100;
  const haveLower = new Set(have.map((s) => s.toLowerCase()));
  const matched = required.filter((skill) => haveLower.has(skill.toLowerCase()));
  return Math.round((matched.length / required.length) * 100);
}
