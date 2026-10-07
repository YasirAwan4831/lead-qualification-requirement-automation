import Breadcrumbs from "@/components/shared/Breadcrumbs";
import WorkflowDiagram from "@/components/workflow/WorkflowDiagram";
import FlowStrip from "@/components/research/FlowStrip";
import ResponsiveTable from "@/components/research/ResponsiveTable";
import { Phases } from "@/components/research/Blocks";
import { blockOf, section } from "@/lib/content";

export const metadata = { title: "Workflow", description: "The proposed workflow, customer journey and automation stages for AI lead qualification and project requirement collection." };

export default function Workflow() {
  const intro = section(8).blocks.find((b) => b.type === "p").text;
  const journey = blockOf(7, "journey").rows;
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Overview", href: "/" }, { label: "Workflow" }]} />
      <h1 className="font-serif text-4xl font-bold text-navy-800 dark:text-white">Proposed workflow</h1>
      <p className="mt-3 max-w-[65ch] font-serif text-lg leading-8">{intro}</p>
      <FlowStrip steps={blockOf(8, "chain").steps} />
      <ResponsiveTable rows={blockOf(8, "table").rows} />
      <WorkflowDiagram />
      <h2 className="mt-10 font-sans text-2xl font-bold text-navy-800 dark:text-white">Customer journey</h2>
      <p className="mt-2 text-sm">The proposed journey from the customer's point of view, from inquiry to human follow-up.</p>
      <Phases rows={journey} />
    </div>
  );
}
