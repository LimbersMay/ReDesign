#!/usr/bin/env node
/**
 * re-design-lint — checks templates against the ReDesign rules (AGENTS.md).
 * Zero dependencies. Works on Angular templates, JSX/TSX, plain HTML wireframes.
 *
 *   npx re-design-lint src                 # lint a folder
 *   npx re-design-lint src --format json   # machine-readable
 *   npx re-design-lint src --max-warnings 0
 *
 * Optional `.redesignrc.json` in the working directory:
 *   {
 *     "exclude": ["**\/*.spec.ts", "src/legacy/**"],
 *     "pages": ["src/app/features/help/**"],   // full-tab pages: bigger type allowed
 *     "rules": { "no-dark-variant": "off" }     // "error" | "warn" | "off"
 *   }
 *
 * Silence one line with a comment that says why:
 *   <!-- re-design-ignore-next-line closed-palette: brand color of a third-party logo -->
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname, sep } from 'node:path';

const EXTENSIONS = new Set(['.html', '.htm', '.tsx', '.jsx', '.ts', '.vue', '.svelte']);
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.angular', '.output', '.wxt', 'coverage', 'build']);

/** Line rules: a regex tested on each line that carries classes or markup. */
const LINE_RULES = [
  {
    id: 'closed-palette',
    level: 'error',
    re: /\b(?:bg|text|border(?:-[trblxy])?|ring|outline|fill|stroke|from|via|to|divide|accent|caret|decoration|shadow|placeholder)-(?:zinc|gray|neutral|stone|red|yellow|lime|green|cyan|blue|indigo|fuchsia|pink)-\d{2,3}\b/g,
    message: 'Color fuera de la paleta. Usa slate-* (neutros), brand-* (identidad) o un rol: rose (peligro), emerald (éxito), amber (aviso).',
  },
  {
    id: 'no-arbitrary-color',
    level: 'error',
    re: /\b(?:bg|text|border|ring|outline|fill|stroke|from|via|to|divide|accent|decoration)-\[(?!var\(--re-)[^\]]*(?:#|rgb|hsl|oklch|color-mix)/g,
    message: 'Color arbitrario. Los colores salen de los tokens (`bg-card`, `text-slate-700`, `bg-[var(--re-…)]`).',
  },
  {
    id: 'type-scale',
    level: 'error',
    re: /\btext-\[\d[^\]]*\]|\btext-3xs\b/g,
    message: 'Tamaño fuera de la escala. En el popup solo existen text-2xs (11px), text-xs (12px) y text-sm (14px).',
  },
  {
    id: 'type-scale-popup',
    level: 'warn',
    popupOnly: true,
    re: /\btext-(?:base|lg|xl|[2-9]xl)\b/g,
    message: 'Tamaño de página dentro del popup. text-base y mayores solo en páginas completas (ayuda, opciones): decláralas en "pages".',
  },
  {
    id: 'foreign-icons',
    level: 'error',
    re: /\bfa-(?:solid|regular|brands|light|thin|duotone)\b|\bfa[srbl]? fa-[a-z]|\bph(?:-bold|-fill|-light|-thin|-duotone)? ph-[a-z]|\bmaterial-(?:icons|symbols)\b/g,
    message: 'Set de iconos ajeno. La suite usa Lucide (@ng-icons/lucide, lucide-react o lucide en wireframes).',
  },
  {
    id: 'primary-white',
    level: 'error',
    test: (line) => /\bbg-primary\b/.test(line) && /\btext-white\b/.test(line),
    message: 'Texto blanco fijo sobre bg-primary: usa text-primary-foreground (en oscuro el texto es oscuro sobre pastel).',
  },
  {
    id: 'invalid-spacing',
    level: 'error',
    re: /(?<![\w-])-?(?:p[xytrbl]?|m[xytrbl]?|gap(?:-[xy])?|space-[xy]|[wh]|size|inset(?:-[xy])?|top|left|right|bottom|translate-[xy])-\d+\.(?!(?:25|5|75)\b)\d+\b/g,
    message: 'Valor de espaciado que Tailwind no genera (p. ej. py-0.2). Usa múltiplos de 0.25: 0.5, 1.5, 2.5…',
  },
  {
    id: 'no-dark-variant',
    level: 'warn',
    re: /(?:^|[\s"'`[(])dark:[\w[-]/g,
    message: 'Variante dark: innecesaria: la paleta se invierte sola. Úsala solo como excepción justificada con re-design-ignore-next-line.',
  },
  {
    id: 'legacy-token',
    level: 'warn',
    re: /var\(--re-brand\)|var\(--re-brand-contrast\)/g,
    message: 'Token inexistente. La marca es --re-brand-50…800; el texto sobre primario, --re-primary-foreground.',
  },
  {
    id: 'inline-style-color',
    level: 'warn',
    re: /style="[^"]*(?:#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\()/g,
    message: 'Color en style inline. Usa clases o variables --re-*.',
  },
];

/** Tag rules: a regex over the whole file, reported at the tag's line. */
const TAG_RULES = [
  {
    id: 'button-type',
    level: 'error',
    re: /<button\b(?![^>]*\s(?:type|\[type\]|\[attr\.type\])\s*=)[^>]*>/g,
    message: 'Botón sin type. Siempre type="button" (o "submit" en el botón que envía un formulario).',
  },
  {
    id: 'icon-button-label',
    level: 'warn',
    re: /<button\b(?=[^>]*\bre-icon-btn\b)(?![^>]*(?:aria-label|\[attr\.aria-label\]|\[ariaLabel\])\s*=)[^>]*>/g,
    message: 'Botón de solo icono sin aria-label (además del title).',
  },
];

// ---------------------------------------------------------------------------------------------

function parseArgs(argv) {
  const args = { paths: [], format: 'text', maxWarnings: Infinity, config: '.redesignrc.json' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--format') args.format = argv[++i];
    else if (a === '--max-warnings') args.maxWarnings = Number(argv[++i]);
    else if (a === '--config') args.config = argv[++i];
    else if (a === '-h' || a === '--help') args.help = true;
    else args.paths.push(a);
  }
  if (args.paths.length === 0) args.paths.push('src');
  return args;
}

function globToRegex(glob) {
  const escaped = glob
    .replace(/\\/g, '/')
    .replace(/[.+^${}()|[\]]/g, '\\$&')
    .replace(/\*\*\//g, '(?:.*/)?')
    .replace(/\*\*/g, '.*')
    .replace(/\*/g, '[^/]*')
    .replace(/\?/g, '[^/]');
  return new RegExp(`^${escaped}$`);
}

function loadConfig(path) {
  if (!existsSync(path)) return { exclude: [], pages: [], rules: {} };
  const raw = JSON.parse(readFileSync(path, 'utf8'));
  return { exclude: raw.exclude ?? [], pages: raw.pages ?? [], rules: raw.rules ?? {} };
}

function* walk(path) {
  const st = statSync(path);
  if (st.isFile()) {
    yield path;
    return;
  }
  for (const entry of readdirSync(path)) {
    if (SKIP_DIRS.has(entry) || entry.startsWith('.tmp')) continue;
    yield* walk(join(path, entry));
  }
}

/** In .ts files only lines that carry markup or classes are checked (inline templates, host classes). */
function isCheckedLine(line, ext) {
  if (ext !== '.ts') return true;
  return /class(?:Name)?\s*[=:]|<\w|@apply|\[class/.test(line);
}

function lineOf(text, index) {
  let line = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) line++;
  return line;
}

function ignoredRules(lines, i) {
  const own = lines[i] ?? '';
  const prev = lines[i - 1] ?? '';
  const ids = new Set();
  const collect = (src, marker) => {
    const at = src.indexOf(marker);
    if (at === -1) return false;
    const rest = src.slice(at + marker.length).trim();
    const id = rest.split(/[\s:]/)[0];
    if (!id || id.startsWith('-->') || id.startsWith('*/')) ids.add('*');
    else ids.add(id);
    return true;
  };
  collect(own, 're-design-ignore-line');
  collect(prev, 're-design-ignore-next-line');
  return ids;
}

function lintFile(file, cfg, root) {
  const ext = extname(file).toLowerCase();
  if (!EXTENSIONS.has(ext)) return [];
  const rel = relative(root, file).split(sep).join('/');
  if (cfg.excludeRe.some((re) => re.test(rel))) return [];
  const isPage = cfg.pagesRe.some((re) => re.test(rel));
  const text = readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const out = [];
  const levelOf = (rule) => cfg.rules[rule.id] ?? rule.level;
  const push = (rule, line, col, match) => {
    const level = levelOf(rule);
    if (level === 'off') return;
    const ignored = ignoredRules(lines, line - 1);
    if (ignored.has('*') || ignored.has(rule.id)) return;
    out.push({ file: rel, line, col, level, rule: rule.id, match, message: rule.message });
  };

  lines.forEach((line, i) => {
    if (!isCheckedLine(line, ext)) return;
    for (const rule of LINE_RULES) {
      if (rule.popupOnly && isPage) continue;
      if (rule.test) {
        if (rule.test(line)) push(rule, i + 1, 1, line.trim().slice(0, 60));
        continue;
      }
      rule.re.lastIndex = 0;
      let m;
      while ((m = rule.re.exec(line))) push(rule, i + 1, m.index + 1, m[0].trim());
    }
  });

  if (ext !== '.ts' || /template\s*:/.test(text)) {
    for (const rule of TAG_RULES) {
      rule.re.lastIndex = 0;
      let m;
      while ((m = rule.re.exec(text))) push(rule, lineOf(text, m.index), 1, m[0].slice(0, 60));
    }
  }
  return out;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log('Usage: re-design-lint [paths...] [--format text|json] [--max-warnings n] [--config file]');
    return;
  }
  const root = process.cwd();
  const raw = loadConfig(args.config);
  const cfg = {
    rules: raw.rules,
    excludeRe: raw.exclude.map(globToRegex),
    pagesRe: raw.pages.map(globToRegex),
  };

  const problems = [];
  for (const p of args.paths) {
    if (!existsSync(p)) {
      console.error(`re-design-lint: no existe ${p}`);
      process.exitCode = 2;
      continue;
    }
    for (const file of walk(p)) problems.push(...lintFile(file, cfg, root));
  }

  const errors = problems.filter((p) => p.level === 'error').length;
  const warnings = problems.length - errors;

  if (args.format === 'json') {
    console.log(JSON.stringify({ errors, warnings, problems }, null, 2));
  } else {
    let current = '';
    for (const p of problems) {
      if (p.file !== current) {
        current = p.file;
        console.log(`\n${p.file}`);
      }
      const tag = p.level === 'error' ? 'error' : 'warn ';
      console.log(`  ${String(p.line).padStart(4)}:${String(p.col).padEnd(3)} ${tag}  ${p.rule.padEnd(18)} ${p.match}`);
    }
    const byRule = {};
    for (const p of problems) byRule[p.rule] = (byRule[p.rule] ?? 0) + 1;
    if (problems.length) {
      console.log('\nPor regla:');
      for (const [id, n] of Object.entries(byRule).sort((a, b) => b[1] - a[1])) {
        const msg = [...LINE_RULES, ...TAG_RULES].find((r) => r.id === id)?.message ?? '';
        console.log(`  ${String(n).padStart(4)}  ${id.padEnd(18)} ${msg}`);
      }
    }
    console.log(`\n${errors} errores, ${warnings} avisos`);
  }

  if (errors > 0 || warnings > args.maxWarnings) process.exitCode = 1;
}

main();
