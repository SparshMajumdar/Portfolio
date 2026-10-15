import * as THREE from "three";
import { resumeData } from "@/data/resumeData";

/**
 * Procedural CanvasTexture generator for the realistic archival book pages.
 * Features:
 * - Warm archival off-white / cream paper stock (#F3EFE6 to #EEE9DE)
 * - Authentic spine crease fold shadow on the binding edge
 * - Left page: Chapter number, chapter title, subtle decorative quote, page number
 * - Right page: Chapter content with editorial book typography, generous margins
 * - NO cards, NO dashboard widgets, NO glassmorphism, NO neon colors
 */

const CANVAS_WIDTH = 1536;
const CANVAS_HEIGHT = 2240;

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
}

let paperNoisePatternCache: CanvasPattern | null = null;

function applyPaperGrainNoise(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  opacity: number = 0.025
) {
  if (!paperNoisePatternCache && typeof document !== "undefined") {
    const size = 128;
    const nCanvas = document.createElement("canvas");
    nCanvas.width = size;
    nCanvas.height = size;
    const nCtx = nCanvas.getContext("2d");
    if (nCtx) {
      const imgData = nCtx.createImageData(size, size);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.floor(Math.random() * 255);
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
        data[i + 3] = 255;
      }
      nCtx.putImageData(imgData, 0, 0);
      paperNoisePatternCache = ctx.createPattern(nCanvas, "repeat");
    }
  }

  if (paperNoisePatternCache) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = paperNoisePatternCache;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
}

// Reusable paper background with spine crease shadow and subtle archival texture
function drawPaperBackground(ctx: CanvasRenderingContext2D, isLeftPage: boolean) {
  // Archival cream gradient
  const grad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (isLeftPage) {
    grad.addColorStop(0, "#F5F1E8");
    grad.addColorStop(0.7, "#EFE9DE");
    grad.addColorStop(1, "#E5DDD0"); // Darker near right binding edge
  } else {
    grad.addColorStop(0, "#E5DDD0"); // Darker near left binding edge
    grad.addColorStop(0.3, "#EFE9DE");
    grad.addColorStop(1, "#F5F1E8");
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Subtle paper grain noise (hardware-accelerated pattern overlay)
  applyPaperGrainNoise(ctx, CANVAS_WIDTH, CANVAS_HEIGHT, 0.025);

  // Center Spine Crease Fold Shadow (where left and right pages meet)
  if (isLeftPage) {
    // Spine is on the right
    const spineShadow = ctx.createLinearGradient(CANVAS_WIDTH - 140, 0, CANVAS_WIDTH, 0);
    spineShadow.addColorStop(0, "rgba(50, 40, 30, 0.0)");
    spineShadow.addColorStop(0.7, "rgba(50, 40, 30, 0.12)");
    spineShadow.addColorStop(1, "rgba(50, 40, 30, 0.32)");
    ctx.fillStyle = spineShadow;
    ctx.fillRect(CANVAS_WIDTH - 140, 0, 140, CANVAS_HEIGHT);

    // Subtle outer edge vignette
    const outerVignette = ctx.createLinearGradient(0, 0, 50, 0);
    outerVignette.addColorStop(0, "rgba(50, 40, 30, 0.08)");
    outerVignette.addColorStop(1, "rgba(50, 40, 30, 0.0)");
    ctx.fillStyle = outerVignette;
    ctx.fillRect(0, 0, 50, CANVAS_HEIGHT);
  } else {
    // Spine is on the left
    const spineShadow = ctx.createLinearGradient(0, 0, 140, 0);
    spineShadow.addColorStop(0, "rgba(50, 40, 30, 0.32)");
    spineShadow.addColorStop(0.3, "rgba(50, 40, 30, 0.12)");
    spineShadow.addColorStop(1, "rgba(50, 40, 30, 0.0)");
    ctx.fillStyle = spineShadow;
    ctx.fillRect(0, 0, 140, CANVAS_HEIGHT);

    // Subtle outer edge vignette
    const outerVignette = ctx.createLinearGradient(CANVAS_WIDTH - 50, 0, CANVAS_WIDTH, 0);
    outerVignette.addColorStop(0, "rgba(50, 40, 30, 0.0)");
    outerVignette.addColorStop(1, "rgba(50, 40, 30, 0.08)");
    ctx.fillStyle = outerVignette;
    ctx.fillRect(CANVAS_WIDTH - 50, 0, 50, CANVAS_HEIGHT);
  }
}

// Robust text wrapping utility supporting paragraphs, newlines, trimming, and alignment
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  startY: number,
  maxWidth: number,
  lineHeight: number
): number {
  if (!text) return startY;
  const paragraphs = text.split("\n");
  let y = startY;

  for (let p = 0; p < paragraphs.length; p++) {
    const words = paragraphs[p].split(" ");
    let line = "";

    for (let i = 0; i < words.length; i++) {
      const testLine = line ? line + " " + words[i] : words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line.length > 0) {
        ctx.fillText(line.trim(), x, y);
        line = words[i];
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    if (line.length > 0) {
      ctx.fillText(line.trim(), x, y);
      y += lineHeight;
    }
  }
  return y;
}

// Left Page Chapter Title Template (Consistent across all chapters)
function renderChapterTitlePage(
  ctx: CanvasRenderingContext2D,
  chapterNumber: string,
  title: string,
  subtitle: string,
  pageNumber: number
) {
  const padLeft = 160;
  const contentW = CANVAS_WIDTH - padLeft - 200;

  // Top Running Header
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#8C8275";
  ctx.textAlign = "left";
  ctx.fillText("RESUME & PORTFOLIO", padLeft, 140);

  // Subtle Header Divider
  ctx.strokeStyle = "#D8D0C3";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, 185);
  ctx.lineTo(padLeft + contentW, 185);
  ctx.stroke();

  // Vertical Centering Block for Chapter Title
  const centerY = 740;

  // Chapter Number (e.g. CHAPTER 01)
  ctx.font = "600 34px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#A85324";
  ctx.fillText(chapterNumber.toUpperCase(), padLeft, centerY);

  // Decorative Rule
  ctx.strokeStyle = "#A85324";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(padLeft, centerY + 36);
  ctx.lineTo(padLeft + 110, centerY + 36);
  ctx.stroke();

  // Chapter Title in Large Serif - dynamically sized so it never overflows contentW or runs into spine
  let titleSize = 92;
  ctx.font = `700 ${titleSize}px 'Playfair Display', Georgia, serif`;
  ctx.letterSpacing = "1px";
  ctx.fillStyle = "#181614";
  ctx.textBaseline = "top";

  const rawLines = title.split("\n");
  rawLines.forEach((rLine) => {
    while (ctx.measureText(rLine).width > contentW && titleSize > 56) {
      titleSize -= 4;
      ctx.font = `700 ${titleSize}px 'Playfair Display', Georgia, serif`;
    }
  });

  let curY = centerY + 80;
  rawLines.forEach((tLine) => {
    ctx.fillText(tLine, padLeft, curY);
    curY += titleSize * 1.15;
  });

  // Short Subtitle / Introductory Phrase
  ctx.font = "italic 400 42px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#4A453E";
  ctx.letterSpacing = "0.5px";
  wrapText(ctx, subtitle, padLeft, curY + 28, contentW, 56);

  // Minimal Geometric Ornament
  const ornamentY = 1520;
  ctx.fillStyle = "#B3A898";
  ctx.textAlign = "center";
  ctx.font = "32px 'Playfair Display', serif";
  ctx.fillText("✦   ◆   ✦", padLeft + contentW / 2, ornamentY);

  // Page Number at Bottom
  ctx.font = "600 28px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#7A7266";
  ctx.textAlign = "center";
  ctx.fillText(`— ${pageNumber} —`, padLeft + contentW / 2, CANVAS_HEIGHT - 130);
}

