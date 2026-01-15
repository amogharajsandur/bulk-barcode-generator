import { useState, useEffect } from 'react';
import './App.scss';

import Header from './layouts/Header/Header';
import Sidebar from './layouts/Sidebar/Sidebar';
import Main from "./sections/Main";
import Footer from './layouts/Footer/Footer';
import Modal from './components/Modal/Modal';

export default function App() {
  const [numbers, setNumbers] = useState([]);
  const [height, setHeight] = useState(50);
  const [width, setWidth] = useState(2);
  const [textPosition, setTextPosition] = useState('bottom');
  const [exportFormat, setExportFormat] = useState('png');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'info' });

  const openModal = (type) => setModalConfig({ isOpen: true, type });
  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  const modalData = {
    info: {
      title: 'About Bulk Barcode Generator',
      content: (
        <>
          <div className="modal-actions-top">
            <a href="https://github.com/amogharajsandur/bulk-barcode-generator/issues" target="_blank" rel="noopener noreferrer" className="btn-secondary-sm">
              Report Issue / Request Feature
            </a>
          </div>
          <span className="versionTag">v2.1.0-stable</span>
          <p>A professional, high-performance web tool designed for bulk barcode generation with real-time preview and customization.</p>
          <h3>How to Use</h3>
          <ul>
            <li>Paste your data list in the sidebar (one item per line).</li>
            <li>Adjust dimensions (Height & Width) using the sliders.</li>
            <li>Choose text placement (Top/Bottom) and export format.</li>
            <li>Download individual barcodes or the entire set as a ZIP archive.</li>
          </ul>
          <h3>What's New</h3>
          <ul>
            <li>Resizable Sidebar for desktop users.</li>
            <li>Individual barcode downloads.</li>
            <li>Live sample preview in settings.</li>
            <li>Multiple export formats (PNG, JPG, WebP).</li>
          </ul>
        </>
      )
    },
    tos: {
      title: 'Terms of Service',
      content: (
        <>
          <p>By using Bulk Barcode Generator, you agree to the following terms:</p>
          <h3>Usage Rights</h3>
          <p>This tool is open-source and free to use for both personal and commercial projects. No attribution is required, though appreciated.</p>
          <h3>Disclaimer</h3>
          <p>The software is provided "as is", without warranty of any kind. The author is not responsible for any data loss or incorrect barcode generation that may lead to scanning errors.</p>
          <h3>Privacy</h3>
          <p>All barcode generation happens locally in your browser. No data is ever uploaded to a server.</p>
        </>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      content: (
        <>
          <p>Your privacy is our priority. Here is how we handle your data:</p>
          <h3>Local Processing</h3>
          <p>Maximum privacy: Every piece of data you enter is processed 100% locally on your machine using JavaScript. We don't have a backend to store your data.</p>
          <h3>No Tracking</h3>
          <p>We do not use cookies or tracking scripts that identify you personally. Your theme preference is saved in your browser's local storage.</p>
          <h3>Open Source</h3>
          <p>Since the project is open source, you can audit the code yourself to verify these privacy claims.</p>
        </>
      )
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resize = (e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      const maxWidth = window.innerWidth / 2;
      if (newWidth > 320 && newWidth < maxWidth) {
        setSidebarWidth(newWidth);
      }
    }
  };

  const startResizing = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize]);

  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidth}px`);
  }, [sidebarWidth]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      <Header theme={theme} toggleTheme={toggleTheme} onInfoClick={() => openModal('info')} />
      <div className="content-wrapper">
        <Sidebar 
          numbers={numbers} 
          setNumbers={setNumbers} 
          height={height} 
          setHeight={setHeight}
          width={width}
          setWidth={setWidth}
          textPosition={textPosition}
          setTextPosition={setTextPosition}
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
          onResizeStart={startResizing}
          theme={theme}
        />
        <Main 
          key={numbers.length}
          numbers={numbers} 
          height={height} 
          width={width}
          textPosition={textPosition}
          theme={theme} 
          exportFormat={exportFormat}
        />
      </div>
      <Footer onTosClick={() => openModal('tos')} onPrivacyClick={() => openModal('privacy')} />

      <Modal 
        isOpen={modalConfig.isOpen} 
        onClose={closeModal} 
        title={modalData[modalConfig.type]?.title}
      >
        {modalData[modalConfig.type]?.content}
      </Modal>
    </div>
  );
}