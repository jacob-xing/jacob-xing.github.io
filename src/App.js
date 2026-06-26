import React, { useState } from 'react';
import CadenceHome from './components/CadenceHome';
import ResumePage from './components/ResumePage';
import ExperiencePage from './components/ExperiencePage';
import ProjectsPage from './components/ProjectsPage';
import ContactPage from './components/ContactPage';
import resumeData from './resumeData';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');

  const navigate = (p) => setPage(p);

  const pages = {
    home: <CadenceHome resumeData={resumeData} navigate={navigate} />,
    resume: <ResumePage resumeData={resumeData} navigate={navigate} />,
    experience: <ExperiencePage resumeData={resumeData} navigate={navigate} />,
    projects: <ProjectsPage resumeData={resumeData} navigate={navigate} />,
    contact: <ContactPage resumeData={resumeData} navigate={navigate} />,
  };

  return pages[page] || pages['home'];
}
