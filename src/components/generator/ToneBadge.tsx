type ToneBadgeProps = { tone: string };
export default function ToneBadge({ tone }: ToneBadgeProps) {
  return (
    <section className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      {" "}
      <span className="text-sm font-medium text-slate-600">
        {" "}
        Detected tone{" "}
      </span>{" "}
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
        {" "}
        {tone}{" "}
      </span>{" "}
    </section>
  );
}
