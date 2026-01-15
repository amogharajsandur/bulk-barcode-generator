import { useRef, useState, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import { Layers, Plus, ChevronDown, Download, Clipboard, Check } from 'lucide-react';
import styles from './Main.module.scss';

const BarcodeCard = ({ value, height, width, textPosition, index, theme, exportFormat, barColor, bgColor, font }) => {
  const imgRef = useRef(null);

  const copyToClipboard = async () => {
    if (!imgRef.current) return;
    try {
      const response = await fetch(imgRef.current.src);
      const blob = await response.blob();
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      alert(`Barcode "${value}" copied to clipboard!`);
    } catch (err) {
      console.error("Clipboard Error:", err);
      alert("Failed to copy image. Your browser may not support this feature.");
    }
  };

  const downloadSingle = () => {
    if (!imgRef.current) return;
    const link = document.createElement('a');
    link.href = imgRef.current.src;
    link.download = `${value}.${exportFormat}`;
    link.click();
  };

  useEffect(() => {
    if (imgRef.current) {
      try {
        JsBarcode(imgRef.current, value, {
          format: "CODE128",
          width: width,
          height: height,
          displayValue: true,
          fontSize: 14,
          font: font,
          background: bgColor,
          lineColor: barColor,
          textPosition: textPosition
        });
      } catch (err) {
        console.error("JsBarcode Error:", err);
      }
    }
  }, [value, height, width, textPosition, theme, barColor, bgColor, font]);

  return (
    <div className={styles.barcodeCard}>
      <div className={styles.lineTag}>
        LINE {index + 1}
      </div>
      <div className={styles.cardActions}>
        <button className={styles.actionBtn} onClick={copyToClipboard} title="Copy image to clipboard">
          <Clipboard size={14} />
        </button>
        <button className={styles.actionBtn} onClick={downloadSingle} title="Download this barcode">
          <Download size={14} />
        </button>
      </div>
      <img ref={imgRef} alt={`Barcode for ${value}`} />
    </div>
  );
};

export default function Main({ numbers, height, width, textPosition, theme, exportFormat, barColor, bgColor, font }) {
  const [visibleCount, setVisibleCount] = useState(30);

  const loadMore = () => {
    setVisibleCount(prev => prev + 30);
  };

  const visibleNumbers = numbers.slice(0, visibleCount);

  return (
    <main className={styles.main}>
      <header className={styles.mainHeader}>
        <div className={styles.headerInfo}>
          <h2>Preview Gallery</h2>
          <p>Real-time rendering of your barcodes</p>
        </div>
        <div className={styles.badge}>
          <div className={styles.pulse}></div>
          <span>{numbers.length} {numbers.length === 1 ? 'Item' : 'Items'}</span>
        </div>
      </header>

      <div className={styles.grid}>
        {numbers.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.iconContainer}>
              <div className={styles.iconBox}></div>
              <div className={styles.barcodeGraphic}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5V19M6 5V19M9 5V19M12 5V19M15 5V19M18 5V19M21 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className={styles.plusBadge}>
                <Plus size={20} />
              </div>
            </div>
            <h3>Ready to Generate</h3>
            <p>Paste your data list in the sidebar to start generating batches of barcodes instantly.</p>
          </div>
        ) : (
          <>
            {visibleNumbers.map((num, idx) => (
              <BarcodeCard 
                key={`${num}-${idx}`} 
                value={num} 
                height={height} 
                width={width}
                textPosition={textPosition}
                font={font}
                index={idx} 
                theme={theme} 
                exportFormat={exportFormat}
                barColor={barColor}
                bgColor={bgColor}
              />
            ))}
          </>
        )}
      </div>

      {numbers.length > visibleCount && (
        <div className={styles.loadMoreContainer}>
          <button onClick={loadMore} className={styles.loadMoreBtn}>
            <ChevronDown size={20} />
            Load More (Showing {visibleCount} of {numbers.length})
          </button>
        </div>
      )}
    </main>
  );
}