import { Github } from 'lucide-react';
import styles from './Footer.module.scss';

export default function Footer({ onTosClick, onPrivacyClick }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>&copy; {new Date().getFullYear()} Bulk Barcode Generator. Open source tool built with React.</p>
        </div>
        <div className={styles.links}>
          <button onClick={onTosClick} className={styles.link}>Terms of Service</button>
          <button onClick={onPrivacyClick} className={styles.link}>Privacy Policy</button>
          <span className={styles.separator}>|</span>
          <a href="https://github.com/amogharajsandur/bulk-barcode-generator" target="_blank" rel="noopener noreferrer" className={styles.githubLink} title="GitHub Repository">
            <Github size={18} />
          </a>
          <span className={styles.separator}>|</span>
          <a href="https://www.linkedin.com/in/amogharajsandur/" target="_blank" rel="noopener noreferrer" className={styles.builtBy}>
            Designed & Developed by Amogha Raj Sandur
          </a>
        </div>
      </div>
    </footer>
  );
}