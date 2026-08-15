import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Modal from './components/common/Modal';

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
      videoUrl: '/assets/sample-showreel.mp4',
      description: 'A compilation of video edits, color grading work, graphic design, and 3D motion graphics.',
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
      case 'about':
        return (
          <About 
            setCurrentPage={setCurrentPage}
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
