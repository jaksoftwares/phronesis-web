const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');

// Brand Colors
const colors = {
  primary: '#163A5F', // Deep Blue
  secondary: '#197C7A', // Teal
  accent: '#D5A63A', // Knowledge Gold
  black: '#17212B', // Ink
  white: '#FFFFFF',
};

const palettes = {
  full: {
    name: 'full-color',
    bg: 'transparent',
    text: colors.primary,
    rings: colors.primary,
    books: colors.primary,
    tree: colors.secondary,
    sunburst: colors.accent,
  },
  blue: {
    name: 'deep-blue',
    bg: 'transparent',
    text: colors.primary,
    rings: colors.primary,
    books: colors.primary,
    tree: colors.primary,
    sunburst: colors.primary,
  },
  black: {
    name: 'black',
    bg: 'transparent',
    text: colors.black,
    rings: colors.black,
    books: colors.black,
    tree: colors.black,
    sunburst: colors.black,
  },
  white: {
    name: 'white',
    bg: 'transparent',
    text: colors.white,
    rings: colors.white,
    books: colors.white,
    tree: colors.white,
    sunburst: colors.white,
  }
};

const generateSunburst = (color) => {
  let lines = '';
  const numRays = 24;
  for (let i = 0; i < numRays; i++) {
    const angle = (i * 360) / numRays;
    const rad = (angle * Math.PI) / 180;
    
    // Skip rays pointing downwards into the books
    if (angle > 105 && angle < 255) continue;
    
    // Start rays outside the tree, end exactly at the inner ring (r=130)
    const r1 = 80;
    const r2 = 125; 
    
    const x1 = 200 + r1 * Math.sin(rad);
    const y1 = 200 - r1 * Math.cos(rad);
    const x2 = 200 + r2 * Math.sin(rad);
    const y2 = 200 - r2 * Math.cos(rad);
    lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>\n`;
  }
  return lines;
};

const generateBooks = (color, bg) => {
  const pageColor = bg === 'transparent' ? '#ffffff' : bg;
  return `
  <g>
    <!-- Bottom Book -->
    <rect x="110" y="275" width="180" height="16" fill="${color}" rx="3" />
    <rect x="110" y="279" width="180" height="5" fill="${pageColor}" opacity="0.7"/>

    <!-- Middle Book -->
    <rect x="130" y="255" width="140" height="16" fill="${color}" rx="3" />
    <rect x="130" y="259" width="140" height="5" fill="${pageColor}" opacity="0.7"/>

    <!-- Top Book -->
    <rect x="150" y="235" width="100" height="16" fill="${color}" rx="3" />
    <rect x="150" y="239" width="100" height="5" fill="${pageColor}" opacity="0.7"/>
  </g>
`};

const generateTree = (color) => `
  <!-- Main Trunk and primary branches originating perfectly from x=200 -->
  <path d="M200 235 C190 190, 180 170, 165 135" stroke="${color}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path d="M200 235 C210 190, 220 170, 235 135" stroke="${color}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path d="M200 235 L200 110" stroke="${color}" stroke-width="5" fill="none" stroke-linecap="round"/>
  
  <!-- Secondary Branches -->
  <path d="M185 180 C175 165, 155 150, 130 120" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M215 180 C225 165, 245 150, 270 120" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round"/>
  
  <path d="M195 150 C185 140, 175 125, 155 95" stroke="${color}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M205 150 C215 140, 225 125, 245 95" stroke="${color}" stroke-width="2.5" fill="none" stroke-linecap="round"/>

  <!-- Elegant Open Book Leaves -->
  <g fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Center Top -->
    <path d="M188 100 Q200 88 200 105 Q200 88 212 100 L200 110 Z" fill="${color}" />
    <!-- Center High -->
    <path d="M191 80 Q200 71 200 85 Q200 71 209 80 L200 90 Z" fill="${color}" />
    
    <!-- Left Branches -->
    <g transform="translate(130, 120) rotate(-30) scale(1.1)">
      <path d="M-12 -12 Q0 -24 0 -5 Q0 -24 12 -12 L0 0 Z" fill="${color}" />
    </g>
    <g transform="translate(165, 135) rotate(-20) scale(1.0)">
      <path d="M-12 -12 Q0 -24 0 -5 Q0 -24 12 -12 L0 0 Z" fill="${color}" />
    </g>
    <g transform="translate(155, 95) rotate(-25) scale(0.9)">
      <path d="M-12 -12 Q0 -24 0 -5 Q0 -24 12 -12 L0 0 Z" fill="${color}" />
    </g>

    <!-- Right Branches -->
    <g transform="translate(270, 120) rotate(30) scale(1.1)">
      <path d="M-12 -12 Q0 -24 0 -5 Q0 -24 12 -12 L0 0 Z" fill="${color}" />
    </g>
    <g transform="translate(235, 135) rotate(20) scale(1.0)">
      <path d="M-12 -12 Q0 -24 0 -5 Q0 -24 12 -12 L0 0 Z" fill="${color}" />
    </g>
    <g transform="translate(245, 95) rotate(25) scale(0.9)">
      <path d="M-12 -12 Q0 -24 0 -5 Q0 -24 12 -12 L0 0 Z" fill="${color}" />
    </g>
  </g>
`;

const generateEmblem = (palette) => `
  ${generateSunburst(palette.sunburst)}
  ${generateBooks(palette.books, palette.bg)}
  ${generateTree(palette.tree)}
`;

const drawTextArc = (text, cx, cy, r, startAngle, endAngle, paletteText, fontSize, fontWeight, isBottom) => {
  let result = '';
  const totalChars = text.length;
  if (totalChars <= 1) return result;
  
  const angleStep = (endAngle - startAngle) / (totalChars - 1);
  
  for (let i = 0; i < totalChars; i++) {
    const char = text[i];
    if (char === ' ') continue; // skip spaces
    
    const angleDeg = startAngle + (i * angleStep);
    const angleRad = (angleDeg * Math.PI) / 180;
    
    const x = cx + r * Math.cos(angleRad);
    const y = cy + r * Math.sin(angleRad);
    
    // Rotation of character
    const rotation = isBottom ? (angleDeg - 90) : (angleDeg + 90);
    
    result += `<text x="${x}" y="${y}" fill="${paletteText}" font-family="Segoe UI, Arial, sans-serif" font-weight="${fontWeight}" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle" transform="rotate(${rotation}, ${x}, ${y})">${char}</text>\n`;
  }
  return result;
};

