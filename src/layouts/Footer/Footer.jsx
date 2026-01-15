import { Github } from 'lucide-react';
import styles from './Footer.module.scss';

export default function Footer({ onTosClick, onPrivacyClick }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>
            &copy; {new Date().getFullYear()} <a href="https://www.linkedin.com/in/amogharajsandur/" target="_blank" rel="noopener noreferrer" className={styles.devLink}>Amogha Raj Sandur</a> | Bulk Barcode Generator.
          </p>
          <small className={styles.stackInfo}>Open source tool built with Vite, React & SCSS</small>
        </div>
        <div className={styles.links}>
          <button onClick={onTosClick} className={styles.link}>Terms of Service</button>
          <span className={styles.separator}>•</span>
          <button onClick={onPrivacyClick} className={styles.link}>Privacy Policy</button>
          <span className={styles.separator}>•</span>
          <a href="https://github.com/amogharajsandur/bulk-barcode-generator" target="_blank" rel="noopener noreferrer" className={styles.githubLink} title="GitHub Repository">
            <Github size={18} /> <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}