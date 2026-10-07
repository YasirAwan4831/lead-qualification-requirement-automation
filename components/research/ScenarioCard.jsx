import { Bot, User, FlaskConical } from "lucide-react";

const get = (rows, k) => rows.find(([x]) => x === k)?.[1];

export default function ScenarioCard({ block }) {
  const { rows, questions } = block;
  const msg = get(rows, "Customer Message");
  const rest = rows.filter(([k]) => k !== "Customer Message");
  return (
    <div className="not-prose my-8 font-sans">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold-300/25 px-3 py-1 text-xs font-semibold text-navy-800 dark:text-white"><FlaskConical size={14} aria-hidden /> Fictional demonstration, not a real customer</p>
      <div className="flex gap-3">
        <span aria-hidden className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-white/15"><User size={16} /></span>
        <div className="max-w-[46rem] rounded-2xl rounded-tl-sm border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-navy-900"><p className="mb-1 text-xs font-semibold text-slate-500">Customer Message</p><p className="leading-7">{msg}</p></div>
      </div>
      <dl className="mt-4 grid gap-px overflow-hidden rounded-lg border border-slate-200 text-sm leading-6 sm:grid-cols-2 dark:border-white/15">
        {rest.map(([k, v]) => k.startsWith("AI Follow-Up") ? (
          <div key={k} className="bg-white p-3 sm:col-span-2 dark:bg-navy-950">
            <dt className="flex items-center gap-2 text-xs font-semibold text-gold-700 dark:text-gold-300"><Bot size={14} aria-hidden />{k}</dt>
            <dd><ol className="mt-1 list-decimal space-y-1 pl-5">{questions.map((q) => <li key={q}>{q.replace(/^\d\.\s*/, "")}</li>)}</ol></dd>
          </div>
        ) : (
          <div key={k} className={`bg-white p-3 dark:bg-navy-950 ${k === "Lead Status" ? "ring-2 ring-inset ring-gold-500" : ""}`}><dt className="text-xs font-semibold text-gold-700 dark:text-gold-300">{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
    </div>
  );
}