const generateSeal = (palette) => `
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Outer Rings (Adjusted for perfect text spacing) -->
  <circle cx="200" cy="200" r="190" fill="none" stroke="${palette.rings}" stroke-width="4"/>
  <circle cx="200" cy="200" r="175" fill="none" stroke="${palette.rings}" stroke-width="1.5"/>
  <circle cx="200" cy="200" r="130" fill="none" stroke="${palette.rings}" stroke-width="1.5"/>
  
  <!-- Geometry-driven text arcs to completely bypass the librsvg textPath bug -->
  ${drawTextArc("PHRONESIS HOMESCHOOL", 200, 200, 152.5, -165, -15, palette.text, 28, 700, false)}
  ${drawTextArc("GENESIS OF KNOWLEDGE", 200, 200, 152.5, 155, 25, palette.text, 18, 600, true)}

  <!-- Decorative Stars pinned exactly at the path anchors -->
  <g fill="${palette.text}">
    <!-- Left Star -->
    <polygon points="0,-8 2,-2 8,-2 3,2 5,8 0,5 -5,8 -3,2 -8,-2 -2,-2" transform="translate(47.5, 200)" />
    <!-- Right Star -->
    <polygon points="0,-8 2,-2 8,-2 3,2 5,8 0,5 -5,8 -3,2 -8,-2 -2,-2" transform="translate(352.5, 200)" />
  </g>

  <!-- Center Emblem -->
  ${generateEmblem(palette)}
</svg>
`;

const generateMark = (palette) => `
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  ${generateEmblem(palette)}
</svg>
`;

const generateHorizontal = (palette) => `
<svg width="800" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Scale 0.45 makes seal width 180. Translate 40, 22 positions it at true x=18, y=10 -->
  <g transform="scale(0.45) translate(40, 22)">
    ${generateSeal(palette).replace(/<svg[^>]*>|<\/svg>/g, '')}
  </g>
  
  <!-- Vertical Separator Line in Gold/Accent color -->
  <line x1="220" y1="40" x2="220" y2="160" stroke="${palette.sunburst}" stroke-width="2" opacity="0.6" stroke-linecap="round"/>
  
  <!-- Text aligned to optical center. Font scale reduced. Teal used for HOMESCHOOL. -->
  <text x="250" y="98" fill="${palette.text}" font-family="Segoe UI, Arial, sans-serif" font-weight="800" font-size="38" letter-spacing="3">PHRONESIS</text>
  <text x="255" y="140" fill="${palette.tree}" font-family="Segoe UI, Arial, sans-serif" font-weight="500" font-size="24" letter-spacing="8">HOMESCHOOL</text>
</svg>
`;

const generateStacked = (palette) => `
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Large Seal! Scale 0.6 makes seal width 240. Centered at x=200 means left edge is 80. Translate x = 80/0.6 = 133.33 -->
  <g transform="scale(0.6) translate(133.33, 20)">
    ${generateSeal(palette).replace(/<svg[^>]*>|<\/svg>/g, '')}
  </g>
  
  <!-- Containment: Fonts made smaller so they don't exceed the 240px width of the seal -->
  <text x="200" y="295" fill="${palette.text}" font-family="Segoe UI, Arial, sans-serif" font-weight="800" font-size="26" letter-spacing="4" text-anchor="middle">PHRONESIS</text>
  <text x="200" y="325" fill="${palette.tree}" font-family="Segoe UI, Arial, sans-serif" font-weight="600" font-size="15" letter-spacing="10" text-anchor="middle">HOMESCHOOL</text>
  <text x="200" y="355" fill="${palette.sunburst}" font-family="Georgia, Times New Roman, serif" font-style="italic" font-weight="400" font-size="13" letter-spacing="1.5" text-anchor="middle">Genesis of Knowledge</text>
</svg>
`;

