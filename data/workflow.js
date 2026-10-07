// Transcribed from the workflow diagram in section 9 of the Task #03 document.
export const trunkTop = [
  { id: "n1", n: 1, title: "Customer Inquiry", text: "WhatsApp or website chat message" },
  { id: "n2", n: 2, title: "AI Message Understanding", text: "Reads the natural-language message" },
  { id: "n3", n: 3, title: "Service Identification", text: "Website, app, AI, marketing or other service" },
  { id: "n4", n: 4, title: "Requirement Extraction", text: "Name, business type, features, contact if shared" },
];
export const decision = { id: "d", title: "Missing Information?", text: "Compares what was extracted with what the team needs" };
export const branches = [
  { tag: "YES", tone: "yes", label: "Missing information", nodes: [
    { id: "b1", title: "AI Follow-Up Questions", text: "Asks for the missing details" },
    { id: "b2", title: "Customer Provides Details", text: "Replies with requirements" } ], then: "Continues to 5. Lead Qualification" },
  { tag: "NO: details sufficient", tone: "no", label: "Details sufficient", nodes: [], then: "Goes straight to 5. Lead Qualification" },
  { tag: "COMPLEX CASE", tone: "complex", label: "Complex or uncertain", nodes: [
    { id: "b3", title: "Human Escalation", text: "Team reviews the case directly" } ], then: "Uncertain or sensitive cases skip automation and go to 8. Human Follow-Up" },
];
export const trunkBottom = [
  { id: "n5", n: 5, title: "Lead Qualification", text: "General, service, potential lead or complex" },
  { id: "n6", n: 6, title: "Lead Record Creation", text: "Structured record prepared (Sheets or CRM)" },
  { id: "n7", n: 7, title: "Team Notification", text: "Email or CRM alert to the sales team" },
  { id: "n8", n: 8, title: "Human Follow-Up", text: "Team contacts a better-qualified lead", final: true },
];
export const note = "Proposed design for illustration. This is not a deployed system.";
