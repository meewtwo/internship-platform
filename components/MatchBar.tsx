export default function MatchBar({ percent }: { percent: number }) {
  const color = percent >= 70 ? 'bg-emerald-500' : percent >= 40 ? 'bg-amber-500' : 'bg-zinc-400';

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
      <div className={`h-full ${color} transition-all`} style={{ width: `${percent}%` }} />
    </div>
  );
}
