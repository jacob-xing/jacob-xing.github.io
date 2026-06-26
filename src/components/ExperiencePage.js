import React from 'react';
import CadencePage from './CadencePage';

export default function ExperiencePage({ resumeData, navigate }) {
  return (
    <CadencePage
      navigate={navigate}
      currentPage="experience"
      title="Work Experience"
      breadcrumb="jacob-xing :: experience :: schematic"
    >
      <div className="cad-section-header">
        <div className="cad-section-title">Professional Experience</div>
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

      {/* ── Placeholder for more ─────────────────────────────── */}
      <div className="cad-section-header">
        <div className="cad-section-title">Leadership & Activities</div>
        <div className="cad-section-line" />
      </div>
      <div className="cad-card">
        <div className="cad-card-header">
          <div>
            <div className="cad-card-title">[INSERT: Club / Organization Name]</div>
            <div className="cad-card-subtitle">[INSERT: Role]</div>
          </div>
          <div className="cad-card-period">[INSERT: Period]</div>
        </div>
        <div className="cad-card-body">
          <div className="cad-bullet">[INSERT: what you did / achieved]</div>
          <div className="cad-bullet">[INSERT: another accomplishment]</div>
        </div>
      </div>

      <div className="cad-section-header">
        <div className="cad-section-title">Certifications & Awards</div>
        <div className="cad-section-line" />
      </div>
      <div className="cad-card">
        <div className="cad-card-body">
          [INSERT: any certifications, awards, competitions, scholarships here]
        </div>
      </div>
    </CadencePage>
  );
}
