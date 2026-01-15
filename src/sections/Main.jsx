import { useRef, useState, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import { Layers, Plus, ChevronDown, Download } from 'lucide-react';
import styles from './Main.module.scss';

const BarcodeCard = ({ value, height, width, textPosition, index, theme, exportFormat }) => {
  const canvasRef = useRef(null);

  const downloadSingle = () => {
    if (!canvasRef.current) return;
    const format = exportFormat === 'jpg' ? 'jpeg' : exportFormat;
    const dataUrl = canvasRef.current.toDataURL(`image/${format}`);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `barcode-${value}.${exportFormat}`;
    link.click();
  };

  useEffect(() => {
    if (canvasRef.current) {
      try {
        JsBarcode(canvasRef.current, value, {
          format: "CODE128",
          width: width,
          height: height,
          displayValue: true,
          fontSize: 14,
          font: "monospace",
          background: "transparent",
          lineColor: theme === 'dark' ? '#F2F2F2' : '#262626',
          textPosition: textPosition
        });
      } catch (e) {
        console.error("Barcode Render Error:", e);
      }
    }
  }, [value, height, width, textPosition, theme]);

  return (
    <div className={styles.barcodeCard}>
      <div className={styles.lineTag}>
        LINE {index + 1}
      </div>
      <button className={styles.downloadBtn} onClick={downloadSingle} title="Download this barcode">
        <Download size={14} />
      </button>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default function Main({ numbers, height, width, textPosition, theme, exportFormat }) {
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
              <div className={styles.iconBox}>
                <Layers size={48} className={styles.layersIcon} />
              </div>
              <div className={styles.plusBox}>
                <Plus size={16} />
              </div>
            </div>
            <h3>Ready to Generate</h3>
            <p>Paste your data list in the sidebar to start generating barcodes.</p>
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
                index={idx} 
                theme={theme} 
                exportFormat={exportFormat}
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