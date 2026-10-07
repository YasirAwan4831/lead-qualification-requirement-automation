import document from "@/content/document.json";

export const sections = document;
export const getSection = (slug) => sections.find((s) => s.id === slug);
export const sectionLabel = (s) => `${s.number}. ${s.title}`;
export function neighbours(slug) {
  const i = sections.findIndex((s) => s.id === slug);
  return { prev: sections[i - 1] || null, next: sections[i + 1] || null };
}
export const headings = (section) => section.blocks.filter((b) => b.type === "h2");
export const section = (n) => sections.find((s) => s.number === String(n));
export const blockOf = (n, type, which = 0) => section(n).blocks.filter((b) => b.type === type)[which];
export const bodyRows = (n, type = "table", which = 0) => blockOf(n, type, which).rows.slice(1);

export function searchIndex() {
  const entries = [];
  const text = (b) => (b.rows ? b.rows.flat().join(" ") : b.steps ? b.steps.join(" ") : [b.title, b.text, ...(b.items || []), ...(b.questions || [])].filter(Boolean).join(" "));
  sections.forEach((s) => {
    let current = { anchor: "", heading: s.title, parts: [] };
    const push = () => current.parts.length && entries.push({ slug: s.id, anchor: current.anchor, sectionTitle: sectionLabel(s), heading: current.heading, text: current.parts.join(" ") });
    s.blocks.forEach((b) => {
      if (b.type === "h2") { push(); current = { anchor: b.id, heading: `${b.number} ${b.text}`, parts: [] }; }
      else current.parts.push(text(b));
    });
    push();
  });
  return entries;
}
