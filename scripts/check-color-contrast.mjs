#!/usr/bin/env node
/**
 * Checa razão de contraste (WCAG 2.2, luminância relativa) entre os pares de
 * cor da LP. Node puro, sem dependências.
 *
 * Uso: npm run check:contrast
 * Sai com código 1 se algum par ficar abaixo do `min`.
 *
 * Pares com `min: 0` são INFORMATIVOS: medem separação de superfície ou
 * decoração, não legibilidade. Ficam aqui porque são justamente os números que
 * a próxima pessoa vai querer conferir antes de mexer no tom.
 */

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}
function relativeLuminance([r, g, b]) {
  const [rl, gl, bl] = [r, g, b].map((c) => {
    const ch = c / 255;
    return ch <= 0.03928 ? ch / 12.92 : ((ch + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}
function contrastRatio(a, b) {
  const lA = relativeLuminance(hexToRgb(a));
  const lB = relativeLuminance(hexToRgb(b));
  const [hi, lo] = lA > lB ? [lA, lB] : [lB, lA];
  return (hi + 0.05) / (lo + 0.05);
}

const L = {
  accent: "#3549b8",
  accentHover: "#2b3c9c",
  accentSoft: "#eef1fd",
  accentBorder: "#c9d2f6",
  onAccent: "#ffffff",
  onDark: "#ffffff",
  canvas: "#ffffff",
  surface: "#ffffff",
  surfaceRaised: "#ffffff",
  surfaceRecessed: "#f2f4fa",
  surfaceHover: "#f5f7fd",
  text: "#111827",
  textMuted: "#5b6478",
  textSubtle: "#8a93a6",
  textMutedOnRecessed: "#545d70",
  border: "#e4e7ef",
  borderStrong: "#cdd3e0",
  success: "#14722f",
  successSoft: "#e7f5ec",
};
const D = {
  accent: "#8ba3f8",
  accentHover: "#a2b5fa",
  accentSoft: "#151a2e",
  accentBorder: "#2a3358",
  onAccent: "#0b1020",
  onDark: "#ffffff",
  canvas: "#05060a",
  surface: "#0a0c12",
  surfaceRaised: "#0f121b",
  surfaceRecessed: "#141824",
  surfaceHover: "#12151f",
  text: "#e8ebf4",
  textMuted: "#98a1b6",
  textSubtle: "#6b7488",
  textMutedOnRecessed: "#9aa3b8",
  border: "#1b2030",
  borderStrong: "#2a3143",
  success: "#4ade80",
  successSoft: "#10241a",
};
const M = {
  bg: "#0d1017",
  border: "#232838",
  text: "#e8ebf4",
  muted: "#98a1b6",
};

const PAIRS = [
  // ── CLARO: texto ──
  { label: "L · text sobre canvas", fg: L.text, bg: L.canvas, min: 4.5 },
  { label: "L · text-muted sobre canvas", fg: L.textMuted, bg: L.canvas, min: 4.5 },
  { label: "L · text-muted sobre surface-hover", fg: L.textMuted, bg: L.surfaceHover, min: 4.5 },
  { label: "L · text-muted-on-recessed sobre surface-recessed", fg: L.textMutedOnRecessed, bg: L.surfaceRecessed, min: 4.5 },
  { label: "L · AVISO text-muted CRU sobre surface-recessed (por isso existe o -on-recessed)", fg: L.textMuted, bg: L.surfaceRecessed, min: 0 },
  { label: "L · text-subtle sobre canvas (decorativo, 3:1 de objeto)", fg: L.textSubtle, bg: L.canvas, min: 3 },
  // ── CLARO: ação ──
  { label: "L · accent como TEXTO sobre canvas (eyebrow, link, headline azul)", fg: L.accent, bg: L.canvas, min: 4.5 },
  { label: "L · accent como TEXTO sobre accent-soft (pill)", fg: L.accent, bg: L.accentSoft, min: 4.5 },
  { label: "L · on-accent sobre accent-strong (botão primário)", fg: L.onAccent, bg: L.accent, min: 4.5 },
  { label: "L · on-accent sobre accent-strong-hover", fg: L.onAccent, bg: L.accentHover, min: 4.5 },
  { label: "L · accent-strong vs canvas (botão como objeto de UI)", fg: L.accent, bg: L.canvas, min: 3 },
  { label: "L · accent-border vs canvas (borda de pill, objeto)", fg: L.accentBorder, bg: L.canvas, min: 0 },
  // ── CLARO: superfície ──
  { label: "L · border vs canvas (separação de card, objeto)", fg: L.border, bg: L.canvas, min: 0 },
  { label: "L · border-strong vs canvas", fg: L.borderStrong, bg: L.canvas, min: 0 },
  { label: "L · surface-recessed vs surface (degrau)", fg: L.surfaceRecessed, bg: L.surface, min: 0 },
  { label: "L · success sobre success-soft", fg: L.success, bg: L.successSoft, min: 4.5 },

  // ── ESCURO: texto ──
  { label: "D · text sobre canvas", fg: D.text, bg: D.canvas, min: 4.5 },
  { label: "D · text sobre surface", fg: D.text, bg: D.surface, min: 4.5 },
  { label: "D · text-muted sobre canvas", fg: D.textMuted, bg: D.canvas, min: 4.5 },
  { label: "D · text-muted sobre surface", fg: D.textMuted, bg: D.surface, min: 4.5 },
  { label: "D · text-muted sobre surface-raised", fg: D.textMuted, bg: D.surfaceRaised, min: 4.5 },
  { label: "D · text-muted-on-recessed sobre surface-recessed", fg: D.textMutedOnRecessed, bg: D.surfaceRecessed, min: 4.5 },
  { label: "D · text-subtle sobre canvas (decorativo)", fg: D.textSubtle, bg: D.canvas, min: 3 },
  // ── ESCURO: ação ──
  { label: "D · accent como TEXTO sobre canvas", fg: D.accent, bg: D.canvas, min: 4.5 },
  { label: "D · accent como TEXTO sobre surface", fg: D.accent, bg: D.surface, min: 4.5 },
  { label: "D · accent como TEXTO sobre accent-soft (pill)", fg: D.accent, bg: D.accentSoft, min: 4.5 },
  { label: "D · on-accent sobre accent-strong (botão: tinta ESCURA sobre fill claro)", fg: D.onAccent, bg: D.accent, min: 4.5 },
  { label: "D · on-accent sobre accent-strong-hover", fg: D.onAccent, bg: D.accentHover, min: 4.5 },
  { label: "D · AVISO tinta BRANCA sobre accent-strong (registro de por que on-accent inverte no escuro)", fg: "#ffffff", bg: D.accent, min: 0 },
  { label: "D · accent-strong vs canvas (botão como objeto de UI)", fg: D.accent, bg: D.canvas, min: 3 },
  // ── ESCURO: superfície ──
  { label: "D · border vs surface (separação de card, objeto)", fg: D.border, bg: D.surface, min: 0 },
  { label: "D · border-strong vs surface", fg: D.borderStrong, bg: D.surface, min: 0 },
  { label: "D · surface vs canvas (degrau)", fg: D.surface, bg: D.canvas, min: 0 },
  { label: "D · surface-raised vs canvas (degrau)", fg: D.surfaceRaised, bg: D.canvas, min: 0 },
  { label: "D · success sobre success-soft", fg: D.success, bg: D.successSoft, min: 4.5 },

  // ── MOCKUP (fixo nos dois temas) ──
  { label: "M · mockup-text sobre mockup-bg", fg: M.text, bg: M.bg, min: 4.5 },
  { label: "M · mockup-muted sobre mockup-bg", fg: M.muted, bg: M.bg, min: 4.5 },
  { label: "M · on-accent sobre accent (bolha enviada no mockup, tema escuro)", fg: D.onAccent, bg: D.accent, min: 4.5 },
  { label: "M · mockup-border vs mockup-bg (objeto)", fg: M.border, bg: M.bg, min: 0 },
];

let failed = 0;
const pad = Math.max(...PAIRS.map((p) => p.label.length));
for (const { label, fg, bg, min } of PAIRS) {
  const ratio = contrastRatio(fg, bg);
  const ok = ratio >= min;
  if (!ok) failed++;
  const tag = min === 0 ? "info" : ok ? "PASS" : "FAIL";
  const mark = min === 0 ? "  " : ok ? "OK" : "XX";
  console.log(
    `${mark} ${label.padEnd(pad)}  ${ratio.toFixed(3).padStart(7)}:1  ${
      min === 0 ? "(informativo)" : `min ${min}`
    }  ${tag}`,
  );
}
console.log(
  `\n${PAIRS.length} pares · ${PAIRS.filter((p) => p.min === 0).length} informativos · ${failed} reprovado(s)`,
);
process.exit(failed > 0 ? 1 : 0);
