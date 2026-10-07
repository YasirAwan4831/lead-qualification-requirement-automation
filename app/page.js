import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  Building2,
  ClipboardList,
  Cog,
  Lightbulb,
  Scale,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { site } from "@/data/site";
import { sections, section, blockOf, bodyRows } from "@/lib/content";
import TypingLine from "@/components/ui/TypingLine";
import { Callout, EndToEnd } from "@/components/research/Blocks";
import WorkflowDiagram from "@/components/workflow/WorkflowDiagram";
import { ZayanLogo } from "@/components/ui/Logo";

/* ── Section heading (kept local) ───────────────────────── */
const H2 = ({ id, children, sub }) => (
  <>
    <h2
      id={id}
      className="font-serif text-3xl font-bold tracking-tight text-navy-800 dark:text-white sm:text-4xl"
    >
      {children}
    </h2>
    {sub && (
      <p className="mt-3 max-w-[70ch] text-base leading-7 text-slate-600 dark:text-slate-100">
        {sub}
      </p>
    )}
  </>
);

const wrap = "mx-auto max-w-[90rem] px-4 py-12 sm:px-6 sm:py-14";

export default function Home() {
  const profile = blockOf(2, "keyvalue").rows;
  const manual = bodyRows(3);
  const factors = bodyRows(5);
  const funcs = blockOf(6, "functions").rows;
  const cats = bodyRows(10);
  const tech = bodyRows(14);
  const humans = bodyRows(15);
  const benefits = bodyRows(16);
  const value = section(17).blocks
    .filter((b) => b.type === "li")
    .map((b) => b.text);
  const compare = bodyRows(21);
  const notice = blockOf(1, "callout");
  const rule = blockOf(10, "callout");
  const principle = blockOf(15, "callout");
  const problem = blockOf(4, "callout");
  const takeaways = blockOf(23, "numbered").rows;
  const concl = section(22).blocks.filter((b) => b.type === "p");

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO  (original background — unchanged)
         ══════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white">
        <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-20">
          <div>
            <p className="hero-rise text-sm font-semibold text-gold-300">
              {site.shortTitle} · {site.program} · {site.organization}
            </p>
            <h1 className="hero-rise-2 mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              {site.title}
            </h1>
            <p className="hero-rise-2 mt-4 max-w-[54ch] text-lg text-slate-200">
              {site.subtitle}
            </p>
            <div className="hero-rise-3">
              <TypingLine
                lines={[
                  "Read the inquiry and identify the service",
                  "Extract requirements, find what is missing",
                  "Ask short follow-up questions",
                  "Qualify the lead and prepare a record",
                  "Notify the team for human follow-up",
                ]}
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/docs/1-executive-summary"
                  className="btn btn-primary"
                >
                  Explore Solution <ArrowRight size={16} aria-hidden />
                </Link>
                <Link href="/workflow" className="btn btn-ghost">
                  Workflow Diagram
                </Link>
                <Link href="/architecture" className="btn btn-ghost">
                  Proposed Architecture
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-rise-3 rounded-xl border border-white/15 bg-white/5 p-5">
            <ZayanLogo height={40} />
            <dl className="mt-4 divide-y divide-white/10 text-sm">
              {site.overview.map(([k, v]) => (
                <div
                  key={k}
                  className="grid gap-1 py-2 sm:grid-cols-[9rem_1fr]"
                >
                  <dt className="text-gold-300">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          NOTICE CALLOUT
         ══════════════════════════════════════════════════════ */}
      <section className={wrap}>
        <Callout block={notice} />
      </section>

      {/* ══════════════════════════════════════════════════════
          BUSINESS OVERVIEW
         ══════════════════════════════════════════════════════ */}
      <section className={wrap} aria-labelledby="business">
        <H2
          id="business"
          sub="Star Developer is the sample business selected for this exercise. No claim is made about its real operations, staff, customers or systems."
        >
          <Building2
            className="mr-2 inline text-amber-500"
            size={26}
            aria-hidden
          />
          Business overview
        </H2>

        <dl className="card card-pad mt-8 divide-y divide-slate-200 text-sm leading-6 dark:divide-white/10">
          {profile.map(([k, v]) => (
            <div
              key={k}
              className="grid gap-1 py-3.5 first:pt-0 last:pb-0 sm:grid-cols-[12rem_1fr] sm:gap-4"
            >
              <dt className="font-semibold text-navy-800 dark:text-amber-300">
                {k}
              </dt>
              <dd className="text-slate-700 dark:text-slate-100">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROBLEM
         ══════════════════════════════════════════════════════ */}
      <section className={wrap} aria-labelledby="problem">
        <H2 id="problem" sub={problem.text}>
          <TriangleAlert
            className="mr-2 inline text-amber-500"
            size={26}
            aria-hidden
          />
          The identified business problem
        </H2>

        <ol className="mt-8 grid gap-3 md:grid-cols-5">
          {manual.map(([step, activity, lost]) => (
            <li key={step} className="card card-hover p-4 text-sm leading-6">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                {step}
              </p>
              <p className="mt-2 font-medium text-navy-800 dark:text-white">
                {activity}
              </p>
              <p className="mt-3 border-t border-slate-200 pt-3 text-slate-600 dark:border-white/10 dark:text-slate-100">
                <span className="font-semibold text-navy-800 dark:text-white">
                  Where time or quality is lost:{" "}
                </span>
                {lost}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-5 text-sm text-slate-600 dark:text-slate-100">
          An illustrative process used to find automation opportunities, not a
          record of Star Developer's actual workflow.{" "}
          <Link
            className="font-semibold text-amber-600 underline decoration-amber-400/50 underline-offset-4 transition-colors hover:text-amber-500 dark:text-amber-300 dark:hover:text-amber-200"
            href="/docs/4-identified-business-problem"
          >
            Read the full section
          </Link>
        </p>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROBLEM → SOLUTION
         ══════════════════════════════════════════════════════ */}
      <section className={wrap} aria-labelledby="ps">
        <H2 id="ps">From problem to proposed solution</H2>

        <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-center">
          <div className="card card-pad">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Business problem
            </p>
            <p className="mt-2 font-semibold text-navy-800 dark:text-white">
              Early-stage project inquiries are handled by hand: repetitive and
              easy to delay
            </p>
          </div>
          <ArrowDown aria-hidden className="mx-auto text-amber-500" />
          <div className="card card-pad">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              AI automation opportunity
            </p>
            <p className="mt-2 font-semibold text-navy-800 dark:text-white">
              Customer messages are varied natural language, which AI can read,
              where fixed rules struggle
            </p>
          </div>
          <ArrowDown aria-hidden className="mx-auto text-amber-500" />
          <div className="rounded-lg bg-navy-800 p-4 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-300">
              Proposed solution
            </p>
            <p className="mt-2 font-semibold">
              A first-line assistant that prepares every inquiry for a human
              team
            </p>
          </div>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {factors.map(([f, why]) => (
            <li key={f} className="card card-hover card-pad text-sm leading-6">
              <span className="font-semibold text-navy-800 dark:text-white">
                {f}:{" "}
              </span>
              <span className="text-slate-600 dark:text-slate-100">{why}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ══════════════════════════════════════════════════════
          SOLUTION FUNCTIONS
         ══════════════════════════════════════════════════════ */}
      <section className={wrap} aria-labelledby="solution">
        <H2
          id="solution"
          sub="Conceptually, the proposed automation would perform twelve functions. This is a designed solution. It is not a deployed system."
        >
          <Cog className="mr-2 inline text-amber-500" size={26} aria-hidden />
          Proposed AI automation solution
        </H2>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {funcs.map(([n, t]) => (
            <li
              key={n}
              className="card card-hover flex items-center gap-3 p-4 text-sm text-slate-700 dark:text-slate-100"
            >
              <span
                aria-hidden
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white dark:bg-gold-500 dark:text-navy-950"
              >
                {n}
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ══════════════════════════════════════════════════════
          WORKFLOW DIAGRAM
         ══════════════════════════════════════════════════════ */}
      <section className={wrap} aria-labelledby="flow">
        <H2 id="flow">Workflow diagram</H2>
        <div className="mt-6">
          <WorkflowDiagram />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          AI DECISION CATEGORIES
         ══════════════════════════════════════════════════════ */}
      <section className={wrap} aria-labelledby="cats">
        <H2
          id="cats"
          sub="The AI would sort each inquiry into one of four categories. The category decides what the automation does next."
        >
          <ClipboardList
            className="mr-2 inline text-amber-500"
            size={26}
            aria-hidden
          />
          AI decision and lead qualification
        </H2>

        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cats.map(([c, when, action], i) => (
            <li
              key={c}
              className={`card card-hover p-5 ${
                i === 2 ? "border-gold-500" : ""
              } ${i === 3 ? "border-red-500/60" : ""}`}
            >
              <p className="font-semibold tracking-tight text-navy-800 dark:text-white">
                {c.replace(/^\d+\.\s*/, "")}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-100">
                <span className="font-semibold text-navy-800 dark:text-white">
                  When:{" "}
                </span>
                {when}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-100">
                <span className="font-semibold text-navy-800 dark:text-white">
                  Proposed action:{" "}
                </span>
                {action}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Callout block={rule} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TOOLS & TECH
         ══════════════════════════════════════════════════════ */}
      <section className={wrap} aria-labelledby="tech">
        <H2
          id="tech"
          sub="Recommendations for a future implementation. None of them is connected or running at this stage."
        >
          <Lightbulb
            className="mr-2 inline text-amber-500"
            size={26}
            aria-hidden
          />
          Tools and technologies
        </H2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tech.map(([t, layer, role]) => (
            <li key={t} className="card card-hover card-pad">
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                {layer}
              </p>
              <p className="mt-1.5 font-semibold text-navy-800 dark:text-white">
                {t}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-100">
                {role}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ══════════════════════════════════════════════════════
          HUMAN + AI
         ══════════════════════════════════════════════════════ */}
      <section className={wrap} aria-labelledby="human">
        <H2 id="human" sub={principle.text}>
          <ShieldCheck
            className="mr-2 inline text-amber-500"
            size={26}
            aria-hidden
          />
          AI + human collaboration
        </H2>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {humans.map(([c, why]) => (
            <li key={c} className="card card-hover card-pad text-sm leading-6">
              <p className="font-semibold text-navy-800 dark:text-white">
                {c}
              </p>
              <p className="mt-1 text-slate-600 dark:text-slate-100">{why}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ══════════════════════════════════════════════════════
          BENEFITS
         ══════════════════════════════════════════════════════ */}
      <section className={wrap} aria-labelledby="benefits">
        <H2
          id="benefits"
          sub="Expected qualitative benefits of the design. No numerical improvements are claimed, because no measurements exist."
        >
          Business benefits
        </H2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(([b, how]) => (
            <li key={b} className="card card-hover card-pad">
              <p className="font-semibold tracking-tight text-navy-800 dark:text-white">
                {b}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-100">
                {how}
              </p>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 flex items-center font-sans text-xl font-semibold tracking-tight text-navy-800 dark:text-white">
          <Scale className="mr-2 text-amber-500" size={20} aria-hidden />
          Business value
        </h3>
        <ul className="mt-4 max-w-[75ch] list-disc space-y-2.5 pl-6 text-slate-700 marker:text-gold-500 dark:text-slate-100 leading-7">
          {value.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </section>

      {/* ══════════════════════════════════════════════════════
          COMPARISON TABLE
         ══════════════════════════════════════════════════════ */}
      <section className={wrap} aria-labelledby="compare">
        <H2 id="compare">Before vs proposed automation</H2>

        <div
          className="card mt-8 overflow-x-auto"
          tabIndex={0}
          role="region"
          aria-label="Comparison table, scrollable"
        >
          <table className="w-full min-w-[34rem] text-left text-sm leading-6">
            <thead className="bg-navy-800 text-white">
              <tr>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Process
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Traditional manual approach
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Proposed automation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/10">
              {compare.map(([p, a, b]) => (
                <tr
                  key={p}
                  className="transition-colors hover:bg-amber-50/40 dark:hover:bg-white/[0.02]"
                >
                  <th
                    scope="row"
                    className="px-5 py-4 font-semibold text-navy-800 dark:text-white"
                  >
                    {p}
                  </th>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-100">
                    {a}
                  </td>
                  <td className="px-5 py-4 text-slate-600 dark:text-slate-100">
                    {b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-12 font-sans text-xl font-semibold tracking-tight text-navy-800 dark:text-white">
          End-to-end solution summary
        </h3>
        <div className="mt-4">
          <EndToEnd />
        </div>

        <p className="mt-6 text-sm font-semibold text-amber-600 dark:text-amber-300">
          Result: an organized lead, a faster response, and a better business
          process.
        </p>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONCLUSION
         ══════════════════════════════════════════════════════ */}
      <section className={wrap} aria-labelledby="concl">
        <H2 id="concl">Conclusion</H2>

        <div className="mt-4 max-w-[75ch] space-y-5 font-serif text-lg leading-8 text-slate-700 dark:text-slate-100">
          {concl.map((p) => (
            <p key={p.text}>{p.text}</p>
          ))}
        </div>

        <h3 className="mt-12 font-sans text-xl font-semibold tracking-tight text-navy-800 dark:text-white">
          Key takeaways
        </h3>
        <ol className="mt-5 grid gap-3 md:grid-cols-2">
          {takeaways.map(([n, t]) => (
            <li
              key={n}
              className="card card-hover flex gap-4 p-4 text-sm leading-6"
            >
              <span className="font-bold text-gold-700 dark:text-gold-300">
                {n}
              </span>
              <span className="text-slate-700 dark:text-slate-100">{t}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}