// -------------------------------------------------------------
// SPREAD 0: Inside Front Cover (Left) + Page 1 Author Page (Right)
// -------------------------------------------------------------
function renderSpread0Left(ctx: CanvasRenderingContext2D) {
  // Inside Front Cover / Endpaper
  drawPaperBackground(ctx, true);
  const padLeft = 160;
  const contentW = CANVAS_WIDTH - padLeft - 200;

  // Subtle bookplate frame
  const cx = padLeft + contentW / 2;
  const cy = CANVAS_HEIGHT / 2 - 40;

  ctx.strokeStyle = "#DDD5C7";
  ctx.lineWidth = 2;
  ctx.strokeRect(cx - 280, cy - 230, 560, 460);

  ctx.strokeStyle = "#EAE2D4";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(cx - 264, cy - 214, 528, 428);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#8C8275";
  ctx.fillText("EX LIBRIS", cx, cy - 130);

  ctx.font = "italic 400 52px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#2E2A25";
  ctx.fillText("Sparsh Majumdar", cx, cy - 30);

  ctx.font = "400 30px 'Inter', sans-serif";
  ctx.fillStyle = "#6E665A";
  ctx.fillText("Edition 2026", cx, cy + 50);

  ctx.fillStyle = "#B3A898";
  ctx.font = "28px 'Playfair Display', serif";
  ctx.fillText("✦", cx, cy + 130);
}

