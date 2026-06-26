import React from 'react';
import CadencePage from './CadencePage';

export default function ResumePage({ resumeData, navigate }) {
  return (
    <CadencePage
      navigate={navigate}
      currentPage="resume"
      title="Résumé / CV"
      breadcrumb="jacob-xing :: resume :: schematic"
    >
      {/* ── Education ─────────────────────────────────────────── */}
      <div className="cad-section-header">
        <div className="cad-section-title">Education</div>
        <div className="cad-section-line" />
      </div>
      {resumeData.education.map((e, i) => (
        <div key={i} className="cad-card">
          <div className="cad-card-header">
            <div>
              <div className="cad-card-title">{e.school}</div>
              <div className="cad-card-subtitle">{e.degree}</div>
            </div>
            <div className="cad-card-period">{e.period}</div>
          </div>
          <div className="cad-card-body">{e.details}</div>
        </div>
      ))}

      {/* ── Skills ────────────────────────────────────────────── */}
      <div className="cad-section-header">
        <div className="cad-section-title">Skills</div>
        <div className="cad-section-line" />
      </div>
      <div className="cad-skills-grid">
        {resumeData.skills.map((s, i) => (
          <div key={i} className="cad-skills-cat">
            <div className="cad-skills-cat-title">{s.category}</div>
            <div>
              {s.items.map((item, j) => (
                <span key={j} className="cad-tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Download placeholder ──────────────────────────────── */}
      <div className="cad-section-header">
        <div className="cad-section-title">Documents</div>
        <div className="cad-section-line" />
      </div>
      <div className="cad-card">
        <div className="cad-card-header">
          <div>
            <div className="cad-card-title">Full Résumé (PDF)</div>
            <div className="cad-card-subtitle">[INSERT: upload your PDF resume and link it here]</div>
          </div>
          <a href="#" className="cad-btn">Download PDF</a>
        </div>
        <div className="cad-card-body">
          [INSERT: brief note about your resume, last updated date, etc.]
        </div>
      </div>
    </CadencePage>
  );
}
