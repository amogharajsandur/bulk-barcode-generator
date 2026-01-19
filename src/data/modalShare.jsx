import React from 'react';
import { Twitter, Linkedin, Facebook, MessageCircle, Copy } from 'lucide-react';
import { APP_CONFIG } from './config';

export const modalShareData = {
  title: 'Share this tool',
  content: (
    <div className="share-modal-content">
      <p>Help others generate barcodes easily by sharing this tool!</p>
      <div className="share-url-box">
        <input readOnly value={APP_CONFIG.BASE_URL} />
        <button onClick={() => {
          navigator.clipboard.writeText(APP_CONFIG.BASE_URL);
          alert("Link copied to clipboard!");
        }} className="copy-btn">
          <Copy size={16} /> Copy
        </button>
      </div>
      <div className="share-actions-grid">
        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this Bulk Barcode Generator: ${APP_CONFIG.BASE_URL}`)}`} target="_blank" rel="noopener noreferrer" className="share-btn whatsapp">
          <MessageCircle size={18} /> <span>WhatsApp</span>
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(APP_CONFIG.BASE_URL)}`} target="_blank" rel="noopener noreferrer" className="share-btn facebook">
          <Facebook size={18} /> <span>Facebook</span>
        </a>
        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(APP_CONFIG.BASE_URL)}&text=${encodeURIComponent('Check out this awesome Bulk Barcode Generator!')}`} target="_blank" rel="noopener noreferrer" className="share-btn twitter">
          <Twitter size={18} /> <span>Twitter (X)</span>
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(APP_CONFIG.BASE_URL)}`} target="_blank" rel="noopener noreferrer" className="share-btn linkedin">
          <Linkedin size={18} /> <span>LinkedIn</span>
        </a>
      </div>
    </div>
  )
};