function renderSpread0Right(ctx: CanvasRenderingContext2D) {
  // Page 1 — Author Page
  drawPaperBackground(ctx, false);
  const padLeft = 200;
  const contentW = CANVAS_WIDTH - padLeft - 160;
  const centerX = padLeft + contentW / 2;

  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  // Label: AUTHOR
  ctx.font = "600 34px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "10px";
  ctx.fillStyle = "#A85324";
  ctx.fillText("A U T H O R", centerX, 480);

  // Small separator ornament
  ctx.strokeStyle = "#A85324";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(centerX - 45, 545);
  ctx.lineTo(centerX + 45, 545);
  ctx.stroke();

  // Name: SPARSH MAJUMDAR (dynamically fitted so it never exceeds contentW)
  let nameSize = 96;
  ctx.font = `700 ${nameSize}px 'Playfair Display', Georgia, serif`;
  ctx.letterSpacing = "2px";
  while (ctx.measureText("SPARSH MAJUMDAR").width > contentW - 40 && nameSize > 60) {
    nameSize -= 4;
    ctx.font = `700 ${nameSize}px 'Playfair Display', Georgia, serif`;
  }
  ctx.fillStyle = "#161412";
  ctx.fillText("SPARSH MAJUMDAR", centerX, 610);

  // Subtitle: Interactive Resume & Portfolio
  ctx.font = "400 40px 'Inter', sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillStyle = "#5E564B";
  ctx.fillText("Interactive Resume & Portfolio", centerX, 760);

  // Subtle decorative divider
  ctx.fillStyle = "#C2B7A6";
  ctx.font = "30px 'Playfair Display', serif";
  ctx.fillText("✦   ◆   ✦", centerX, 880);

  // Quote: "Every experience tells a story. This is mine."
  ctx.font = "italic 400 44px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#332F2A";
  wrapText(ctx, "“Every experience tells a story. This is mine.”", centerX, 980, contentW - 40, 56);

  // Page Number at Bottom
  ctx.font = "600 28px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#7A7266";
  ctx.fillText("— 1 —", centerX, CANVAS_HEIGHT - 130);
}

// -------------------------------------------------------------
// SPREAD 1: Page 2 (TOC Left) + Page 3 (TOC Entries Right)
// -------------------------------------------------------------
function renderSpread1Left(ctx: CanvasRenderingContext2D) {
  // Page 2 — Table of Contents Title
  drawPaperBackground(ctx, true);
  const padLeft = 160;
  const contentW = CANVAS_WIDTH - padLeft - 200;

  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  // Running Header
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#8C8275";
  ctx.fillText("TABLE OF CONTENTS", padLeft, 140);

  ctx.strokeStyle = "#D8D0C3";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, 185);
  ctx.lineTo(padLeft + contentW, 185);
  ctx.stroke();

  const startY = 700;

  ctx.font = "600 34px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#A85324";
  ctx.fillText("CONTENTS", padLeft, startY);

  ctx.strokeStyle = "#A85324";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(padLeft, startY + 36);
  ctx.lineTo(padLeft + 110, startY + 36);
  ctx.stroke();

  ctx.font = "700 96px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#181614";
  ctx.fillText("A GUIDE TO\nMY STORY", padLeft, startY + 80);

  ctx.font = "italic 400 42px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#4A453E";
  wrapText(
    ctx,
    "“A collection of my education, technical skills, projects, and professional journey.”",
    padLeft,
    startY + 320,
    contentW,
    58
  );

  // Subtle illustration ornament
  const ornamentY = 1520;
  ctx.fillStyle = "#B3A898";
  ctx.textAlign = "center";
  ctx.font = "32px 'Playfair Display', serif";
  ctx.fillText("✦   ◆   ✦", padLeft + contentW / 2, ornamentY);

  ctx.font = "600 28px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#7A7266";
  ctx.fillText("— 2 —", padLeft + contentW / 2, CANVAS_HEIGHT - 130);
}

function renderSpread1Right(ctx: CanvasRenderingContext2D) {
  // Page 3 — Table of Contents Entries
  drawPaperBackground(ctx, false);
  const padLeft = 200;
  const contentW = CANVAS_WIDTH - padLeft - 160;

  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  // Running Header
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#8C8275";
  ctx.fillText("CHAPTER INDEX", padLeft, 140);

  ctx.strokeStyle = "#D8D0C3";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, 185);
  ctx.lineTo(padLeft + contentW, 185);
  ctx.stroke();

  let entryY = 320;
  const entries = resumeData.tableOfContents.entries;

  entries.forEach((item) => {
    // Chapter number
    ctx.font = "600 34px 'JetBrains Mono', monospace";
    ctx.letterSpacing = "3px";
    ctx.fillStyle = "#A85324";
    ctx.fillText(item.chapterNum, padLeft, entryY);

    // Title
    ctx.font = "600 40px 'Playfair Display', Georgia, serif";
    ctx.fillStyle = "#181614";
    ctx.fillText(item.title, padLeft + 85, entryY - 3);

    // Dotted leader line
    const titleWidth = ctx.measureText(item.title).width;
    const dotsStartX = padLeft + 85 + titleWidth + 24;
    const pageNumText = item.pageNumber < 10 ? `0${item.pageNumber}` : `${item.pageNumber}`;
    const pageNumX = padLeft + contentW;

    ctx.font = "600 34px 'JetBrains Mono', monospace";
    const pageNumWidth = ctx.measureText(pageNumText).width;
    const dotsEndX = pageNumX - pageNumWidth - 24;

    ctx.fillStyle = "#C2B8A8";
    let dx = dotsStartX;
    while (dx < dotsEndX) {
      ctx.fillText(".", dx, entryY - 2);
      dx += 20;
    }

    // Page Number
    ctx.textAlign = "right";
    ctx.fillStyle = "#3A352F";
    ctx.fillText(pageNumText, pageNumX, entryY);
    ctx.textAlign = "left";

    // Subtle divider between entries
    ctx.strokeStyle = "#E8E1D4";
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(padLeft, entryY + 60);
    ctx.lineTo(padLeft + contentW, entryY + 60);
    ctx.stroke();

    entryY += 135;
  });

  // Short Note at Bottom of TOC
  ctx.font = "italic 400 30px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#6E665A";
  wrapText(ctx, "Click any entry to jump directly to that chapter.", padLeft, entryY + 40, contentW, 40);

  // Page Number at Bottom
  ctx.font = "600 28px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#7A7266";
  ctx.textAlign = "center";
  ctx.fillText("— 3 —", padLeft + contentW / 2, CANVAS_HEIGHT - 130);
}

