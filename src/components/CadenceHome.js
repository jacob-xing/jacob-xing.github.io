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

function drawSchematic(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  /* canvas background */
  ctx.fillStyle = '#1e2e1e';
  ctx.fillRect(0, 0, width, height);

  /* dot grid */
  ctx.fillStyle = 'rgba(0,180,0,0.35)';
  const spacing = 20;
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* wires */
  ctx.strokeStyle = '#00cc00';
  ctx.lineWidth = 1.5;
  WIRES.forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  /* junction dots */
  ctx.fillStyle = '#00cc00';
  [[320, 80], [500, 200], [320, 160]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  /* draw each component */
  COMPONENTS.forEach(({ type, x, y }) => drawComponent(ctx, type, x, y));
}

function drawComponent(ctx, type, x, y) {
  ctx.strokeStyle = '#00cc00';
  ctx.fillStyle = '#1e2e1e';
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
      { label: 'Resume',     page: 'resume'     },
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
    { label: '≡', title: 'Resume',     page: 'resume'     },
    { label: '◉', title: 'Experience', page: 'experience' },
    { label: '◈', title: 'Projects',   page: 'projects'   },
    { label: '✉', title: 'Contact',    page: 'contact'    },
  ];

  return (
    <div className="cad-toolbar">
      {/* Standard tool icons */}
      <div className="cad-tool-group">
        {['↩','↪','✂','⎘','⊕','⊖','🔍','⊡'].map((icon, i) => (
          <button key={i} className="cad-tool-btn" title={icon}>{icon}</button>
        ))}
      </div>
      <div className="cad-toolbar-sep" />
      {/* Navigation shortcuts */}
      <div className="cad-tool-group">
        {tools.map((t, i) => (
          <button
            key={i}
            className={`cad-tool-btn cad-nav-btn ${currentPage === t.page ? 'active' : ''}`}
            title={t.title}
            onClick={() => navigate(t.page)}
          >
            {t.label}
            <span className="cad-tool-label">{t.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StatusBar({ text }) {
  return (
    <div className="cad-statusbar">
      <span className="cad-status-cell">jacob-xing: schematic</span>
      <span className="cad-status-cell cad-status-sep">cellView: symbol</span>
      <span className="cad-status-cell">technology: gpdk045</span>
      <span className="cad-status-flex">{text}</span>
      <span className="cad-status-cell">x: 0.000  y: 0.000</span>
      <span className="cad-status-cell">dX: 0.000  dY: 0.000</span>
    </div>
  );
}

/* ── Main Landing Page ─────────────────────────────────────────────────── */

export default function CadenceHome({ resumeData, navigate }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [statusText, setStatusText] = useState('Welcome to Jacob Xing\'s portfolio. Click a button to navigate.');

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      const ctx = canvas.getContext('2d');
      drawSchematic(ctx, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const navButtons = [
    { label: 'Resume',     page: 'resume',     desc: 'View full résumé / CV'    },
    { label: 'Experience', page: 'experience', desc: 'Work & internship history'  },
    { label: 'Projects',   page: 'projects',   desc: 'Engineering projects'       },
    { label: 'Contact',    page: 'contact',    desc: 'Get in touch'               },
  ];

  return (
    <div className="cad-root">
      <MenuBar navigate={navigate} currentPage="home" />
      <Toolbar navigate={navigate} currentPage="home" />

      {/* ── main body ── */}
      <div className="cad-body">

        {/* ── left component browser ── */}
        <div className="cad-panel cad-left-panel">
          <div className="cad-panel-title">Library Manager</div>
          <div className="cad-panel-section">
            <div className="cad-panel-row header">Library</div>
            <div className="cad-panel-row selected">jacob-xing</div>
            <div className="cad-panel-row">analogLib</div>
            <div className="cad-panel-row">basic</div>
            <div className="cad-panel-row">gpdk045</div>
          </div>
          <div className="cad-panel-section">
            <div className="cad-panel-row header">Cell</div>
            <div className="cad-panel-row selected">portfolio</div>
            <div className="cad-panel-row">resume</div>
            <div className="cad-panel-row">experience</div>
            <div className="cad-panel-row">projects</div>
          </div>
          <div className="cad-panel-section">
            <div className="cad-panel-row header">View</div>
            <div className="cad-panel-row selected">schematic</div>
            <div className="cad-panel-row">symbol</div>
            <div className="cad-panel-row">layout</div>
          </div>
        </div>

        {/* ── canvas ── */}
        <div className="cad-canvas-area" ref={containerRef}>
          <canvas
            ref={canvasRef}
            className="cad-canvas"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - r.left) / 20).toFixed(3);
              const y = ((e.clientY - r.top) / 20).toFixed(3);
              setStatusText(`x: ${x}  y: ${y}`);
            }}
          />

          {/* ── identity card overlaid on canvas ── */}
          <div className="cad-identity-card">
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

            {/* navigation buttons */}
            <div className="cad-nav-buttons">
              {navButtons.map((b, i) => (
                <button
                  key={i}
                  className="cad-nav-big-btn"
                  onClick={() => navigate(b.page)}
                  onMouseEnter={() => setStatusText(b.desc)}
                >
                  <span className="cad-nav-btn-label">{b.label}</span>
                  <span className="cad-nav-btn-desc">{b.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── right properties panel ── */}
        <div className="cad-panel cad-right-panel">
          <div className="cad-panel-title">Properties</div>
          <div className="cad-prop-row"><span className="cad-prop-key">cellName</span><span className="cad-prop-val">portfolio</span></div>
          <div className="cad-prop-row"><span className="cad-prop-key">libName</span><span className="cad-prop-val">jacob-xing</span></div>
          <div className="cad-prop-row"><span className="cad-prop-key">viewName</span><span className="cad-prop-val">schematic</span></div>
          <div className="cad-prop-row"><span className="cad-prop-key">owner</span><span className="cad-prop-val">{resumeData.name}</span></div>
          <div className="cad-prop-row"><span className="cad-prop-key">email</span><span className="cad-prop-val">{resumeData.email}</span></div>
          <div className="cad-prop-row"><span className="cad-prop-key">technology</span><span className="cad-prop-val">gpdk045</span></div>
          <div className="cad-prop-row"><span className="cad-prop-key">units</span><span className="cad-prop-val">microns</span></div>
          <div className="cad-prop-row"><span className="cad-prop-key">grid</span><span className="cad-prop-val">0.05</span></div>

          <div className="cad-panel-title" style={{marginTop:'12px'}}>Net Highlights</div>
          {['VDD','GND','net001','net002','net003'].map((n,i)=>(
            <div key={i} className="cad-prop-row">
              <span className="cad-net-dot" style={{background: i===0?'#ff4444':i===1?'#4488ff':'#00cc00'}} />
              <span className="cad-prop-val">{n}</span>
            </div>
          ))}
        </div>

      </div>

      <StatusBar text={statusText} />
    </div>
  );
}

export { MenuBar, Toolbar, StatusBar };
