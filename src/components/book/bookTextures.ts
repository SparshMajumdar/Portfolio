import * as THREE from "three";

/**
 * Procedural texture generator for the 3D book and studio backdrop
 * Produces authentic high-resolution CanvasTextures for burnt orange covers, spine, back cover,
 * realistic page edges, and the checkerboard cyclorama backdrop.
 */

let noisePatternCache: CanvasPattern | null = null;

/**
 * Reusable GPU-friendly micro-grain noise pattern
 * Replaces multi-million iteration main thread CPU pixel loops with a cached pattern fill.
 */
function applyGrainNoise(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  opacity: number = 0.035
) {
  if (!noisePatternCache && typeof document !== "undefined") {
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
      noisePatternCache = ctx.createPattern(nCanvas, "repeat");
    }
  }

  if (noisePatternCache) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = noisePatternCache;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
}

/**
 * Shared helper for 4-pointed editorial star emblems
 */
function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  outerR: number,
  innerR: number
) {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i * Math.PI) / 4 - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

export function createCoverTexture(): THREE.CanvasTexture | null {
  if (typeof window === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 2900;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Radiant burnt orange base matching the reference image exactly
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#F76826");
  grad.addColorStop(0.4, "#EE5C1C");
  grad.addColorStop(1, "#DC4E12");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Fine matte paper/cloth micro-grain (optimized pattern overlay)
  applyGrainNoise(ctx, canvas.width, canvas.height, 0.035);

  // 3. Subtle debossed spine crease on left
  const creaseGrad = ctx.createLinearGradient(0, 0, 110, 0);
  creaseGrad.addColorStop(0, "rgba(0, 0, 0, 0.20)");
  creaseGrad.addColorStop(0.6, "rgba(0, 0, 0, 0.06)");
  creaseGrad.addColorStop(0.9, "rgba(255, 255, 255, 0.05)");
  creaseGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = creaseGrad;
  ctx.fillRect(0, 0, 110, canvas.height);

  // 4. Subtle hardcover perimeter deboss border
  ctx.strokeStyle = "rgba(0, 0, 0, 0.10)";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);

  // 5. Editorial Typography & Star Icons (matching reference image)
  ctx.save();
  ctx.fillStyle = "#161616"; // Dark charcoal debossed ink
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const centerX = canvas.width / 2 + 25; // slight offset for spine

  // Top 4-pointed star
  drawStar(ctx, centerX, 600, 48, 12);

  // Main Editorial Headline as Quote: "Don't book a Judge by its cover" - Nobody
  const titleY = 1120;
  const lineHeight = 180;

  ctx.font = "600 170px 'Playfair Display', Georgia, serif";
  ctx.fillText("“Don’t", centerX, titleY - lineHeight * 1.5);
  ctx.fillText("book a", centerX, titleY - lineHeight * 0.5);
  ctx.fillText("Judge by", centerX, titleY + lineHeight * 0.5);

  // "its cover”" with "cover”" in italic
  const baseLineY = titleY + lineHeight * 1.5;
  ctx.font = "600 170px 'Playfair Display', Georgia, serif";
  const itsWidth = ctx.measureText("its ").width;
  ctx.font = "italic 600 170px 'Playfair Display', Georgia, serif";
  const coverWidth = ctx.measureText("cover”").width;
  const fullWidth = itsWidth + coverWidth;
  const startX = centerX - fullWidth / 2;

  ctx.font = "600 170px 'Playfair Display', Georgia, serif";
  ctx.textAlign = "left";
  ctx.fillText("its ", startX, baseLineY);
  ctx.font = "italic 600 170px 'Playfair Display', Georgia, serif";
  ctx.fillText("cover”", startX + itsWidth, baseLineY);

  // Attribution: — Nobody
  ctx.textAlign = "center";
  ctx.font = "italic 500 58px 'Playfair Display', Georgia, serif";
  ctx.letterSpacing = "2px";
  ctx.fillStyle = "rgba(22, 22, 22, 0.85)";
  ctx.fillText("— Nobody", centerX, 1560);

  // Bottom 4-pointed star
  drawStar(ctx, centerX, 1720, 46, 11);

  // "OPEN TO EXPLORE" & Arrow
  ctx.font = "600 36px 'Inter', sans-serif";
  ctx.letterSpacing = "10px";
  ctx.fillStyle = "rgba(22, 22, 22, 0.85)";
  ctx.fillText("OPEN TO EXPLORE", centerX, 2000);

  // Arrow →
  ctx.font = "400 68px 'Inter', sans-serif";
  ctx.fillText("→", centerX, 2120);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  return texture;
}

