import { useState, useEffect } from 'react';
import './App.scss';

import { Trash2, Ruler, DownloadCloud, Loader, MoveHorizontal, Type, Image as ImageIcon, Share2, Twitter, Linkedin, Facebook, MessageCircle, Copy } from 'lucide-react';
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
  const [barColor, setBarColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
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
          <span className="versionTag">v1.1.0-stable</span>
          <h3>What's New</h3>
          <ul>
            <li><strong>Custom Colors</strong>: Pick your own Bar & BG colors.</li>
            <li><strong>Better Mobile UI</strong>: Fully optimized for small screens.</li>
            <li><strong>Smart Naming</strong>: Files are named after their content.</li>
          </ul>

          <hr className="modal-divider" />

          <h3>About</h3>
          <p>A fast, browser-based bulk barcode generator. All processing happens locally on your device — your data never leaves your browser.</p>

          <h3>How to Use</h3>
          <ul>
            <li>Paste your data list in the sidebar (one per line).</li>
            <li>Adjust settings like size, orientation, and colors.</li>
            <li>Download as individual files or a combined ZIP.</li>
          </ul>

          <h3>Developer Info</h3>
          <p>Designed and Developed by <strong>Amogha Raj Sandur</strong>.</p>
          <div className="modal-links-grid">
            <a href="https://www.linkedin.com/in/amogharajsandur/" target="_blank" rel="noopener noreferrer" className="link-item">LinkedIn Profile</a>
            <a href="https://github.com/amogharajsandur/bulk-barcode-generator" target="_blank" rel="noopener noreferrer" className="link-item">GitHub Repository</a>
          </div>

          <hr className="modal-divider" />

          <div className="modal-actions-bottom">
            <a href="https://github.com/amogharajsandur/bulk-barcode-generator/issues" target="_blank" rel="noopener noreferrer" className="btn-primary-sm">
              Report Issue / Request Feature
            </a>
          </div>
        </>
      )
    },
    share: {
      title: 'Share this tool',
      content: (
        <div className="share-modal-content">
          <p>Help others generate barcodes easily by sharing this tool!</p>
          <div className="share-url-box">
            <input readOnly value="https://bulk-barcode-generator.vercel.app/" />
            <button onClick={() => {
              navigator.clipboard.writeText("https://bulk-barcode-generator.vercel.app/");
              alert("Link copied to clipboard!");
            }} className="copy-btn">
              <Copy size={16} /> Copy
            </button>
          </div>
          <div className="share-actions-grid">
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this Bulk Barcode Generator: https://bulk-barcode-generator.vercel.app/')}`} target="_blank" rel="noopener noreferrer" className="share-btn whatsapp">
              <MessageCircle size={18} /> <span>WhatsApp</span>
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://bulk-barcode-generator.vercel.app/')}`} target="_blank" rel="noopener noreferrer" className="share-btn facebook">
              <Facebook size={18} /> <span>Facebook</span>
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://bulk-barcode-generator.vercel.app/')}&text=${encodeURIComponent('Check out this awesome Bulk Barcode Generator!')}`} target="_blank" rel="noopener noreferrer" className="share-btn twitter">
              <Twitter size={18} /> <span>Twitter (X)</span>
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://bulk-barcode-generator.vercel.app/')}`} target="_blank" rel="noopener noreferrer" className="share-btn linkedin">
              <Linkedin size={18} /> <span>LinkedIn</span>
            </a>
          </div>
        </div>
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
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onInfoClick={() => openModal('info')} 
        onShareClick={() => openModal('share')}
      />
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
          barColor={barColor}
          setBarColor={setBarColor}
          bgColor={bgColor}
          setBgColor={setBgColor}
        />
        <Main 
          key={numbers.length}
          numbers={numbers} 
          height={height} 
          width={width}
          textPosition={textPosition}
          theme={theme} 
          exportFormat={exportFormat}
          barColor={barColor}
          bgColor={bgColor}
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