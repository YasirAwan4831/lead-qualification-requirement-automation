import { ArrowDown, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ResponsiveTable from "@/components/research/ResponsiveTable";
import { RecordCard } from "@/components/research/Blocks";
import { blockOf } from "@/lib/content";

export const metadata = { title: "Technologies and proposed architecture", description: "Recommended technologies and the role of each in the proposed lead qualification automation. None of them is connected." };

export default function Architecture() {
  const layers = blockOf(13, "table").rows.slice(1);
  const roles = blockOf(14, "table");
  const chain = ["Customer", "WhatsApp / Website Chat", "OpenAI / ChatGPT", "n8n", "Google Sheets / CRM", "Email / CRM Notification", "Human Follow-Up"];
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Overview", href: "/" }, { label: "Technologies" }]} />
      <h1 className="font-serif text-4xl font-bold text-navy-800 dark:text-white">Technologies and proposed architecture</h1>
      <p className="mt-3 max-w-[65ch] font-serif text-lg leading-8">The tools below are recommendations for a future implementation. None of them is connected or running at this stage.</p>
      <figure className="not-prose my-8 rounded-xl border border-slate-200 bg-slate-50 p-4 font-sans sm:p-6 dark:border-white/10 dark:bg-navy-900/60">
        <figcaption className="mb-4 text-lg font-semibold text-navy-800 dark:text-white">Proposed architecture</figcaption>
        <ol className="flex flex-col items-stretch gap-1 lg:flex-row lg:items-center">
          {chain.map((c, i) => (
            <li key={c} className="flex flex-col items-center gap-1 lg:flex-1 lg:flex-row">
              <span className={`wf-node w-full rounded-lg border p-3 text-center text-sm font-semibold ${i === chain.length - 1 ? "bg-navy-800 text-white" : "bg-white dark:bg-navy-900"} border-slate-300 dark:border-white/20`} style={{ animationDelay: `${i * 80}ms` }}>{c}</span>
              {i < chain.length - 1 && (<><ArrowDown size={16} aria-hidden className="text-gold-600 lg:hidden" /><ArrowRight size={16} aria-hidden className="hidden shrink-0 text-gold-600 lg:block" /></>)}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs italic">Proposed design. Layers: communication, AI, automation, data, notification and human follow-up.</p>
      </figure>
      <h2 className="font-sans text-2xl font-bold text-navy-800 dark:text-white">Tools and technologies</h2>
      <ResponsiveTable rows={blockOf(13, "table").rows} />
      <h2 className="font-sans text-2xl font-bold text-navy-800 dark:text-white">Role of each technology</h2>
      <ResponsiveTable rows={roles.rows} />
      <h2 className="font-sans text-2xl font-bold text-navy-800 dark:text-white">Proposed lead record structure</h2>
      <RecordCard rows={blockOf(12, "record").rows} />
    </div>
  );
}
