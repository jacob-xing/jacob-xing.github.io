import React, { useRef, useEffect, useState } from 'react';
import './CadenceHome.css';

/* ── tiny SVG schematic components drawn on the canvas ─────────────────── */
const COMPONENTS = [
  { type: 'nmos',  x: 320, y: 180 },
  { type: 'pmos',  x: 320, y: 80  },
  { type: 'res',   x: 500, y: 150 },
  { type: 'cap',   x: 620, y: 200 },
  { type: 'vdd',   x: 320, y: 40  },
  { type: 'gnd',   x: 320, y: 260 },
  { type: 'nmos',  x: 700, y: 160 },
  { type: 'res',   x: 160, y: 140 },
  { type: 'cap',   x: 820, y: 120 },
];

/* wire path segments [x1,y1,x2,y2] */
const WIRES = [
  [320, 120, 320, 80],
  [320, 200, 320, 260],
  [360, 150, 500, 150],
  [500, 170, 500, 200],
  [500, 200, 620, 200],
  [620, 220, 620, 260],
  [320, 150, 360, 150],
  [700, 180, 820, 180],
  [820, 180, 820, 120],
  [160, 160, 320, 160],
  [700, 140, 700, 80],
  [620, 80, 700, 80],
  [320, 80, 620, 80],
];

function drawSchematic(ctx, width, height, panX = 0, panY = 0, zoom = 1) {
  ctx.clearRect(0, 0, width, height);

  /* canvas background */
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  /*
   * Dot grid — drawn in the same coordinate space as the CSS overlay.
   * The overlay transform is: translate(panX, panY) scale(zoom)
   * with transformOrigin at the canvas centre (cx, cy).
   * Equivalent matrix: screen = (world - centre) * zoom + centre + pan
   * We replicate that here so dots are pixel-perfect with the blocks.
   */
  ctx.save();
  const cx = width  / 2;
  const cy = height / 2;
  // Move to canvas centre, apply pan, scale, then move origin back
  ctx.translate(cx + panX, cy + panY);
  ctx.scale(zoom, zoom);
  ctx.translate(-cx, -cy);

  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  const spacing = 20;
  const dotR    = Math.max(0.4, 0.8 * zoom);

  // Compute the visible world-space bounding box so we only draw visible dots
  // Inverse of the transform above: world = (screen - pan - centre) / zoom + centre
  const invZoom = 1 / zoom;
  const worldLeft   = (0         - panX - cx) * invZoom + cx;
  const worldTop    = (0         - panY - cy) * invZoom + cy;
  const worldRight  = (width     - panX - cx) * invZoom + cx;
  const worldBottom = (height    - panY - cy) * invZoom + cy;

  const startX = Math.floor(worldLeft   / spacing) * spacing;
  const startY = Math.floor(worldTop    / spacing) * spacing;

  for (let x = startX; x <= worldRight  + spacing; x += spacing) {
    for (let y = startY; y <= worldBottom + spacing; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, dotR, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

function drawComponent(ctx, type, x, y) {
  ctx.strokeStyle = '#00cc00';
  ctx.fillStyle = '#000000';
  ctx.lineWidth = 1.5;

  if (type === 'nmos') {
    /* drain */
    ctx.beginPath(); ctx.moveTo(x, y - 20); ctx.lineTo(x + 10, y - 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 10, y - 25); ctx.lineTo(x + 10, y + 25); ctx.stroke();
    /* gate */
    ctx.beginPath(); ctx.moveTo(x - 20, y); ctx.lineTo(x + 8, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 12, y - 20); ctx.lineTo(x + 12, y + 20); ctx.stroke();
    /* source */
    ctx.beginPath(); ctx.moveTo(x, y + 20); ctx.lineTo(x + 10, y + 20); ctx.stroke();
    /* arrow */
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 10);
    ctx.lineTo(x + 4, y + 10);
    ctx.lineTo(x + 7, y + 5);
    ctx.closePath();
    ctx.fill();
  } else if (type === 'pmos') {
    /* drain */
    ctx.beginPath(); ctx.moveTo(x, y - 20); ctx.lineTo(x + 10, y - 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 10, y - 25); ctx.lineTo(x + 10, y + 25); ctx.stroke();
    /* gate */
    ctx.beginPath(); ctx.moveTo(x - 20, y); ctx.lineTo(x + 8, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 12, y - 20); ctx.lineTo(x + 12, y + 20); ctx.stroke();
    /* bubble */
    ctx.beginPath(); ctx.arc(x + 10, y, 3, 0, Math.PI * 2); ctx.stroke();
    /* source */
    ctx.beginPath(); ctx.moveTo(x, y + 20); ctx.lineTo(x + 10, y + 20); ctx.stroke();
  } else if (type === 'res') {
    ctx.beginPath(); ctx.moveTo(x, y - 20); ctx.lineTo(x, y - 14); ctx.stroke();
    ctx.beginPath();
    ctx.rect(x - 6, y - 14, 12, 28);
    ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y + 14); ctx.lineTo(x, y + 20); ctx.stroke();
  } else if (type === 'cap') {
    ctx.beginPath(); ctx.moveTo(x, y - 20); ctx.lineTo(x, y - 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 10, y - 4); ctx.lineTo(x + 10, y - 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 10, y + 4); ctx.lineTo(x + 10, y + 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y + 4); ctx.lineTo(x, y + 20); ctx.stroke();
  } else if (type === 'vdd') {
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 10, y - 10); ctx.lineTo(x + 10, y - 10); ctx.stroke();
    ctx.fillStyle = '#00cc00';
    ctx.font = '11px Courier New';
    ctx.fillText('VDD', x - 12, y - 13);
  } else if (type === 'gnd') {
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 10, y + 10); ctx.lineTo(x + 10, y + 10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 6, y + 14); ctx.lineTo(x + 6, y + 14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 2, y + 18); ctx.lineTo(x + 2, y + 18); ctx.stroke();
  }
}

