// Build gate. Scans compiled HTML for claims the governance documents forbid
// until an authorised owner has verified them against source documents.
// See Requirement.md 3.3 and research-notes.md.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const RULES = [
  {
    id: 'cin',
    label: 'Company identification number — unverified, sourced from a third-party registry',
    pattern: /U\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}/gi,
  },
  {
    id: 'section-8',
    label: 'Section 8 status — the licence has never been reviewed',
    pattern: /section\s*8\b/gi,
  },
  {
    id: 'tax-status',
    label: 'Tax exemption or CSR registration claim — no registration confirmed',
    pattern: /\b(80\s?-?G|12\s?-?A[AB]?|CSR-?1|FCRA)\b/gi,
  },
  {
    id: 'template-assets',
    label: 'Kidora template asset — not licensed for this site',
    pattern: /framerusercontent\.com/gi,
  },
  {
    id: 'preschool',
    label: 'Leftover preschool vocabulary from the template',
    pattern: /\b(ages?\s*\d+\s*[–—-]\s*\d+|preschool|kindergarten|nursery|toddler|sponsor a child)\b/gi,
  },
  {
    id: 'placeholder-contact',
    label: 'Invented contact detail from the placeholder build',
    pattern: /(\+91\s*22\s*4000\s*1234|hello@indoglobalskills\.org|14 Kalina Road)/gi,
  },
  {
    id: 'superlative',
    label: 'Superiority claim — prohibited until evidenced',
    // Matched against a following noun on purpose: a bare /the\s+best/ fires on
    // ordinary phrases like "the best interests of learners".
    pattern: /\b(?:leading|largest|best|foremost|official|number[- ]one)\s+(?:skills?|education(?:al)?|training|foundation|organisation|provider|institute|academy|ngo)\b/gi,
  },
  {
    id: 'fabricated-impact',
    label: 'Impact figure carried over from the placeholder build',
    pattern: /(2,400\+?|38\s+(?:learning\s+)?centres|96%\s*(?:daily\s*)?attendance|120\+\s*trained)/gi,
  },
];

export function findViolations(text, rules) {
  const out = [];
  for (const rule of rules) {
    const re = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g')
      ? rule.pattern.flags
      : `${rule.pattern.flags}g`);
    let m;
    while ((m = re.exec(text)) !== null) {
      out.push({ id: rule.id, label: rule.label, match: m[0] });
      if (m.index === re.lastIndex) re.lastIndex += 1;
    }
  }
  return out;
}

function htmlFiles(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...htmlFiles(full));
    else if (full.endsWith('.html')) found.push(full);
  }
  return found;
}

// CLI: `node scripts/content-guard.mjs dist`
if (process.argv[1] && process.argv[1].endsWith('content-guard.mjs')) {
  const dir = process.argv[2] || 'dist';
  let failures = 0;
  for (const file of htmlFiles(dir)) {
    for (const v of findViolations(readFileSync(file, 'utf8'), RULES)) {
      console.error(`${file}: [${v.id}] ${v.label} — found "${v.match}"`);
      failures += 1;
    }
  }
  if (failures > 0) {
    console.error(`\nContent guard failed: ${failures} forbidden claim(s) in ${dir}/.`);
    process.exit(1);
  }
  console.log(`Content guard passed — no forbidden claims in ${dir}/.`);
}
