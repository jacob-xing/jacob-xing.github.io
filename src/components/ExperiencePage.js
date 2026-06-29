import React from 'react';
import CadencePage from './CadencePage';
import resumePdf from '../Resume.pdf';

export default function ExperiencePage({ resumeData, navigate }) {
  return (
    <CadencePage
      navigate={navigate}
      currentPage="experience"
      title="Work Experience"
      breadcrumb="jacob-xing :: experience :: schematic"
    >
      {/* ── Industry Experience ───────────────────────────────── */}
      <div className="cad-section-header">
        <div className="cad-section-title">Industry Experience</div>
        <div className="cad-section-line" />
      </div>
      {resumeData.experience.map((job, i) => (
        <div key={i} className="cad-card">
          <div className="cad-card-header">
            <div>
              <div className="cad-card-title">{job.company}</div>
              <div className="cad-card-subtitle">{job.role} · {job.location}</div>
            </div>
            <div className="cad-card-period">{job.period}</div>
          </div>
          <div className="cad-card-body">
            {job.bullets.map((b, j) => (
              <div key={j} className="cad-bullet">{b}</div>
            ))}
          </div>
        </div>
      ))}

      {/* ── Research ──────────────────────────────────────────── */}
      {resumeData.research && resumeData.research.length > 0 && (
        <>
          <div className="cad-section-header">
            <div className="cad-section-title">Research</div>
            <div className="cad-section-line" />
          </div>
          {resumeData.research.map((r, i) => (
            <div key={i} className="cad-card">
              <div className="cad-card-header">
                <div>
                  <div className="cad-card-title">{r.group}</div>
                  <div className="cad-card-subtitle">{r.role} · {r.location}</div>
                </div>
                <div className="cad-card-period">{r.period}</div>
              </div>
              <div className="cad-card-body">
                {r.bullets.map((b, j) => (
                  <div key={j} className="cad-bullet">{b}</div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* ── Teaching ──────────────────────────────────────────── */}
      {resumeData.teaching && resumeData.teaching.length > 0 && (
        <>
          <div className="cad-section-header">
            <div className="cad-section-title">Teaching</div>
            <div className="cad-section-line" />
          </div>
          {resumeData.teaching.map((t, i) => (
            <div key={i} className="cad-card">
              <div className="cad-card-header">
                <div>
                  <div className="cad-card-title">{t.institution}</div>
                  <div className="cad-card-subtitle">{t.role} · {t.location}</div>
                </div>
                <div className="cad-card-period">{t.period}</div>
              </div>
              <div className="cad-card-body">
                {t.bullets.map((b, j) => (
                  <div key={j} className="cad-bullet">{b}</div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      {/* ── Documents ─────────────────────────────────────────── */}
      <div className="cad-section-header">
        <div className="cad-section-title">Documents</div>
        <div className="cad-section-line" />
      </div>
      <div className="cad-card">
        <div className="cad-card-header">
          <div>
            <div className="cad-card-title">Full Résumé (PDF)</div>
            <div className="cad-card-subtitle">download my resume</div>
          </div>
          <a href={resumePdf} download="Jacob_Xing_Resume.pdf" className="cad-btn">Download PDF</a>
        </div>
      </div>
    </CadencePage>
  );
}
