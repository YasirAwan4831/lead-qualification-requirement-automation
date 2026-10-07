"""Builds content/document.json (sections -> blocks) from content/research.json.
Usage: python3 scripts/build_content.py"""
import json, re, subprocess, collections
SRC = "source/research.pdf"
raw = json.load(open("content/research.json"))
CALLOUTS = {"Solution Design Notice", "Scenario, Not a Verified Fact", "Responsible AI Rule", "Principle"}
def slug(s): return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

blocks, i = [], 0
while i < len(raw):
    b = raw[i]; t = b["type"]
    if t == "h3" and b["text"] in CALLOUTS and i + 1 < len(raw) and raw[i + 1]["type"] in ("p", "h3"):
        blocks.append(dict(type="callout", title=b["text"], text=raw[i + 1]["text"], items=[])); i += 2; continue
    if t == "h3" and b["text"] == "Result." and blocks and blocks[-1]["type"] == "p":
        blocks[-1]["text"] += " Result."; i += 1; continue
    if t == "h3" and b["text"].startswith("Selected problem:"):
        blocks.append(dict(type="callout", title="Selected problem", text=b["text"].replace("Selected problem: ", ""), items=[])); i += 1; continue
    if t == "table":
        rows = b["rows"]; h = rows[0]
        if h[0] == "Business Name": blocks.append(dict(type="keyvalue", rows=rows))
        elif h[0] == "Customer Message":
            fu = [r for r in rows if r[0].startswith("AI Follow-Up")][0]
            q = [x.strip() for x in re.split(r"\s(?=\d\.\s)", fu[1]) if x.strip()]
            blocks.append(dict(type="scenario", rows=rows, questions=q))
        elif h[0] == "#" and len(h) == 4: blocks.append(dict(type="functions", rows=sorted([[r[0], r[1]] for r in rows[1:]] + [[r[2], r[3]] for r in rows[1:]], key=lambda r: int(r[0]))))
        elif h[0] == "Field" and len(h) == 4:
            blocks.append(dict(type="record", rows=[[r[0], r[1]] for r in rows[1:]] + [[r[2], r[3]] for r in rows[1:]]))
        elif h[0] == "1" and len(h) == 2: blocks.append(dict(type="numbered", rows=rows))
        elif h[0] == "Stage" and h[1] == "What Happens": blocks.append(dict(type="journey", rows=rows[1:]))
        elif h[0] == "Phase": blocks.append(dict(type="phases", rows=rows[1:]))
        else: blocks.append(dict(type="table", rows=rows))
    elif t in ("h1", "h2", "p", "li"):
        blocks.append({k: v for k, v in b.items()})
    i += 1
# the 21.1 end-to-end diagram arrives as scrambled text lines: replace it with a data block
out, skip = [], False
for b in blocks:
    if b["type"] == "h2" and b["text"].startswith("21.1"): out.append(b); out.append(dict(type="endtoend")); skip = True; continue
    if skip and b["type"] == "p" and not b["text"].startswith("Result:"): continue
    if skip and b["type"] == "p": out.append(b); skip = False; continue
    if skip and b["type"] == "h1": skip = False
    out.append(b)
blocks = out
for n, b in enumerate(blocks):
    if b["type"] == "p" and b["text"].startswith("Customer / Input →"): blocks[n] = dict(type="chain", steps=["Customer / Input", "AI Processing", "Automation", "Action", "Final Result"])
    if b["type"] == "p" and b["text"].startswith("The diagram shows the proposed flow"): blocks.insert(n + 1, dict(type="workflow")); break
sections, cur = [], None
for b in blocks:
    if b["type"] == "h1":
        m = re.match(r"^(\d+)\.\s+(.*)$", b["text"])
        cur = dict(id=slug(b["text"]), number=m.group(1), title=m.group(2), page=b["page"], blocks=[]); sections.append(cur)
    elif cur is not None:
        if b["type"] == "h2":
            m = re.match(r"^(\d+\.\d+)\s+(.*)$", b["text"]); b = dict(type="h2", id=slug(b["text"]), number=m.group(1), text=m.group(2))
        cur["blocks"].append({k: v for k, v in b.items() if k != "page"})
json.dump(sections, open("content/document.json", "w"), ensure_ascii=False, indent=1)
for s in sections: print(s["number"], s["title"][:40], [b["type"] for b in s["blocks"] if b["type"] not in ("p", "li", "h2")])
pdf_words = collections.Counter(re.findall(r"[A-Za-z0-9]+", subprocess.run(["pdftotext", "-f", "3", SRC, "-"], capture_output=True, text=True).stdout))
mine = collections.Counter(re.findall(r"[A-Za-z0-9]+", json.dumps(sections)))
skip_w = {"Zayan", "Soft", "Tech", "Internship", "Muhammad", "Yasir", "Practical", "Task", "Page", "Automation", "AI", "Lead", "Qualification", "Project", "Requirement", "03"}
print("missing:", {w: n - mine[w] for w, n in pdf_words.items() if n - mine[w] > 0 and w not in skip_w})
