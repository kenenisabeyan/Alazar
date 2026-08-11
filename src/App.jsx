import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Modal from './components/common/Modal';
import { portfolioProjects } from './utils/constants';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenProjectModal = (project) => {
    setActiveModalProject(project);
    setIsModalOpen(true);
  };

  const handleOpenShowreel = () => {
    const showreelProject = {
      id: 'showreel',
      title: 'Alazar Asdesach - 2025 Showreel',
      category: 'Showreel',
      client: 'Alazar Studio',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
      description: 'A compiled high-octane visual showcase featuring commercial edits, kinetic typography, color grading transformations, and 3D motion graphics.',
      role: 'Director & Lead Editor',
      deliverables: ['Full 2025 Showreel', 'Commercial Edit Cut', 'Color Grade Master'],
      year: '2025'
    };
    setActiveModalProject(showreelProject);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveModalProject(null);
  };

  // Render active route page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            onOpenProjectModal={handleOpenProjectModal}
            onOpenShowreel={handleOpenShowreel}
          />
        );
      case 'portfolio':
        return (
          <Portfolio 
            onOpenProjectModal={handleOpenProjectModal} 
          />
        );
      case 'services':
        return (
          <Services 
            setCurrentPage={setCurrentPage} 
          />
        );
      case 'contact':
        return <Contact />;
      default:
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            onOpenProjectModal={handleOpenProjectModal}
            onOpenShowreel={handleOpenShowreel}
          />
        );
    }
  };

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}

      {/* Global Project / Showreel Modal */}
      <Modal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={activeModalProject}
      />
    </Layout>
  );
}