// -------------------------------------------------------------
// SPREAD 2: Chapter 01 — Introduction
// -------------------------------------------------------------
function renderSpread2Left(ctx: CanvasRenderingContext2D) {
  // Page 4 — Chapter 01 Title Page
  drawPaperBackground(ctx, true);
  const data = resumeData.chapters.introduction.left;
  renderChapterTitlePage(ctx, data.number, data.title, data.subtitle, data.pageNumber);
}

function renderSpread2Right(ctx: CanvasRenderingContext2D) {
  // Page 5 — Chapter 01 Content
  drawPaperBackground(ctx, false);
  const padLeft = 200;
  const contentW = CANVAS_WIDTH - padLeft - 160;
  const data = resumeData.chapters.introduction.right;

  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  // Running Header
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#8C8275";
  ctx.fillText("INTRODUCTION & OBJECTIVES", padLeft, 140);

  ctx.strokeStyle = "#D8D0C3";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, 185);
  ctx.lineTo(padLeft + contentW, 185);
  ctx.stroke();

  let curY = 240;

  // Section 1: Professional Summary
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "4px";
  ctx.fillStyle = "#A85324";
  ctx.fillText("01.1 / PROFESSIONAL SUMMARY", padLeft, curY);
  curY += 46;

  ctx.font = "400 38px 'Inter', sans-serif";
  ctx.fillStyle = "#221F1C";
  curY = wrapText(ctx, data.professionalSummary, padLeft, curY, contentW, 56);
  curY += 32;

  // Section 2: Career Interests
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "4px";
  ctx.fillStyle = "#A85324";
  ctx.fillText("01.2 / CAREER INTERESTS", padLeft, curY);
  curY += 46;

  data.careerInterests.forEach((item) => {
    ctx.font = "400 32px 'Inter', sans-serif";
    ctx.fillStyle = "#332F2A";
    curY = wrapText(ctx, "— " + item, padLeft + 10, curY, contentW - 20, 44);
    curY += 8;
  });
  curY += 28;

  // Section 3: Technical Interests
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "4px";
  ctx.fillStyle = "#A85324";
  ctx.fillText("01.3 / TECHNICAL INTERESTS", padLeft, curY);
  curY += 46;

  data.technicalInterests.forEach((item) => {
    ctx.font = "400 32px 'Inter', sans-serif";
    ctx.fillStyle = "#332F2A";
    curY = wrapText(ctx, "— " + item, padLeft + 10, curY, contentW - 20, 44);
    curY += 8;
  });
  curY += 28;

  // Section 4: Professional Goals
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "4px";
  ctx.fillStyle = "#A85324";
  ctx.fillText("01.4 / PROFESSIONAL GOALS", padLeft, curY);
  curY += 46;

  data.professionalGoals.forEach((item) => {
    ctx.font = "400 32px 'Inter', sans-serif";
    ctx.fillStyle = "#332F2A";
    curY = wrapText(ctx, "— " + item, padLeft + 10, curY, contentW - 20, 44);
    curY += 8;
  });

  // Page Number at Bottom
  ctx.font = "600 28px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#7A7266";
  ctx.textAlign = "center";
  ctx.fillText("— 5 —", padLeft + contentW / 2, CANVAS_HEIGHT - 130);
}

// -------------------------------------------------------------
// SPREAD 3: Chapter 02 — Education
// -------------------------------------------------------------
function renderSpread3Left(ctx: CanvasRenderingContext2D) {
  // Page 6 — Chapter 02 Title Page
  drawPaperBackground(ctx, true);
  const data = resumeData.chapters.education.left;
  renderChapterTitlePage(ctx, data.number, data.title, data.subtitle, data.pageNumber);
}