export function createSpineTexture(): THREE.CanvasTexture | null {
  if (typeof window === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 2900;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base burnt orange
  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, "#DC4E12");
  grad.addColorStop(0.3, "#EE5C1C");
  grad.addColorStop(0.7, "#F76826");
  grad.addColorStop(1, "#D6470E");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle grain (optimized pattern overlay)
  applyGrainNoise(ctx, canvas.width, canvas.height, 0.035);

  // Spine markings matching reference image:
  ctx.save();
  ctx.fillStyle = "#161616";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const cx = canvas.width / 2;

  // Top marks: + — |
  ctx.font = "500 58px 'Inter', sans-serif";
  ctx.fillText("+", cx, 500);
  ctx.fillText("—", cx, 610);
  ctx.fillRect(cx - 3, 700, 6, 42);

  // Center star
  drawStar(ctx, cx, 1250, 34, 9);

  // Bottom marks: | — +
  ctx.fillRect(cx - 3, 2060, 6, 42);
  ctx.font = "500 58px 'Inter', sans-serif";
  ctx.fillText("—", cx, 2160);
  ctx.fillText("+", cx, 2270);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  return texture;
}

/**
 * Creates the authentic back cover texture for when the user rotates the book 360 degrees
 */
export function createBackCoverTexture(): THREE.CanvasTexture | null {
  if (typeof window === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 2900;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Radiant burnt orange base matching front cover exactly
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#F76826");
  grad.addColorStop(0.4, "#EE5C1C");
  grad.addColorStop(1, "#DC4E12");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Fine matte paper/cloth micro-grain matching front cover
  applyGrainNoise(ctx, canvas.width, canvas.height, 0.035);

  // 3. Subtle debossed spine crease on right (spine is on right when viewed from back)
  const creaseGrad = ctx.createLinearGradient(canvas.width, 0, canvas.width - 110, 0);
  creaseGrad.addColorStop(0, "rgba(0, 0, 0, 0.20)");
  creaseGrad.addColorStop(0.6, "rgba(0, 0, 0, 0.06)");
  creaseGrad.addColorStop(0.9, "rgba(255, 255, 255, 0.05)");
  creaseGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = creaseGrad;
  ctx.fillRect(canvas.width - 110, 0, 110, canvas.height);

  // 4. Subtle hardcover perimeter deboss border
  ctx.strokeStyle = "rgba(0, 0, 0, 0.10)";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(55, 55, canvas.width - 110, canvas.height - 110);

  // 5. Editorial Typography & Star Icons
  ctx.save();
  ctx.fillStyle = "#161616"; // Dark charcoal debossed ink matching front cover
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const cx = canvas.width / 2 - 25; // Slight offset to optical center

  // Top 4-pointed star
  drawStar(ctx, cx, 640, 50, 12);

  // Main Editorial Headline: "The book is not finished yet!"
  const titleY = 1140;
  const lineHeight = 195;

  ctx.font = "600 170px 'Playfair Display', Georgia, serif";
  ctx.fillText("The book is", cx, titleY - lineHeight * 0.7);

  // "not finished yet!" with elegant italic styling
  ctx.font = "italic 600 170px 'Playfair Display', Georgia, serif";
  ctx.fillText("not finished yet!", cx, titleY + lineHeight * 0.7);

  // Bottom 4-pointed star
  drawStar(ctx, cx, 1680, 50, 12);

  // Subtitle / Note
  ctx.font = "600 34px 'Inter', sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "rgba(22, 22, 22, 0.85)";
  ctx.fillText("NEW CHAPTERS UNDER DEVELOPMENT", cx, 1850);

  // Author byline
  ctx.font = "italic 500 44px 'Playfair Display', Georgia, serif";
  ctx.fillStyle = "#161616";
  ctx.letterSpacing = "1px";
  ctx.fillText("— Sparsh Majumdar", cx, 1960);

  // Divider Line
  ctx.strokeStyle = "rgba(22, 22, 22, 0.25)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 240, 2060);
  ctx.lineTo(cx + 240, 2060);
  ctx.stroke();

  // Core Competencies Pillars
  ctx.font = "600 28px 'Inter', sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "rgba(22, 22, 22, 0.75)";
  ctx.fillText("AZURE & AWS  •  DOCKER & CI/CD  •  IOT TELEMETRY", cx, 2140);

  // Realistic Barcode Block (Bottom Right)
  const barcodeX = canvas.width - 680;
  const barcodeY = canvas.height - 480;
  const barcodeW = 480;
  const barcodeH = 170;

  // Barcode box (warm off-white background)
  ctx.fillStyle = "#FAF7EE";
  ctx.fillRect(barcodeX, barcodeY, barcodeW, barcodeH);
  ctx.strokeStyle = "rgba(22, 22, 22, 0.3)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(barcodeX, barcodeY, barcodeW, barcodeH);

  // Draw procedural vertical bars
  ctx.fillStyle = "#161616";
  let curX = barcodeX + 24;
  const barTop = barcodeY + 18;
  const barH = 95;

  const barPattern = [3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 3, 2, 1, 3, 4, 2, 1, 3, 2, 4];
  for (let i = 0; i < barPattern.length; i++) {
    const w = barPattern[i] * 2.8;
    ctx.fillRect(curX, barTop, w, barH);
    curX += w + ((i % 3 === 0) ? 8 : 4);
    if (curX > barcodeX + barcodeW - 30) break;
  }

  // ISBN & text
  ctx.font = "600 18px 'JetBrains Mono', monospace";
  ctx.textAlign = "center";
  ctx.letterSpacing = "2px";
  ctx.fillText("ISBN 978-0-DEVOPS-2026", barcodeX + barcodeW / 2, barcodeY + 145);

  // Bottom left publisher seal
  ctx.textAlign = "left";
  ctx.font = "500 28px 'Inter', sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillStyle = "rgba(22, 22, 22, 0.85)";
  ctx.fillText("VIT-AP UNIVERSITY", 120, canvas.height - 420);
  ctx.font = "400 24px 'Inter', sans-serif";
  ctx.fillStyle = "rgba(22, 22, 22, 0.65)";
  ctx.fillText("B.Tech Computer Science '26", 120, canvas.height - 380);

  // Center bottom prompt
  ctx.textAlign = "center";
  ctx.font = "600 30px 'Inter', sans-serif";
  ctx.letterSpacing = "8px";
  ctx.fillStyle = "rgba(22, 22, 22, 0.8)";
  ctx.fillText("CLICK OR TAP TO OPEN RESUME →", cx, canvas.height - 200);

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  return texture;
}

/**
 * Creates realistic paper page edges texture
 */
export function createPageEdgesTexture(): THREE.CanvasTexture | null {
  if (typeof window === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Warm off-white / ivory page block
  ctx.fillStyle = "#FAF6ED";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle horizontal page lines mimicking tightly bound individual sheets
  for (let y = 0; y < canvas.height; y += 3) {
    const alpha = 0.05 + Math.random() * 0.08;
    ctx.fillStyle = `rgba(160, 140, 110, ${alpha})`;
    ctx.fillRect(0, y, canvas.width, 1);
  }

  // Edge darkening / vignette (subtle paper aging at the outer rims)
  const edgeShade = ctx.createLinearGradient(0, 0, canvas.width, 0);
  edgeShade.addColorStop(0, "rgba(0, 0, 0, 0.08)");
  edgeShade.addColorStop(0.08, "rgba(0, 0, 0, 0)");
  edgeShade.addColorStop(0.92, "rgba(0, 0, 0, 0)");
  edgeShade.addColorStop(1, "rgba(0, 0, 0, 0.09)");
  ctx.fillStyle = edgeShade;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates high-contrast checkerboard texture for the cyclorama backdrop
 * Sized and repeated to match the large studio squares in the reference image
 */
export function createCheckerboardTexture(): THREE.CanvasTexture | null {
  if (typeof window === "undefined") return null;

  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 2x2 fundamental checkerboard unit
  const tileSize = size / 2;

  // Pitch black & warm off-white alabaster matching reference image
  const darkColor = "#141416";
  const lightColor = "#ECE7DC";

  ctx.fillStyle = darkColor;
  ctx.fillRect(0, 0, tileSize, tileSize);
  ctx.fillRect(tileSize, tileSize, tileSize, tileSize);

  ctx.fillStyle = lightColor;
  ctx.fillRect(tileSize, 0, tileSize, tileSize);
  ctx.fillRect(0, tileSize, tileSize, tileSize);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1); // 1-to-1 repeat per coordinate unit
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  return texture;
}
