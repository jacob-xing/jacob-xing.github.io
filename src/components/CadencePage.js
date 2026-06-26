import React from 'react';
import { MenuBar, Toolbar, StatusBar } from './CadenceHome';

/**
 * Shared Cadence-styled page shell used by all sub-pages.
 * Props: navigate, currentPage, title, breadcrumb, children
 */
export default function CadencePage({ navigate, currentPage, title, breadcrumb, children }) {
  return (
    <div className="cad-root">
      <MenuBar navigate={navigate} currentPage={currentPage} />
      <Toolbar navigate={navigate} currentPage={currentPage} />
      <div className="cad-page-body">
        <div className="cad-page-content">
          <div className="cad-page-title-bar">
            <button className="cad-btn" onClick={() => navigate('home')}>← Home</button>
            <div>
              <div className="cad-page-title">{title}</div>
              <div className="cad-page-breadcrumb">{breadcrumb}</div>
            </div>
          </div>
          <div className="cad-page-inner">
            {children}
          </div>
        </div>
      </div>
      <StatusBar text={`Viewing: ${title}`} />
    </div>
  );
}