function renderSpread3Right(ctx: CanvasRenderingContext2D) {
  // Page 7 — Chapter 02 Content
  drawPaperBackground(ctx, false);
  const padLeft = 200;
  const contentW = CANVAS_WIDTH - padLeft - 160;
  const data = resumeData.chapters.education.right;

  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  // Running Header
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#8C8275";
  ctx.fillText("ACADEMIC TIMELINE", padLeft, 140);

  ctx.strokeStyle = "#D8D0C3";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, 185);
  ctx.lineTo(padLeft + contentW, 185);
  ctx.stroke();

  let curY = 240;

  // Degree & Institution
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "4px";
  ctx.fillStyle = "#A85324";
  ctx.fillText("DEGREE & INSTITUTION", padLeft, curY);
  curY += 46;

  ctx.font = "700 52px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#181614";
  curY = wrapText(ctx, data.degree, padLeft, curY, contentW, 64);
  curY += 10;

  ctx.font = "600 38px 'Inter', sans-serif";
  ctx.fillStyle = "#3E3831";
  ctx.fillText(data.institution, padLeft, curY);
  curY += 50;

  ctx.font = "400 26px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#6E665A";
  curY = wrapText(ctx, `${data.period}  •  ${data.graduationYear}  •  ${data.location}`, padLeft, curY, contentW, 36);
  curY += 48;

  // Thin separator
  ctx.strokeStyle = "#E4DCD0";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, curY);
  ctx.lineTo(padLeft + contentW, curY);
  ctx.stroke();
  curY += 44;

  // Core Academic Focus
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "4px";
  ctx.fillStyle = "#A85324";
  ctx.fillText("CORE ACADEMIC FOCUS & COURSEWORK", padLeft, curY);
  curY += 46;

  data.focusAreas.forEach((item) => {
    ctx.font = "400 32px 'Inter', sans-serif";
    ctx.fillStyle = "#262320";
    curY = wrapText(ctx, "— " + item, padLeft + 10, curY, contentW - 20, 44);
    curY += 8;
  });
  curY += 36;

  // Academic Highlights
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "4px";
  ctx.fillStyle = "#A85324";
  ctx.fillText("ACADEMIC HIGHLIGHTS & ACTIVITIES", padLeft, curY);
  curY += 46;

  data.academicHighlights.forEach((item) => {
    ctx.font = "400 32px 'Inter', sans-serif";
    ctx.fillStyle = "#262320";
    curY = wrapText(ctx, "— " + item, padLeft + 10, curY, contentW - 20, 44);
    curY += 8;
  });

  // Page Number at Bottom
  ctx.font = "600 28px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#7A7266";
  ctx.textAlign = "center";
  ctx.fillText("— 7 —", padLeft + contentW / 2, CANVAS_HEIGHT - 130);
}

// -------------------------------------------------------------
// SPREAD 4: Chapter 03 — Projects
// -------------------------------------------------------------
function renderSpread4Left(ctx: CanvasRenderingContext2D) {
  // Page 8 — Chapter 03 Title Page
  drawPaperBackground(ctx, true);
  const data = resumeData.chapters.projects.left;
  renderChapterTitlePage(ctx, data.number, data.title, data.subtitle, data.pageNumber);
}

