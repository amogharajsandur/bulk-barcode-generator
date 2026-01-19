import React from 'react';
import { APP_CONFIG } from './config';

export const modalInfoData = {
  title: 'About Bulk Barcode Generator',
  content: (
    <>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        What's New <span className="versionTag" style={{ margin: 0, fontSize: '0.65rem' }}>v{APP_CONFIG.VERSION}</span>
      </h3>
      <ul>
        <li><strong>Advanced File Naming</strong>: Custom naming engine with support for prefixes, suffixes, and separators for easier file organization.</li>
        <li><strong>Real-time Preview</strong>: See exactly how your barcodes and filenames will look before you download.</li>
        <li><strong>Enhanced UI</strong>: A more intuitive and accessible sidebar layout for faster configuration.</li>
      </ul>
      
      <hr className="modal-divider" />

      <h3>About</h3>
      <p>A high-performance, browser-native bulk barcode generator designed for creators and developers who value privacy and speed.</p>

      <h3>How to Use</h3>
      <ul>
        <li>Paste your data list in the sidebar (one item per line).</li>
        <li>Use the <strong>File Naming</strong> section to customize your exported filenames.</li>
        <li>Adjust styling (colors, fonts, sizes) to match your requirements.</li>
        <li>Click "Download ZIP" to save all barcodes at once.</li>
      </ul>

      <hr className="modal-divider" />

      <h3>Full Feature List</h3>
      
      <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Generation & Processing</h4>
      <ul style={{ marginBottom: '1rem' }}>
        <li><strong>Bulk Generation</strong>: Instant processing for thousands of barcode entries via newline-separated input.</li>
        <li><strong>Fast Rendering</strong>: high-speed generation optimized for large batches.</li>
        <li><strong>Real-time Feedback</strong>: Instant visual updates on every configuration change.</li>
      </ul>

      <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Styling & Customization</h4>
      <ul style={{ marginBottom: '1rem' }}>
        <li><strong>Dynamic Geometry</strong>: Precision control over barcode height, line thickness, and text placement.</li>
        <li><strong>Color Control</strong>: Full customization of barcode (bars) and background colors.</li>
        <li><strong>Typography Engine</strong>: Choice of 10+ professional web fonts for barcode labels.</li>
        <li><strong>Dark & Light Mode</strong>: Fully responsive theme that respects your preference.</li>
      </ul>

      <h4 style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Privacy & Export</h4>
      <ul>
        <li><strong>Custom Naming</strong>: Flexible file naming engine (Prefix + Separator + Content + Suffix).</li>
        <li><strong>Local-First Privacy</strong>: 100% on-device processing. No data is ever sent to a server.</li>
        <li><strong>Multiple Formats</strong>: Export as high-quality PNG, JPG, or WebP images.</li>
        <li><strong>Batch Export</strong>: Instant ZIP compression for high-speed batch downloads.</li>
      </ul>

      <hr className="modal-divider" />

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
};