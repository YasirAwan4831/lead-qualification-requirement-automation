import { Info, ArrowRight, ArrowDown, UserRound, Bot, Cog, Users, Flag } from "lucide-react";
import CopyLink from "@/components/ui/CopyLink";
import WorkflowDiagram from "@/components/workflow/WorkflowDiagram";
import ResponsiveTable from "./ResponsiveTable";
import FlowStrip from "./FlowStrip";
import ScenarioCard from "./ScenarioCard";

function KeyValue({ rows }) {
  return (
    <dl className="not-prose card my-6 divide-y divide-slate-200 overflow-hidden font-sans text-sm leading-6 dark:divide-white/10">
      {rows.map(([k, v]) => <div key={k} className="grid gap-1 p-4 sm:grid-cols-[11rem_1fr] sm:gap-4"><dt className="font-semibold text-navy-800 dark:text-gold-300">{k}</dt><dd>{v}</dd></div>)}
    </dl>
  );
}
export function Callout({ block }) {
  return (
    <aside className="not-prose my-8 rounded-lg border-l-4 border-gold-500 bg-gold-300/15 p-5 font-sans">
      <p className="flex items-center gap-2 font-semibold text-navy-800 dark:text-white"><Info size={18} aria-hidden /> {block.title}</p>
      {block.text && <p className="mt-2 text-[0.95rem] leading-7">{block.text}</p>}
    </aside>
  );
}
export function EndToEnd() {
  const cols = [[UserRound, "INPUT", "Customer Inquiry"], [Bot, "AI", "Understand, Extract, Classify"], [Cog, "AUTOMATION", "Store, Route, Notify"], [Users, "HUMAN", "Review and Follow Up"], [Flag, "RESULT", "Organized Lead"]];
  return (
    <ol className="not-prose my-8 grid gap-2 font-sans md:grid-cols-[repeat(5,1fr)] md:gap-0" aria-label="End-to-end solution summary">
      {cols.map(([Icon, label, text], i) => (
        <li key={label} className="flex items-center gap-2 md:flex-col md:gap-1">
          <div className={`w-full rounded-lg border p-3 text-center ${i === 4 ? "border-gold-500 bg-navy-800 text-white" : "border-slate-300 bg-white dark:border-white/20 dark:bg-navy-900"}`}>
            <Icon size={20} aria-hidden className="mx-auto mb-1 text-gold-500" />
            <p className="text-xs font-bold tracking-wide text-gold-600 dark:text-gold-300">{label}</p>
            <p className="text-sm font-semibold">{text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
function Functions({ rows }) {
  return <ol className="not-prose my-6 grid gap-2 font-sans sm:grid-cols-2">{rows.map(([n, t]) => <li key={n} className="card flex items-center gap-3 p-3 text-sm"><span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white dark:bg-gold-500">{n}</span>{t}</li>)}</ol>;
}
function Journey({ rows }) {
  return (
    <ol className="not-prose my-6 space-y-2 font-sans">
      {rows.map(([s, t], i) => (
        <li key={s} className="card flex gap-4 p-4">
          <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white dark:bg-gold-500">{i + 1}</span>
          <div><p className="font-semibold text-navy-800 dark:text-white">{s.replace(/^\d+\.\s*/, "")}</p><p className="text-sm leading-6">{t}</p></div>
        </li>
      ))}
    </ol>
  );
}
export function Phases({ rows }) {
  return (
    <ol className="not-prose relative my-6 space-y-5 border-l-2 border-navy-200 pl-8 font-sans dark:border-white/20">
      {rows.map(([p, t]) => (
        <li key={p} className="relative">
          <span aria-hidden className="absolute -left-[2.9rem] flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white ring-4 ring-white dark:bg-gold-500 dark:ring-navy-950">{p.match(/^\d+/)?.[0]}</span>
          <h3 className="text-lg font-semibold text-navy-800 dark:text-white">{p.replace(/^\d+\.\s*/, "")}</h3>
          <p className="mt-1 max-w-[65ch] leading-7">{t}</p>
        </li>
      ))}
    </ol>
  );
}
export function RecordCard({ rows }) {
  const half = rows.length / 2;
  const fields = rows.slice(0, half).flatMap((r, i) => [r, rows[half + i]]);
  return (
    <div className="not-prose card my-6 overflow-hidden font-sans">
      <p className="border-b border-slate-200 bg-navy-800 px-4 py-2 text-sm font-semibold text-white dark:border-white/10">Proposed Lead Record Structure · fictional sample values</p>
      <dl className="grid divide-y divide-slate-200 text-sm dark:divide-white/10 sm:grid-cols-2 sm:divide-y-0">
        {fields.map(([k, v], i) => <div key={i} className="border-slate-200 p-3 sm:border-b dark:border-white/10"><dt className="text-xs font-semibold text-gold-700 dark:text-gold-300">{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </div>
  );
}

export default function Blocks({ blocks }) {
  const out = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === "li") {
      const items = [];
      while (blocks[i]?.type === "li") items.push(blocks[i++].text);
      i--; out.push(<ul key={i}>{items.map((t, j) => <li key={j}>{t}</li>)}</ul>);
    } else if (b.type === "p") out.push(<p key={i}>{b.text}</p>);
    else if (b.type === "h2") out.push(<h2 key={i} id={b.id}>{b.number} {b.text}<CopyLink anchor={b.id} label={b.text} /></h2>);
    else if (b.type === "h3") out.push(<h3 key={i}>{b.text}</h3>);
    else if (b.type === "table") out.push(<ResponsiveTable key={i} rows={b.rows} />);
    else if (b.type === "keyvalue") out.push(<KeyValue key={i} rows={b.rows} />);
    else if (b.type === "callout") out.push(<Callout key={i} block={b} />);
    else if (b.type === "workflow") out.push(<WorkflowDiagram key={i} />);
    else if (b.type === "chain") out.push(<FlowStrip key={i} steps={b.steps} />);
    else if (b.type === "functions") out.push(<Functions key={i} rows={b.rows} />);
    else if (b.type === "journey") out.push(<Journey key={i} rows={b.rows} />);
    else if (b.type === "phases") out.push(<Phases key={i} rows={b.rows} />);
    else if (b.type === "record") out.push(<RecordCard key={i} rows={b.rows} />);
    else if (b.type === "scenario") out.push(<ScenarioCard key={i} block={b} />);
    else if (b.type === "endtoend") out.push(<EndToEnd key={i} />);
    else if (b.type === "numbered") out.push(<ol key={i}>{b.rows.map(([n, t]) => <li key={n}>{t}</li>)}</ol>);
  }
  return <div className="prose-doc">{out}</div>;
}