function renderSpread4Right(ctx: CanvasRenderingContext2D) {
  // Page 9 — Chapter 03 Content
  drawPaperBackground(ctx, false);
  const padLeft = 200;
  const contentW = CANVAS_WIDTH - padLeft - 160;
  const items = resumeData.chapters.projects.right.items;

  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  // Running Header
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#8C8275";
  ctx.fillText("SELECTED TECHNICAL ARTIFACTS", padLeft, 140);

  ctx.strokeStyle = "#D8D0C3";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, 185);
  ctx.lineTo(padLeft + contentW, 185);
  ctx.stroke();

  let curY = 230;

  // Project A
  const projA = items[0];
  ctx.font = "700 46px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#181614";
  ctx.fillText(projA.title, padLeft, curY);
  curY += 54;

  ctx.font = "italic 400 30px 'Playfair Display', serif";
  ctx.fillStyle = "#A85324";
  ctx.fillText(projA.subtitle, padLeft, curY);
  curY += 42;

  ctx.font = "400 32px 'Inter', sans-serif";
  ctx.fillStyle = "#2E2A25";
  curY = wrapText(ctx, projA.overview, padLeft, curY, contentW, 44);
  curY += 16;

  if (projA.problemStatement) {
    ctx.font = "600 26px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#6E665A";
    ctx.fillText("PROBLEM STATEMENT:", padLeft, curY);
    curY += 34;
    ctx.font = "400 30px 'Inter', sans-serif";
    ctx.fillStyle = "#3E3932";
    curY = wrapText(ctx, projA.problemStatement, padLeft, curY, contentW, 42);
    curY += 16;
  }

  ctx.font = "600 26px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#6E665A";
  ctx.fillText("TECHNOLOGIES & SERVICES:", padLeft, curY);
  curY += 34;
  ctx.font = "500 26px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#221F1C";
  curY = wrapText(ctx, projA.technologies.join("  •  "), padLeft, curY, contentW, 36);
  curY += 16;

  ctx.font = "600 26px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#6E665A";
  ctx.fillText("KEY IMPLEMENTATION:", padLeft, curY);
  curY += 34;
  projA.keyFeatures.forEach((feat) => {
    ctx.font = "400 30px 'Inter', sans-serif";
    ctx.fillStyle = "#332F2A";
    curY = wrapText(ctx, "— " + feat, padLeft + 10, curY, contentW - 20, 40);
    curY += 6;
  });
  curY += 14;

  // Project A Interactive Repository Button
  const projABtnY = Math.max(curY + 14, 880);
  const btnW = 420;
  const btnH = 64;

  ctx.fillStyle = "#A85324";
  ctx.fillRect(padLeft, projABtnY, btnW, btnH);

  ctx.font = "600 24px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.fillText("VIEW ON GITHUB ↗", padLeft + btnW / 2, projABtnY + 22);

  ctx.font = "400 22px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#6E665A";
  ctx.textAlign = "left";
  ctx.fillText(projA.githubUrl.replace("https://", ""), padLeft + btnW + 24, projABtnY + 22);

  curY = projABtnY + btnH + 34;

  // Thin divider between Project A and B
  ctx.strokeStyle = "#DDD5C7";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, curY);
  ctx.lineTo(padLeft + contentW, curY);
  ctx.stroke();
  curY += 36;

  // Project B
  const projB = items[1];
  ctx.font = "700 46px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#181614";
  ctx.fillText(projB.title, padLeft, curY);
  curY += 54;

  ctx.font = "italic 400 30px 'Playfair Display', serif";
  ctx.fillStyle = "#A85324";
  ctx.fillText(projB.subtitle, padLeft, curY);
  curY += 42;

  ctx.font = "400 32px 'Inter', sans-serif";
  ctx.fillStyle = "#2E2A25";
  curY = wrapText(ctx, projB.overview, padLeft, curY, contentW, 44);
  curY += 16;

  ctx.font = "600 26px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#6E665A";
  ctx.fillText("TECHNOLOGIES:", padLeft, curY);
  curY += 34;
  ctx.font = "500 26px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#221F1C";
  curY = wrapText(ctx, projB.technologies.join("  •  "), padLeft, curY, contentW, 36);
  curY += 16;

  ctx.font = "600 26px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#6E665A";
  ctx.fillText("KEY FEATURES:", padLeft, curY);
  curY += 34;
  projB.keyFeatures.forEach((feat) => {
    ctx.font = "400 30px 'Inter', sans-serif";
    ctx.fillStyle = "#332F2A";
    curY = wrapText(ctx, "— " + feat, padLeft + 10, curY, contentW - 20, 40);
    curY += 6;
  });
  curY += 14;

  // Project B Interactive Repository Button
  const projBBtnY = Math.max(curY + 14, 1540);
  const btnBW = 420;
  const btnBH = 64;

  ctx.fillStyle = "#A85324";
  ctx.fillRect(padLeft, projBBtnY, btnBW, btnBH);

  ctx.font = "600 24px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.fillText("VIEW ON GITHUB ↗", padLeft + btnBW / 2, projBBtnY + 22);

  ctx.font = "400 22px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#6E665A";
  ctx.textAlign = "left";
  ctx.fillText(projB.githubUrl.replace("https://", ""), padLeft + btnBW + 24, projBBtnY + 22);

  // Page Number at Bottom
  ctx.font = "600 28px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#7A7266";
  ctx.textAlign = "center";
  ctx.fillText("— 9 —", padLeft + contentW / 2, CANVAS_HEIGHT - 130);
}

// -------------------------------------------------------------
// SPREAD 5: Chapter 04 — Skills
// -------------------------------------------------------------
function renderSpread5Left(ctx: CanvasRenderingContext2D) {
  // Page 10 — Chapter 04 Title Page
  drawPaperBackground(ctx, true);
  const data = resumeData.chapters.skills.left;
  renderChapterTitlePage(ctx, data.number, data.title, data.subtitle, data.pageNumber);
}

function renderSpread5Right(ctx: CanvasRenderingContext2D) {
  // Page 11 — Chapter 04 Content
  drawPaperBackground(ctx, false);
  const padLeft = 200;
  const contentW = CANVAS_WIDTH - padLeft - 160;
  const groups = resumeData.chapters.skills.right.groups;

  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  // Running Header
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#8C8275";
  ctx.fillText("TECHNICAL REPERTOIRE", padLeft, 140);

  ctx.strokeStyle = "#D8D0C3";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, 185);
  ctx.lineTo(padLeft + contentW, 185);
  ctx.stroke();

  let curY = 240;

  groups.forEach((g) => {
    // Group Header
    ctx.font = "600 28px 'JetBrains Mono', monospace";
    ctx.letterSpacing = "4px";
    ctx.fillStyle = "#A85324";
    ctx.fillText(g.groupName.toUpperCase(), padLeft, curY);
    curY += 44;

    // Skills inline list with bold typographic styling
    ctx.font = "400 36px 'Inter', sans-serif";
    ctx.fillStyle = "#221F1C";
    curY = wrapText(ctx, g.skills.join("   •   "), padLeft, curY, contentW, 52);
    curY += 24;

    // Understated subtle divider line
    ctx.strokeStyle = "#E8E1D4";
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(padLeft, curY);
    ctx.lineTo(padLeft + contentW, curY);
    ctx.stroke();
    curY += 40;
  });

  // Understated footnote
  ctx.font = "italic 400 28px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#6E665A";
  wrapText(
    ctx,
    "Proficiencies verified through production projects, certifications, and systems coursework.",
    padLeft,
    curY + 20,
    contentW,
    38
  );

  // Page Number at Bottom
  ctx.font = "600 28px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#7A7266";
  ctx.textAlign = "center";
  ctx.fillText("— 11 —", padLeft + contentW / 2, CANVAS_HEIGHT - 130);
}