/* ── Shared sub-components ─────────────────────────────────────────────── */

function MenuBar({ navigate, currentPage }) {
  const menus = [
    { label: 'File',    items: [] },
    { label: 'Edit',    items: [] },
    { label: 'View',    items: [] },
    { label: 'Navigate',items: [
      { label: 'Home',       page: 'home'       },
      { label: 'Education',  page: 'resume'     },
      { label: 'Experience', page: 'experience' },
      { label: 'Projects',   page: 'projects'   },
      { label: 'Contact',    page: 'contact'    },
    ]},
    { label: 'Design',  items: [] },
    { label: 'Tools',   items: [] },
    { label: 'Help',    items: [] },
  ];

  const [open, setOpen] = useState(null);

  return (
    <div className="cad-menubar" onMouseLeave={() => setOpen(null)}>
      <div className="cad-menubar-logo">Virtuoso® Schematic Editor XL</div>
      {menus.map((m, i) => (
        <div
          key={i}
          className={`cad-menu-item ${open === i ? 'open' : ''}`}
          onMouseEnter={() => setOpen(i)}
          onClick={() => setOpen(open === i ? null : i)}
        >
          {m.label}
          {open === i && m.items.length > 0 && (
            <div className="cad-dropdown">
              {m.items.map((it, j) => (
                <div key={j} className="cad-dropdown-item" onClick={() => { navigate(it.page); setOpen(null); }}>
                  {it.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Toolbar({ navigate, currentPage }) {
  const tools = [
    { label: '⊞', title: 'Home',       page: 'home'       },
    { label: '≡', title: 'Education',  page: 'resume'     },
    { label: '◉', title: 'Experience', page: 'experience' },
    { label: '◈', title: 'Projects',   page: 'projects'   },
    { label: '✉', title: 'Contact',    page: 'contact'    },
  ];

  return (
    <div className="cad-toolbar">
      {/* Standard tool icons — hidden on mobile */}
      <div className="cad-tool-group cad-toolbar-desktop-only">
        {['↩','↪','✂','⎘','⊕','⊖','🔍','⊡'].map((icon, i) => (
          <button key={i} className="cad-tool-btn" title={icon}>{icon}</button>
        ))}
      </div>
      <div className="cad-toolbar-sep cad-toolbar-desktop-only" />
      {/* Navigation shortcuts — icon+label on desktop, icon-only on mobile */}
      <div className="cad-tool-group">
        {tools.map((t, i) => (
          <button
            key={i}
            className={`cad-tool-btn cad-nav-btn ${currentPage === t.page ? 'active' : ''}`}
            title={t.title}
            onClick={() => navigate(t.page)}
          >
            {t.label}
            <span className="cad-tool-label cad-toolbar-desktop-only">{t.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StatusBar({ text, coords = '' }) {
  return (
    <div className="cad-statusbar">
      <span className="cad-status-cell">jacob-xing: schematic</span>
      <span className="cad-status-cell cad-status-sep">cellView: symbol</span>
      <span className="cad-status-cell">technology: gpdk045</span>
      <span className="cad-status-flex">{text}</span>
      <span className="cad-status-cell">{coords}</span>
    </div>
  );
}

/* ── Main Landing Page ─────────────────────────────────────────────────── */

/*
 * Layout of blocks on the canvas (all positions are % of canvas area):
 *
 *              [Resume]        [Experience]
 *                  \               /
 *              ── [  Identity  ] ──
 *                  /               \
 *            [Projects]         [Contact]
 *
 * Wires connect centre-block edges to the nearby nav block.
 */

// Block dimensions (px) — used for both CSS sizing and SVG wire math
const CENTER_W = 320;
const CENTER_H = 160;
const NAV_W    = 200;
const NAV_H    = 110;
const GAP_X    = 90;   // horizontal gap between center and side blocks
const GAP_Y    = 64;   // vertical gap between center and lower blocks

export default function CadenceHome({ resumeData, navigate }) {
  const canvasRef    = useRef(null);
  const containerRef = useRef(null);
  const [statusText, setStatusText] = useState('Welcome to Jacob Xing\'s portfolio. Click a button to navigate.');
  const [coords, setCoords] = useState('x: 0.000  y: 0.000');
  const [dims, setDims] = useState({ w: 800, h: 500 });
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 640);

  // Pan & zoom state
  const [pan,  setPan]  = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const dragRef = useRef(null); // { startX, startY, startPanX, startPanY }

  // Keep latest pan/zoom in refs so canvas redraws can always access them
  const panRef  = useRef({ x: 0, y: 0 });
  const zoomRef = useRef(1);

  // Sync refs whenever state changes
  useEffect(() => { panRef.current  = pan;  }, [pan]);
  useEffect(() => { zoomRef.current = zoom; }, [zoom]);

  // Clamp pan so schematic never goes fully off-screen
  const clampPan = (x, y, w, h) => {
    const margin = 120; // px — minimum visible content on each side
    const maxX =  w / 2 - margin;
    const maxY =  h / 2 - margin;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const redraw = () => {
      const ctx = canvas.getContext('2d');
      drawSchematic(ctx, canvas.width, canvas.height, panRef.current.x, panRef.current.y, zoomRef.current);
    };

    const resize = () => {
      canvas.width  = container.clientWidth;
      canvas.height = container.clientHeight;
      setDims({ w: container.clientWidth, h: container.clientHeight });
      redraw();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Redraw canvas whenever pan or zoom changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    drawSchematic(ctx, canvas.width, canvas.height, pan.x, pan.y, zoom);
  }, [pan, zoom]);

  // ── Drag helpers (use refs so imperative event listeners always see current values) ──
  const dimsRef = useRef({ w: 800, h: 500 });
  useEffect(() => { dimsRef.current = dims; }, [dims]);

  const startDrag = (clientX, clientY) => {
    dragRef.current = {
      startX: clientX,
      startY: clientY,
      startPanX: panRef.current.x,
      startPanY: panRef.current.y,
    };
  };

  const moveDrag = (clientX, clientY) => {
    if (!dragRef.current) return;
    const dx = clientX - dragRef.current.startX;
    const dy = clientY - dragRef.current.startY;
    const { w, h } = dimsRef.current;
    const newPan = clampPan(
      dragRef.current.startPanX + dx,
      dragRef.current.startPanY + dy,
      w,
      h,
    );
    setPan(newPan);
  };

  const endDrag = () => { dragRef.current = null; };

  // ── Mouse drag handlers ─────────────────────────────────────────────────────
  const onMouseDown = (e) => {
    // Only start drag on the canvas area itself (not on buttons/cards)
    if (e.target !== canvasRef.current) return;
    startDrag(e.clientX, e.clientY);
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    // Update status bar coordinates
    const r = containerRef.current?.getBoundingClientRect();
    if (r) {
      const x = (((e.clientX - r.left) - dims.w / 2 - pan.x) / (20 * zoom)).toFixed(3);
      const y = (((e.clientY - r.top)  - dims.h / 2 - pan.y) / (20 * zoom)).toFixed(3);
      setCoords(`x: ${x}  y: ${y}`);
    }
    moveDrag(e.clientX, e.clientY);
  };

  const onMouseUp = endDrag;

  // ── Scroll-to-zoom ─────────────────────────────────────────────────────────
  const onWheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 1 / 1.08;
    setZoom(prev => Math.max(0.3, Math.min(4, prev * factor)));
  };

  // Attach wheel AND touch events with { passive: false } so we can preventDefault
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
      // no preventDefault — lets taps fire click on child elements
    };

    const handleTouchMove = (e) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
      if (dragRef.current) e.preventDefault(); // suppress page scroll while panning
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    el.addEventListener('touchend', endDrag);
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', endDrag);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navButtons = [
    { label: 'Education',  page: 'resume',     desc: 'Academic background & degrees',    pos: 'left'  },
    { label: 'Experience', page: 'experience', desc: 'Work & internship history', pos: 'right' },
    { label: 'Projects',   page: 'projects',   desc: 'Engineering projects',      pos: 'bl'    },
    { label: 'Contact',    page: 'contact',    desc: 'Get in touch',              pos: 'br'    },
  ];

  // Canvas centre
  const cx = dims.w / 2;
  const cy = dims.h / 2;

  // Centre block top-left
  const cLeft = cx - CENTER_W / 2;
  const cTop  = cy - CENTER_H / 2;

  // Positions for each nav block
  const blockPos = {
    left:  { left: cLeft - NAV_W - GAP_X,             top: cy - NAV_H / 2              },
    right: { left: cLeft + CENTER_W + GAP_X,           top: cy - NAV_H / 2              },
    bl:    { left: cx - NAV_W - 10,                    top: cTop + CENTER_H + GAP_Y     },
    br:    { left: cx + 10,                            top: cTop + CENTER_H + GAP_Y     },
  };

  // 3 parallel wires per connection, offset ±6px perpendicular to wire direction.
  // Each wire runs between the connecting-edge midpoints of both blocks.
  const WIRE_OFFSETS = [-6, 0, 6];

  // Midpoints of the centre block's edges
  const cMidLeft   = cLeft;
  const cMidRight  = cLeft + CENTER_W;
  const cMidY      = cy;                   // vertical midpoint (left/right edges)
  const cBotY      = cTop + CENTER_H;      // bottom edge y

  // Midpoints of each nav block's connecting edge
  const navMid = {
    left:  { x: blockPos.left.left  + NAV_W,     y: blockPos.left.top  + NAV_H / 2 },
    right: { x: blockPos.right.left,              y: blockPos.right.top + NAV_H / 2 },
    bl:    { x: blockPos.bl.left    + NAV_W / 2,  y: blockPos.bl.top               },
    br:    { x: blockPos.br.left    + NAV_W / 2,  y: blockPos.br.top               },
  };

  const wires = [
    // left block → center left edge (horizontal, offset vertically)
    ...WIRE_OFFSETS.map(off => ({
      x1: navMid.left.x,  y1: navMid.left.y  + off,
      x2: cMidLeft,        y2: cMidY          + off,
    })),
    // center right edge → right block (horizontal, offset vertically)
    ...WIRE_OFFSETS.map(off => ({
      x1: cMidRight,       y1: cMidY          + off,
      x2: navMid.right.x,  y2: navMid.right.y + off,
    })),
    // center bottom edge → bl block top (vertical, offset horizontally)
    // wire lands on centre-block bottom directly above each nav block's top-centre
    ...WIRE_OFFSETS.map(off => ({
      x1: navMid.bl.x + off, y1: cBotY,
      x2: navMid.bl.x + off, y2: navMid.bl.y,
    })),
    // center bottom edge → br block top (vertical, offset horizontally)
    ...WIRE_OFFSETS.map(off => ({
      x1: navMid.br.x + off, y1: cBotY,
      x2: navMid.br.x + off, y2: navMid.br.y,
    })),
  ];

  // The transform origin is the canvas centre so zoom is centred
  const overlayTransform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;
  const isDragging = !!dragRef.current;
  const isMobile = dims.w < 640;

  // ── Mobile layout geometry ────────────────────────────────────────────────
  // Identity card sits near the top-centre; 4 nav buttons in a 2×2 grid below.
  const MOB_CARD_W  = Math.min(dims.w - 32, 320);
  const MOB_CARD_H  = 160;
  const MOB_NAV_W   = Math.floor((MOB_CARD_W - 12) / 2);  // two columns with 12px gap
  const MOB_NAV_H   = 80;
  const MOB_GAP_Y   = 48;   // gap between card bottom and nav grid top
  const MOB_ROW_GAP = 12;   // gap between top and bottom nav rows

  const mobCardLeft = (dims.w - MOB_CARD_W) / 2;
  const mobCardTop  = 32;
  const mobNavTop   = mobCardTop + MOB_CARD_H + MOB_GAP_Y;
  // nav grid x origins
  const mobNavLeft0 = mobCardLeft;                         // left column
  const mobNavLeft1 = mobCardLeft + MOB_NAV_W + 12;       // right column

  const mobBlockPos = [
    { left: mobNavLeft0, top: mobNavTop },                           // Education   (top-left)
    { left: mobNavLeft1, top: mobNavTop },                           // Experience  (top-right)
    { left: mobNavLeft0, top: mobNavTop + MOB_NAV_H + MOB_ROW_GAP },// Projects    (bot-left)
    { left: mobNavLeft1, top: mobNavTop + MOB_NAV_H + MOB_ROW_GAP },// Contact     (bot-right)
  ];

  // Wire midpoints for mobile: card bottom-centre → each nav block top-centre
  const mobCardBotY   = mobCardTop + MOB_CARD_H;
  const mobCardMidX   = mobCardLeft + MOB_CARD_W / 2;
  const MOB_WIRE_OFF  = [-4, 0, 4];

  const mobWires = isMobile ? [
    // vertical trunk from card bottom down to nav grid top
    ...MOB_WIRE_OFF.map(off => ({
      x1: mobCardMidX + off, y1: mobCardBotY,
      x2: mobCardMidX + off, y2: mobNavTop - 4,
    })),
    // branch left to Education top-centre
    ...MOB_WIRE_OFF.map(off => ({
      x1: mobNavLeft0 + MOB_NAV_W / 2 + off, y1: mobNavTop - 4,
      x2: mobNavLeft0 + MOB_NAV_W / 2 + off, y2: mobNavTop,
    })),
    // branch right to Experience top-centre
    ...MOB_WIRE_OFF.map(off => ({
      x1: mobNavLeft1 + MOB_NAV_W / 2 + off, y1: mobNavTop - 4,
      x2: mobNavLeft1 + MOB_NAV_W / 2 + off, y2: mobNavTop,
    })),
    // horizontal bus connecting the two top-nav blocks
    ...MOB_WIRE_OFF.map(off => ({
      x1: mobNavLeft0 + MOB_NAV_W / 2, y1: mobNavTop - 4 + off,
      x2: mobNavLeft1 + MOB_NAV_W / 2, y2: mobNavTop - 4 + off,
    })),
    // vertical drops from top-row block bottoms to bottom-row block tops
    ...MOB_WIRE_OFF.map(off => ({
      x1: mobNavLeft0 + MOB_NAV_W / 2 + off, y1: mobNavTop + MOB_NAV_H,
      x2: mobNavLeft0 + MOB_NAV_W / 2 + off, y2: mobNavTop + MOB_NAV_H + MOB_ROW_GAP,
    })),
    ...MOB_WIRE_OFF.map(off => ({
      x1: mobNavLeft1 + MOB_NAV_W / 2 + off, y1: mobNavTop + MOB_NAV_H,
      x2: mobNavLeft1 + MOB_NAV_W / 2 + off, y2: mobNavTop + MOB_NAV_H + MOB_ROW_GAP,
    })),
  ] : [];

  // Total mobile canvas height needed (for scroll)
  const mobTotalH = mobNavTop + MOB_NAV_H * 2 + MOB_ROW_GAP + 40;

  const identityCard = (cardLeft, cardTop, cardW) => (
    <div
      className="cad-identity-card"
      style={{ left: cardLeft, top: cardTop, width: cardW, minHeight: MOB_CARD_H }}
    >
      <div className="cad-identity-inner">
        <div className="cad-id-chip-symbol">
          <svg width="48" height="48" viewBox="0 0 48 48">
            <rect x="12" y="12" width="24" height="24" stroke="#00cc00" strokeWidth="1.5" fill="none"/>
            <line x1="0" y1="18" x2="12" y2="18" stroke="#00cc00" strokeWidth="1.5"/>
            <line x1="0" y1="24" x2="12" y2="24" stroke="#00cc00" strokeWidth="1.5"/>
            <line x1="0" y1="30" x2="12" y2="30" stroke="#00cc00" strokeWidth="1.5"/>
            <line x1="36" y1="18" x2="48" y2="18" stroke="#00cc00" strokeWidth="1.5"/>
            <line x1="36" y1="24" x2="48" y2="24" stroke="#00cc00" strokeWidth="1.5"/>
            <line x1="36" y1="30" x2="48" y2="30" stroke="#00cc00" strokeWidth="1.5"/>
            <text x="24" y="27" textAnchor="middle" fill="#00cc00" fontSize="8" fontFamily="Courier New">JX</text>
          </svg>
        </div>
        <div className="cad-id-info">
          <div className="cad-id-name">{resumeData.name}</div>
          <div className="cad-id-email">{resumeData.email}</div>
          <div className="cad-id-role">{resumeData.role} · {resumeData.university}</div>
          <div className="cad-id-social">
            {resumeData.socialLinks.map((s, i) => (
              <a key={i} href={s.url} className="cad-social-link" target="_blank" rel="noopener noreferrer">[{s.name}]</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="cad-root">
      <MenuBar navigate={navigate} currentPage="home" />
      <Toolbar navigate={navigate} currentPage="home" />

      {/* ── main body ── */}
      <div className="cad-body">

        {/* ── left component browser — hidden on mobile ── */}
        {!isMobile && (
          <div className={`cad-panel cad-left-panel${sidebarOpen ? '' : ' cad-panel-collapsed'}`}>
            <div className="cad-panel-title">
              Library Manager
              <button
                className="cad-panel-toggle"
                onClick={() => setSidebarOpen(o => !o)}
                title={sidebarOpen ? 'Collapse panel' : 'Expand panel'}
              >{sidebarOpen ? '◀' : '▶'}</button>
            </div>
            <div className="cad-panel-section">
              <div className="cad-panel-row header">Library</div>
              <div className="cad-panel-row selected">jacob-xing</div>
              <div className="cad-panel-row">analogLib</div>
              <div className="cad-panel-row">basic</div>
              <div className="cad-panel-row">gpdk045</div>
            </div>
            <div className="cad-panel-section">
              <div className="cad-panel-row header">Cell</div>
              <div className="cad-panel-row selected" onClick={() => navigate('home')} style={{cursor:'pointer'}}>portfolio</div>
              <div className="cad-panel-row" onClick={() => navigate('resume')} style={{cursor:'pointer'}}>education</div>
              <div className="cad-panel-row" onClick={() => navigate('experience')} style={{cursor:'pointer'}}>experience</div>
              <div className="cad-panel-row" onClick={() => navigate('projects')} style={{cursor:'pointer'}}>projects</div>
            </div>
            <div className="cad-panel-section">
              <div className="cad-panel-row header">View</div>
              <div className="cad-panel-row selected">schematic</div>
              <div className="cad-panel-row">symbol</div>
              <div className="cad-panel-row">layout</div>
            </div>
            <div className="cad-panel-title" style={{marginTop:'64px'}}>Properties</div>
            <div className="cad-prop-row"><span className="cad-prop-key">cellName</span><span className="cad-prop-val">portfolio</span></div>
            <div className="cad-prop-row"><span className="cad-prop-key">libName</span><span className="cad-prop-val">jacob-xing</span></div>
            <div className="cad-prop-row"><span className="cad-prop-key">viewName</span><span className="cad-prop-val">schematic</span></div>
            <div className="cad-prop-row"><span className="cad-prop-key">owner</span><span className="cad-prop-val">{resumeData.name}</span></div>
            <div className="cad-prop-row"><span className="cad-prop-key">email</span><span className="cad-prop-val">{resumeData.email}</span></div>
            <div className="cad-prop-row"><span className="cad-prop-key">technology</span><span className="cad-prop-val">gpdk045</span></div>
            <div className="cad-prop-row"><span className="cad-prop-key">units</span><span className="cad-prop-val">microns</span></div>
            <div className="cad-prop-row"><span className="cad-prop-key">grid</span><span className="cad-prop-val">0.05</span></div>

            <div className="cad-panel-title" style={{marginTop:'4px'}}>Net Highlights</div>
            {['VDD','GND','Vin','Vout','CLK'].map((n,i)=>(
              <div key={i} className="cad-prop-row">
                <span className="cad-net-dot" style={{background: i===0?'#ff4444':i===1?'#4488ff':'#00cc00'}} />
                <span className="cad-prop-val">{n}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── canvas ── */}
        <div
          className={`cad-canvas-area${isDragging ? ' cad-dragging' : ''}${isMobile ? ' cad-canvas-mobile' : ''}`}
          ref={containerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {/* canvas dot-grid — hidden on mobile (overlay scrolls past fixed canvas) */}
          {!isMobile && <canvas ref={canvasRef} className="cad-canvas" />}

          {isMobile ? (
            /* ── MOBILE overlay: vertical stacked layout, scrollable ── */
            <div
              className="cad-schematic-overlay cad-mobile-overlay"
              style={{ height: mobTotalH }}
            >
              <svg className="cad-wire-overlay" width={dims.w} height={mobTotalH}>
                {mobWires.map(({ x1, y1, x2, y2 }, i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#00cccc" strokeWidth="1.2" opacity="0.85" />
                ))}
              </svg>

              {identityCard(mobCardLeft, mobCardTop, MOB_CARD_W)}

              {navButtons.map((b, i) => {
                const pos = mobBlockPos[i];
                return (
                  <button
                    key={i}
                    className="cad-nav-big-btn"
                    style={{ left: pos.left, top: pos.top, width: MOB_NAV_W, height: MOB_NAV_H }}
                    onClick={() => navigate(b.page)}
                  >
                    <span className="cad-nav-btn-label">{b.label}</span>
                    <span className="cad-nav-btn-desc">{b.desc}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            /* ── DESKTOP overlay: pan/zoom schematic layout ── */
            <div
              className="cad-schematic-overlay"
              style={{
                transform: overlayTransform,
                transformOrigin: `${dims.w / 2}px ${dims.h / 2}px`,
              }}
            >
              {/* ── SVG wire overlay ── */}
              <svg className="cad-wire-overlay" width={dims.w} height={dims.h}>
                {wires.map(({ x1, y1, x2, y2 }, i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#00cccc" strokeWidth="1.2" opacity="0.85" />
                ))}
              </svg>

              {identityCard(cLeft, cTop, CENTER_W)}

              {/* ── Nav blocks ── */}
              {navButtons.map((b, i) => {
                const pos = blockPos[b.pos];
                return (
                  <button
                    key={i}
                    className="cad-nav-big-btn"
                    style={{ left: pos.left, top: pos.top, width: NAV_W, height: NAV_H }}
                    onClick={() => navigate(b.page)}
                    onMouseEnter={() => setStatusText(b.desc)}
                  >
                    <span className="cad-nav-btn-label">{b.label}</span>
                    <span className="cad-nav-btn-desc">{b.desc}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>

      <StatusBar text={statusText} coords={coords} />
    </div>
  );
}

export { MenuBar, Toolbar, StatusBar };
