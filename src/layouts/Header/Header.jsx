import { Sun, Moon, Barcode, Info } from 'lucide-react';
import styles from './Header.module.scss';

export default function Header({ theme, toggleTheme, onInfoClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logoBox}>
            <Barcode size={24} />
          </div>
          <h1 className={styles.title}>Bulk Barcode Generator</h1>
          <button className={styles.infoBtn} onClick={onInfoClick} aria-label="Program Information">
            <Info size={18} />
          </button>
        </div>
        
        <div className={styles.right}>
          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}