// -------------------------------------------------------------
// SPREAD 6: Chapter 05 — Contact
// -------------------------------------------------------------
function renderSpread6Left(ctx: CanvasRenderingContext2D) {
  // Page 12 — Chapter 05 Title Page
  drawPaperBackground(ctx, true);
  const data = resumeData.chapters.contact.left;
  renderChapterTitlePage(ctx, data.number, data.title, data.subtitle, data.pageNumber);
}

function renderSpread6Right(ctx: CanvasRenderingContext2D) {
  // Page 13 — Chapter 05 Content
  drawPaperBackground(ctx, false);
  const padLeft = 200;
  const contentW = CANVAS_WIDTH - padLeft - 160;
  const data = resumeData.chapters.contact.right;

  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  // Running Header
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#8C8275";
  ctx.fillText("COMMUNICATION CHANNELS", padLeft, 140);

  ctx.strokeStyle = "#D8D0C3";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, 185);
  ctx.lineTo(padLeft + contentW, 185);
  ctx.stroke();

  let curY = 240;

  // Invitation
  ctx.font = "italic 400 38px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#2E2A25";
  curY = wrapText(ctx, data.invitation, padLeft, curY, contentW, 54);
  curY += 46;

  // Fixed starting Y for contact items to ensure pixel-perfect layout and hit detection
  const contactStartY = Math.max(curY, 500);
  const itemHeight = 175;

  const contactItems = [
    {
      label: "01 / ELECTRONIC MAIL",
      value: data.email,
      buttonText: "SEND EMAIL ↗",
    },
    {
      label: "02 / LINKEDIN NETWORK",
      value: data.linkedin,
      buttonText: "OPEN LINKEDIN ↗",
    },
    {
      label: "03 / SOURCE CODE ARCHIVE (GITHUB)",
      value: data.github,
      buttonText: "OPEN GITHUB ↗",
    },
  ];

  contactItems.forEach((c, index) => {
    const itemY = contactStartY + index * itemHeight;

    // Label
    ctx.font = "600 26px 'JetBrains Mono', monospace";
    ctx.letterSpacing = "4px";
    ctx.fillStyle = "#A85324";
    ctx.textAlign = "left";
    ctx.fillText(c.label, padLeft, itemY);

    // Value (sized safely to 30px so it never collides with the button)
    ctx.font = "600 30px 'Inter', sans-serif";
    ctx.letterSpacing = "0px";
    ctx.fillStyle = "#181614";
    ctx.fillText(c.value, padLeft, itemY + 38);

    // Clickable Action Badge / Button on the right side
    if (c.buttonText) {
      const badgeW = 260;
      const badgeH = 52;
      const badgeX = padLeft + contentW - badgeW;
      const badgeY = itemY + 28;

      ctx.fillStyle = "#A85324";
      ctx.fillRect(badgeX, badgeY, badgeW, badgeH);

      ctx.font = "600 22px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.fillText(c.buttonText, badgeX + badgeW / 2, badgeY + 16);
      ctx.textAlign = "left";
    }

    // Divider line
    ctx.strokeStyle = "#E4DCD0";
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(padLeft, itemY + 104);
    ctx.lineTo(padLeft + contentW, itemY + 104);
    ctx.stroke();
  });

  // Short Note at Bottom of Contact Page
  ctx.font = "italic 400 28px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#6E665A";
  ctx.textAlign = "left";
  wrapText(
    ctx,
    "Click any channel above to connect or send a message directly.",
    padLeft,
    contactStartY + contactItems.length * itemHeight + 36,
    contentW,
    38
  );

  // Page Number at Bottom
  ctx.font = "600 28px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#7A7266";
  ctx.textAlign = "center";
  ctx.fillText("— 13 —", padLeft + contentW / 2, CANVAS_HEIGHT - 130);
}

// -------------------------------------------------------------
// SPREAD 7: Chapter 06 — Be a Co-Author
// -------------------------------------------------------------
function renderSpread7Left(ctx: CanvasRenderingContext2D) {
  // Page 14 — Chapter 06 Title Page
  drawPaperBackground(ctx, true);
  const data = resumeData.chapters.coAuthor.left;
  renderChapterTitlePage(ctx, data.number, data.title, data.subtitle, data.pageNumber);
}

