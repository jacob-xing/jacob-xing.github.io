import React from 'react';
import CadencePage from './CadencePage';

export default function ContactPage({ resumeData, navigate }) {
  return (
    <CadencePage
      navigate={navigate}
      currentPage="contact"
      title="Contact"
      breadcrumb="jacob-xing :: contact :: schematic"
    >
      <div className="cad-section-header">
        <div className="cad-section-title">Get In Touch</div>
        <div className="cad-section-line" />
      </div>

      <div className="cad-contact-grid">
        <div className="cad-contact-item">
          <div className="cad-contact-label">Email</div>
          <div className="cad-contact-value">
            <a href={`mailto:${resumeData.email}`}>{resumeData.email}</a>
          </div>
        </div>

        <div className="cad-contact-item">
          <div className="cad-contact-label">LinkedIn</div>
          <div className="cad-contact-value">
            <a href="https://www.linkedin.com/in/jacobxing/" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/jacobxing
            </a>
          </div>
        </div>

        <div className="cad-contact-item">
          <div className="cad-contact-label">GitHub</div>
          <div className="cad-contact-value">
            <a href="https://github.com/jacob-xing" target="_blank" rel="noopener noreferrer">
              github.com/jacob-xing
            </a>
          </div>
        </div>

        <div className="cad-contact-item">
          <div className="cad-contact-label">Location</div>
          <div className="cad-contact-value">Wisenbaker Engineering Research Center, 188 Bizzell St, Bryan, TX 77801</div>
        </div>

        <div className="cad-contact-item">
          <div className="cad-contact-label">Phone</div>
          <div className="cad-contact-value">Please email me</div>
        </div>

        <div className="cad-contact-item">
          <div className="cad-contact-label">Availability</div>
          <div className="cad-contact-value">Looking for Summer 2027 Internships</div>
        </div>
      </div>

      {/* ── About ─────────────────────────────────────────────── */}
      <div className="cad-section-header">
        <div className="cad-section-title">About Me</div>
        <div className="cad-section-line" />
      </div>
      <div className="cad-card">
        <div className="cad-card-body" style={{ fontSize: '13px', lineHeight: '1.7', color: '#ccc' }}>
          {resumeData.about}
        </div>
      </div>

      {/* ── Note ─────────────────────────────────────────────── */}
      <div className="cad-section-header">
        <div className="cad-section-title">Note</div>
        <div className="cad-section-line" />
      </div>
      <div className="cad-card">
        <div className="cad-card-body">
          Please email me for the fastest response. My school email is jxing@tamu.edu if academic related.
        </div>
      </div>
    </CadencePage>
  );
}
