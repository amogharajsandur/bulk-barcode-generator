import { useState, useEffect, useCallback } from 'react';
import './App.scss';

import Header from './layouts/Header/Header';
import Sidebar from './layouts/Sidebar/Sidebar';
import Main from "./sections/Main";
import Footer from './layouts/Footer/Footer';
import Modal from './components/Modal/Modal';

import { modalInfoData } from './data/modalInfo';
import { modalShareData } from './data/modalShare';
import { legalTData } from './data/legalT';
import { legalPData } from './data/legalP';

import { APP_CONFIG } from './data/config';

export default function App() {
  const [numbers, setNumbers] = useState([]);
  const [height, setHeight] = useState(50);
  const [width, setWidth] = useState(2);
  const [textPosition, setTextPosition] = useState('bottom');
  const [font, setFont] = useState('Sans Serif');
  const [exportFormat, setExportFormat] = useState('png');
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [barColor, setBarColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [startSeparator, setStartSeparator] = useState('');
  const [endSeparator, setEndSeparator] = useState('');

  const [modalConfig, setModalConfig] = useState(() => {
    const hasVisited = localStorage.getItem(APP_CONFIG.STORAGE_KEY);
    return { isOpen: !hasVisited, type: 'info' };
  });

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
    localStorage.setItem(APP_CONFIG.STORAGE_KEY, 'true');
  };

  const openModal = (type) => setModalConfig({ isOpen: true, type });

  const modalData = {
    info: modalInfoData,
    share: modalShareData,
    tos: legalTData,
    privacy: legalPData
  };

  const resize = useCallback((e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      const maxWidth = window.innerWidth / 2;
      if (newWidth > 320 && newWidth < maxWidth) {
        setSidebarWidth(newWidth);
      }
    }
  }, [isResizing, setSidebarWidth]);

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
          font={font}
          setFont={setFont}
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
          onResizeStart={startResizing}
          theme={theme}
          barColor={barColor}
          setBarColor={setBarColor}
          bgColor={bgColor}
          setBgColor={setBgColor}
          prefix={prefix}
          setPrefix={setPrefix}
          suffix={suffix}
          setSuffix={setSuffix}
          startSeparator={startSeparator}
          setStartSeparator={setStartSeparator}
          endSeparator={endSeparator}
          setEndSeparator={setEndSeparator}
        />
        <Main 
          key={`${numbers.length}-${font}`}
          numbers={numbers} 
          height={height} 
          width={width}
          textPosition={textPosition}
          font={font}
          theme={theme} 
          exportFormat={exportFormat}
          barColor={barColor}
          bgColor={bgColor}
          prefix={prefix}
          suffix={suffix}
          startSeparator={startSeparator}
          endSeparator={endSeparator}
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