function renderSpread7Right(ctx: CanvasRenderingContext2D) {
  // Page 15 — Chapter 06 Content
  drawPaperBackground(ctx, false);
  const padLeft = 200;
  const contentW = CANVAS_WIDTH - padLeft - 160;
  const data = resumeData.chapters.coAuthor.right;

  ctx.textBaseline = "top";
  ctx.textAlign = "left";

  // Running Header
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "#8C8275";
  ctx.fillText("COLLABORATION INVITATION", padLeft, 140);

  ctx.strokeStyle = "#D8D0C3";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, 185);
  ctx.lineTo(padLeft + contentW, 185);
  ctx.stroke();

  let curY = 250;

  // Editorial Heading
  ctx.font = "700 58px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#181614";
  curY = wrapText(ctx, data.heading, padLeft, curY, contentW, 70);
  curY += 24;

  // Invitation paragraph
  ctx.font = "400 35px 'Inter', sans-serif";
  ctx.fillStyle = "#2E2A25";
  curY = wrapText(ctx, data.invitation, padLeft, curY, contentW, 50);
  curY += 56;

  // Opportunities
  data.opportunities.forEach((opp) => {
    ctx.font = "600 34px 'Playfair Display', Georgia, serif";
    ctx.fillStyle = "#A85324";
    ctx.fillText("✦  " + opp.title, padLeft, curY);
    curY += 44;

    ctx.font = "400 30px 'Inter', sans-serif";
    ctx.fillStyle = "#3E3831";
    curY = wrapText(ctx, opp.description, padLeft + 30, curY, contentW - 30, 42);
    curY += 30;
  });

  curY += 36;

  // Action Button Visual Representations (Real actions triggered on click)
  const coAuthorBtnY = Math.max(curY + 20, 1060);
  const btnW = (contentW - 30) / 2;
  const btnH = 80;

  // Button 1: Connect on LinkedIn
  ctx.fillStyle = "#A85324";
  ctx.fillRect(padLeft, coAuthorBtnY, btnW, btnH);
  ctx.font = "600 28px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "center";
  ctx.fillText("LINKEDIN ↗", padLeft + btnW / 2, coAuthorBtnY + 28);

  // Button 2: Send Email
  ctx.fillStyle = "#2E2A25";
  ctx.fillRect(padLeft + btnW + 30, coAuthorBtnY, btnW, btnH);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText("SEND EMAIL ↗", padLeft + btnW + 30 + btnW / 2, coAuthorBtnY + 28);

  // Helper note
  ctx.font = "italic 400 26px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#6E665A";
  ctx.textAlign = "center";
  curY = wrapText(
    ctx,
    "Click either button above to connect on LinkedIn or send an email.",
    padLeft + contentW / 2,
    coAuthorBtnY + btnH + 34,
    contentW,
    36
  );

  // Closing Epilogue Remark
  ctx.font = "italic 600 36px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#A85324";
  ctx.textAlign = "center";
  ctx.fillText("“The book is not finished yet!”", padLeft + contentW / 2, curY + 36);

  ctx.font = "400 26px 'Inter', sans-serif";
  ctx.fillStyle = "#8C8275";
  wrapText(
    ctx,
    "New milestones, architectures, and chapters are constantly being written.",
    padLeft + contentW / 2,
    curY + 84,
    contentW,
    36
  );

  // Page Number at Bottom
  ctx.font = "600 28px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#7A7266";
  ctx.textAlign = "center";
  ctx.fillText("— 15 —", padLeft + contentW / 2, CANVAS_HEIGHT - 130);
}

// -------------------------------------------------------------
// Texture Factory Functions for Left and Right Pages
// -------------------------------------------------------------
export function createLeftPageTexture(spreadIndex: number): THREE.CanvasTexture | null {
  if (typeof window === "undefined") return null;

  const mobile = isMobileDevice();
  const canvas = document.createElement("canvas");
  canvas.width = mobile ? 1024 : CANVAS_WIDTH;
  canvas.height = mobile ? 1493 : CANVAS_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const scale = canvas.width / CANVAS_WIDTH;
  ctx.scale(scale, scale);

  switch (spreadIndex) {
    case 0:
      renderSpread0Left(ctx);
      break;
    case 1:
      renderSpread1Left(ctx);
      break;
    case 2:
      renderSpread2Left(ctx);
      break;
    case 3:
      renderSpread3Left(ctx);
      break;
    case 4:
      renderSpread4Left(ctx);
      break;
    case 5:
      renderSpread5Left(ctx);
      break;
    case 6:
      renderSpread6Left(ctx);
      break;
    case 7:
      renderSpread7Left(ctx);
      break;
    default:
      renderSpread0Left(ctx);
      break;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

export function createRightPageTexture(spreadIndex: number): THREE.CanvasTexture | null {
  if (typeof window === "undefined") return null;

  const mobile = isMobileDevice();
  const canvas = document.createElement("canvas");
  canvas.width = mobile ? 1024 : CANVAS_WIDTH;
  canvas.height = mobile ? 1493 : CANVAS_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const scale = canvas.width / CANVAS_WIDTH;
  ctx.scale(scale, scale);

  switch (spreadIndex) {
    case 0:
      renderSpread0Right(ctx);
      break;
    case 1:
      renderSpread1Right(ctx);
      break;
    case 2:
      renderSpread2Right(ctx);
      break;
    case 3:
      renderSpread3Right(ctx);
      break;
    case 4:
      renderSpread4Right(ctx);
      break;
    case 5:
      renderSpread5Right(ctx);
      break;
    case 6:
      renderSpread6Right(ctx);
      break;
    case 7:
      renderSpread7Right(ctx);
      break;
    default:
      renderSpread0Right(ctx);
      break;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

