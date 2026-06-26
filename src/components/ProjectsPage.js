import React from 'react';
import CadencePage from './CadencePage';

export default function ProjectsPage({ resumeData, navigate }) {
  return (
    <CadencePage
      navigate={navigate}
      currentPage="projects"
      title="Projects"
      breadcrumb="jacob-xing :: projects :: schematic"
    >
      <div className="cad-section-header">
        <div className="cad-section-title">Engineering Projects</div>
        <div className="cad-section-line" />
      </div>

      {resumeData.projects.map((p, i) => (
        <div key={i} className="cad-card">
          <div className="cad-card-header">
            <div>
              <div className="cad-card-title">{p.name}</div>
              <div className="cad-card-subtitle">
                {p.tech.split(',').map((t, j) => (
                  <span key={j} className="cad-tag">{t.trim()}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
              <div className="cad-card-period">{p.period}</div>
              {p.link && p.link !== '#' ? (
                <a href={p.link} className="cad-btn" target="_blank" rel="noopener noreferrer">View →</a>
              ) : (
                <span className="cad-btn" style={{ cursor: 'default', opacity: 0.4 }}>[link]</span>
              )}
            </div>
          </div>
          <div className="cad-card-body" style={{ marginTop: '8px' }}>
            {p.description}
          </div>
        </div>
      ))}

      {/* ── Course projects placeholder ─────────────────────── */}
      <div className="cad-section-header">
        <div className="cad-section-title">Coursework Projects</div>
        <div className="cad-section-line" />
      </div>
      <div className="cad-card">
        <div className="cad-card-header">
          <div>
            <div className="cad-card-title">[INSERT: Course Project Name]</div>
            <div className="cad-card-subtitle">
              <span className="cad-tag">[INSERT tech]</span>
            </div>
          </div>
          <div className="cad-card-period">[INSERT: semester]</div>
        </div>
        <div className="cad-card-body" style={{ marginTop: '8px' }}>
          [INSERT: brief description of the project and your contribution]
        </div>
      </div>
    </CadencePage>
  );
}
