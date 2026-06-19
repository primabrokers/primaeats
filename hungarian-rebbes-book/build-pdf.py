import markdown, datetime, pathlib, re
from weasyprint import HTML

src = pathlib.Path("hungarian-rebbes-book/README.md").read_text(encoding="utf-8")

# Strip HTML placeholder comments so they don't show
src = re.sub(r'<!--.*?-->', '', src, flags=re.S)

html_body = markdown.markdown(
    src,
    extensions=["tables", "sane_lists", "attr_list", "smarty", "md_in_html"],
)

today = datetime.date.today().strftime("%-d %B %Y")

css = """
@page {
  size: A4;
  margin: 22mm 20mm 20mm 20mm;
  @bottom-center { content: counter(page); font-family: 'DejaVu Serif', serif;
                   font-size: 9pt; color: #888; }
}
* { box-sizing: border-box; }
body {
  font-family: 'DejaVu Serif', 'DejaVu Sans', serif;
  font-size: 10.8pt; line-height: 1.5; color: #1d1d1d; text-align: justify;
  hyphens: auto;
}
h1 {
  font-size: 24pt; line-height: 1.15; color: #5b2a1a; text-align: center;
  margin: 0 0 2pt 0; letter-spacing: .3px;
}
/* subtitle (first h2 directly after h1) */
h1 + h2 {
  font-size: 13pt; font-weight: normal; font-style: italic; color: #7a4a36;
  text-align: center; border: none; margin: 0 0 6pt 0; padding: 0;
}
h2 {
  font-size: 15.5pt; color: #5b2a1a; margin: 20pt 0 6pt 0;
  border-bottom: 1.5px solid #c9a98f; padding-bottom: 3pt;
  page-break-after: avoid;
}
h3 {
  font-size: 12.5pt; color: #6b3422; margin: 14pt 0 4pt 0;
  page-break-after: avoid;
}
p { margin: 0 0 7pt 0; }
strong { color: #1d1d1d; }
em { color: #333; }
a { color: #5b2a1a; text-decoration: none; }
ul, ol { margin: 0 0 8pt 0; padding-left: 20pt; }
li { margin: 0 0 3pt 0; text-align: left; }
hr {
  border: none; border-top: 1px solid #d8c4b4; margin: 12pt 0;
}
blockquote {
  background: #f7f1ea; border-left: 3px solid #b07a52;
  margin: 8pt 0; padding: 6pt 12pt; font-size: 10pt; color: #3a3027;
  page-break-inside: avoid; text-align: left;
}
blockquote p { margin: 0 0 4pt 0; }
blockquote p:last-child { margin-bottom: 0; }
table {
  border-collapse: collapse; width: 100%; margin: 8pt 0; font-size: 9.8pt;
  page-break-inside: avoid;
}
th, td {
  border: 1px solid #d2bba8; padding: 4pt 7pt; text-align: left;
  vertical-align: top;
}
th { background: #ead9c9; color: #4a2415; }
tr:nth-child(even) td { background: #faf6f1; }
/* draft banner */
.draftmeta {
  text-align: center; font-size: 9pt; color: #999; font-style: italic;
  margin-bottom: 14pt;
}
""".replace("__TODAY__", today)

doc = f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><style>{css}</style></head>
<body>
<div class="draftmeta">Working draft &middot; generated {today} &middot; layout &amp; full design to follow</div>
{html_body}
</body></html>"""

out = "hungarian-rebbes-book/In-the-Footsteps-of-the-Tzaddikim-DRAFT.pdf"
HTML(string=doc, base_url=".").write_pdf(out)
print("wrote", out)
