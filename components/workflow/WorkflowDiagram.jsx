"use client";
import { useState } from "react";
import { AlertTriangle, ArrowDown, CheckCircle2, GitFork, Info, MessageCircleQuestion } from "lucide-react";
import { trunkTop, decision, branches, trunkBottom, note } from "@/data/workflow";

const tones = {
  yes: { box: "border-emerald-500/70 bg-emerald-500/10", Icon: MessageCircleQuestion },
  no: { box: "border-gold-500 bg-gold-300/15", Icon: CheckCircle2 },
  complex: { box: "border-red-500/70 bg-red-500/10", Icon: AlertTriangle },
};
const Arrow = () => (
  <div className="flex flex-col items-center py-1" aria-hidden>
    <span className="wf-arrow h-4 w-px bg-gold-500" />
    <ArrowDown size={14} className="text-gold-600" />
  </div>
);

export default function WorkflowDiagram({ interactive = true }) {
  const all = [...trunkTop, ...trunkBottom, ...branches.flatMap((b) => b.nodes), { ...decision, n: "" }];
  const [active, setActive] = useState("n1");
  const current = all.find((n) => n.id === active);

  const Node = ({ node, delay = 0 }) => {
    const on = active === node.id;
    return (
      <button type="button" onClick={() => setActive(node.id)} aria-pressed={on} style={{ animationDelay: `${delay * 70}ms` }}
        className={`wf-node w-full rounded-lg border p-3 text-center transition-colors ${node.final ? "bg-navy-800 text-white dark:bg-navy-700" : "bg-white dark:bg-navy-900"} ${on ? "border-gold-500 ring-2 ring-gold-500" : "border-slate-300 hover:border-gold-500 dark:border-white/20"}`}>
        <span className="block text-sm font-semibold">{node.n ? <><span className="sr-only">Step </span>{node.n}. </> : null}{node.title}</span>
        <span className={`block text-xs leading-5 ${node.final ? "text-slate-200" : "text-slate-600 dark:text-slate-300"}`}>{node.text}</span>
      </button>
    );
  };

  return (
    <figure className="not-prose my-8 rounded-xl border border-slate-200 bg-slate-50 p-4 font-sans sm:p-6 dark:border-white/10 dark:bg-navy-900/60">
      <figcaption className="mb-1 text-lg font-semibold text-navy-800 dark:text-white">Proposed workflow diagram</figcaption>
      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">{interactive ? "Select any step to read what it does. " : ""}Proposed design. Nothing here is deployed.</p>
      <ol className="mx-auto max-w-md">
        {trunkTop.map((n, i) => <li key={n.id}><Node node={n} delay={i} /><Arrow /></li>)}
      </ol>
      <div className="mx-auto max-w-md">
        <button type="button" onClick={() => setActive("d")} aria-pressed={active === "d"} className={`flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-gold-300/20 p-3 text-center ${active === "d" ? "border-gold-500 ring-2 ring-gold-500" : "border-gold-500"}`}>
          <GitFork size={18} aria-hidden className="shrink-0 text-gold-600" />
          <span><span className="block text-sm font-bold text-navy-800 dark:text-white">{decision.title}</span><span className="block text-xs text-slate-600 dark:text-slate-300">{decision.text}</span></span>
        </button>
      </div>
      <Arrow />
      <div className="grid gap-4 lg:grid-cols-3">
        {branches.map((b) => {
          const { box, Icon } = tones[b.tone];
          return (
            <section key={b.tag} aria-label={b.label} className={`flex flex-col rounded-lg border-2 p-3 ${box}`}>
              <p className="mb-2 flex items-center justify-center gap-2 text-center text-sm font-bold text-navy-800 dark:text-white"><Icon size={16} aria-hidden />{b.tag}</p>
              <ol className="flex-1">{b.nodes.map((n, i) => <li key={n.id}><Node node={n} />{i < b.nodes.length - 1 && <Arrow />}</li>)}</ol>
              <p className="mt-2 text-center text-xs font-medium text-slate-700 dark:text-slate-200">{b.then}</p>
            </section>
          );
        })}
      </div>
      <Arrow />
      <ol className="mx-auto max-w-md">
        {trunkBottom.map((n, i) => <li key={n.id}><Node node={n} delay={i} />{i < trunkBottom.length - 1 && <Arrow />}</li>)}
      </ol>
      {interactive && current && (
        <div role="status" aria-live="polite" className="mx-auto mt-6 max-w-md rounded-lg border-l-4 border-gold-500 bg-white p-4 text-sm leading-6 dark:bg-navy-950">
          <p className="flex items-center gap-2 font-semibold text-navy-800 dark:text-white"><Info size={16} aria-hidden />{current.n ? `${current.n}. ` : ""}{current.title}</p>
          <p className="mt-1">{current.text}.</p>
        </div>
      )}
      <p className="mt-4 text-xs italic text-slate-600 dark:text-slate-300">{note}</p>
    </figure>
  );
}
