import { useRef, useState, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import { Layers, Plus, ChevronDown, Download, Clipboard, Check } from 'lucide-react';
import styles from './Main.module.scss';

const BarcodeCard = ({ value, height, width, textPosition, index, theme, exportFormat, barColor, bgColor }) => {
  const canvasRef = useRef(null);

  const copyToClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      const blob = await new Promise(resolve => canvasRef.current.toBlob(resolve, 'image/png'));
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      alert(`Barcode "${value}" copied to clipboard!`);
    } catch (err) {
      console.error("Clipboard Error:", err);
      // Fallback for browsers that don't support ClipboardItem image writing fully
      alert("Failed to copy image. Your browser may not support this feature.");
    }
  };

  const downloadSingle = () => {
    if (!canvasRef.current) return;
    const format = exportFormat === 'jpg' ? 'jpeg' : exportFormat;
    const dataUrl = canvasRef.current.toDataURL(`image/${format}`);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${value}.${exportFormat}`;
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
          background: bgColor,
          lineColor: barColor,
          textPosition: textPosition
        });
      } catch (err) {
        console.error("JsBarcode Error:", err);
      }
    }
  }, [value, height, width, textPosition, theme, barColor, bgColor]);

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
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default function Main({ numbers, height, width, textPosition, theme, exportFormat, barColor, bgColor }) {
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