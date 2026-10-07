import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ResponsiveTable from "@/components/research/ResponsiveTable";
import { Phases, Callout } from "@/components/research/Blocks";
import { blockOf, section } from "@/lib/content";

export const metadata = { title: "Implementation roadmap", description: "A proposed roadmap for how Zayan Soft Tech could deliver the solution as a client project, with risks, data privacy and cost considerations." };

export default function Roadmap() {
  const intro = section(18).blocks.find((b) => b.type === "p").text;
  const cost = section(19).blocks.filter((b) => b.type === "p").map((b) => b.text);
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Overview", href: "/" }, { label: "Implementation" }]} />
      <p className="text-sm font-semibold text-gold-700 dark:text-gold-300">Proposed future implementation</p>
      <h1 className="font-serif text-4xl font-bold text-navy-800 dark:text-white">Implementation roadmap</h1>
      <p className="mt-3 font-serif text-lg leading-8">{intro}</p>
      <div className="mt-8"><Phases rows={blockOf(18, "phases").rows} /></div>
      <h2 className="mt-12 font-sans text-2xl font-bold text-navy-800 dark:text-white">Risks and considerations</h2>
      <ResponsiveTable rows={blockOf(19, "table").rows} />
      <h3 className="font-sans text-lg font-semibold text-navy-800 dark:text-white">19.1 Cost and complexity</h3>
      <p className="mt-2 leading-7">{cost[cost.length - 1]}</p>
      <h2 className="mt-12 font-sans text-2xl font-bold text-navy-800 dark:text-white">Data privacy considerations</h2>
      <p className="mt-2 leading-7">{section(20).blocks.find((b) => b.type === "p").text}</p>
      <ResponsiveTable rows={blockOf(20, "table").rows} />
      <p className="text-sm"><Link className="font-semibold underline underline-offset-4" href="/docs/19-risks-considerations">Read these sections in the documentation</Link></p>
    </div>
  );
}