const generateProfile = (palette) => `
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Safe zone padding: Seal scaled by 2.2 = 880px width. Center is 540. Top left is 100. Translate 100/2.2 = 45.45 -->
  <g transform="scale(2.2) translate(45.45, 45.45)">
    ${generateSeal(palette).replace(/<svg[^>]*>|<\/svg>/g, '')}
  </g>
</svg>
`;

const generateBanner = (palette) => {
  const isDark = palette.name === 'white';
  const bgColor = isDark ? colors.primary : colors.white;
  
  return `
<svg width="1500" height="500" viewBox="0 0 1500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- Solid Background -->
  <rect width="1500" height="500" fill="${bgColor}"/>
  
  <!-- The Hero Graphic: Giant Emblem bleeding off the right edge -->
  <g transform="scale(3.5) translate(300, -20)" opacity="0.12">
    ${generateEmblem(palette)}
  </g>

  <!-- The Typography Layout -->
  <g transform="translate(100, 130)">
    <text x="0" y="60" fill="${palette.text}" font-family="Segoe UI, Arial, sans-serif" font-weight="800" font-size="95" letter-spacing="4">PHRONESIS</text>
    <text x="5" y="150" fill="${palette.tree}" font-family="Segoe UI, Arial, sans-serif" font-weight="500" font-size="55" letter-spacing="22">HOMESCHOOL</text>
    
    <!-- Delicate gold dividing line -->
    <line x1="5" y1="190" x2="200" y2="190" stroke="${palette.sunburst}" stroke-width="4" stroke-linecap="round"/>
    
    <text x="5" y="250" fill="${palette.sunburst}" font-family="Georgia, Times New Roman, serif" font-style="italic" font-weight="400" font-size="42" letter-spacing="2">Genesis of Knowledge</text>
  </g>
</svg>
`;
};

const outDir = path.join(__dirname, '../public/brand');

async function ensureDirs() {
  await fs.ensureDir(outDir);
  await fs.ensureDir(path.join(outDir, '01-master-seal'));
  await fs.ensureDir(path.join(outDir, '02-horizontal'));
  await fs.ensureDir(path.join(outDir, '03-stacked'));
  await fs.ensureDir(path.join(outDir, '04-mark'));
  await fs.ensureDir(path.join(outDir, '05-social-profile'));
  await fs.ensureDir(path.join(outDir, '06-social-banner'));
}

async function exportFormats(svgString, dir, filename, isWhite) {
  const svgPath = path.join(dir, `${filename}.svg`);
  const pngPath = path.join(dir, `${filename}.png`);
  const jpgPath = path.join(dir, `${filename}.jpg`);
  const pdfPath = path.join(dir, `${filename}.pdf`);

  await fs.writeFile(svgPath, svgString);

  const svgBuffer = Buffer.from(svgString);

  await sharp(svgBuffer)
    .png()
    .toFile(pngPath);

  await sharp(svgBuffer)
    .flatten({ background: isWhite ? colors.primary : colors.white })
    .jpeg({ quality: 100 })
    .toFile(jpgPath);

  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: [800, 800] });
    doc.pipe(fs.createWriteStream(pdfPath));
    if (isWhite) {
      doc.rect(0, 0, 800, 800).fill(colors.primary);
    }
    SVGtoPDF(doc, svgString, 0, 0);
    doc.end();
    resolve();
  });
}

async function run() {
  console.log('Generating Phronesis Homeschool Brand Assets with Flawless Geometry...');
  await ensureDirs();

  const structures = [
    { name: 'seal', fn: generateSeal, dir: '01-master-seal' },
    { name: 'horizontal', fn: generateHorizontal, dir: '02-horizontal' },
    { name: 'stacked', fn: generateStacked, dir: '03-stacked' },
    { name: 'mark', fn: generateMark, dir: '04-mark' },
    { name: 'profile', fn: generateProfile, dir: '05-social-profile' },
    { name: 'banner', fn: generateBanner, dir: '06-social-banner' },
  ];

  for (const [key, palette] of Object.entries(palettes)) {
    for (const struct of structures) {
      const svg = struct.fn(palette);
      const filename = `phronesis-${struct.name}-${palette.name}`;
      const fullDir = path.join(outDir, struct.dir);
      const isWhite = palette.name === 'white';
      
      console.log(`Exporting ${filename} (SVG, PNG, JPG, PDF)...`);
      await exportFormats(svg, fullDir, filename, isWhite);
    }
  }

  const markFullSvg = generateMark(palettes.full);
  const markBuffer = Buffer.from(markFullSvg);
  const faviconDir = path.join(__dirname, '../public');
  
  await sharp(markBuffer).resize(32, 32).png().toFile(path.join(faviconDir, 'favicon-32x32.png'));
  await sharp(markBuffer).resize(16, 16).png().toFile(path.join(faviconDir, 'favicon-16x16.png'));
  await sharp(markBuffer).resize(180, 180).png().toFile(path.join(faviconDir, 'apple-touch-icon.png'));

  console.log('\nSuccessfully generated all pristine vector brand assets!');
}

run().catch(console.error);
