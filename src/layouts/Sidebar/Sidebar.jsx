import { useState, useEffect, useRef } from 'react';
import { Trash2, Ruler, DownloadCloud, Loader, MoveHorizontal, Type, Image as ImageIcon } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import JsBarcode from 'jsbarcode';
import styles from './Sidebar.module.scss';

const SamplePreview = ({ height, width, textPosition, theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      JsBarcode(canvasRef.current, "SAMPLE-123", {
        format: "CODE128",
        width: width,
        height: height,
        displayValue: true,
        fontSize: 14,
        lineColor: theme === 'dark' ? '#F2F2F2' : '#262626',
        background: "transparent",
        textPosition: textPosition
      });
    }
  }, [height, width, textPosition, theme]);

  return (
    <div className={styles.samplePreview}>
      <div className={styles.sampleBadge}>Settings Preview</div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default function Sidebar({ 
  numbers, setNumbers, 
  height, setHeight, 
  width, setWidth, 
  textPosition, setTextPosition, 
  exportFormat, setExportFormat,
  onResizeStart,
  theme
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [inputValue, setInputValue] = useState(numbers.join('\n'));

  // Sync internal text state when numbers are cleared from outside
  useEffect(() => {
    if (numbers.length === 0) setInputValue('');
  }, [numbers]);

  const handleTextChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    const items = val.split('\n').filter(line => line.trim() !== "");
    setNumbers(items);
  };

  const clearAll = () => {
    setNumbers([]);
    setInputValue('');
  };

  const downloadBulk = async () => {
    if (numbers.length === 0) return;

    setIsDownloading(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder("barcodes");

      for (let num of numbers) {
        const canvas = document.createElement('canvas');
        JsBarcode(canvas, num, {
          format: "CODE128",
          width: width,
          height: height,
          displayValue: true,
          fontSize: 16,
          textPosition: textPosition
        });

        const dataUrl = canvas.toDataURL(`image/${exportFormat === 'jpg' ? 'jpeg' : exportFormat}`);
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        folder.file(`${num}.${exportFormat}`, blob);
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `barcodes_${new Date().getTime()}.zip`);
    } catch (err) {
      console.error("ZIP Generation Error:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.resizeHandle} onMouseDown={onResizeStart}>
        <div className={styles.handleBar}></div>
      </div>

      <div className={styles.inputSection}>
        <div className={styles.labelRow}>
          <label>Barcode Data</label>
          <button onClick={clearAll} className={styles.clearBtn}>
            <Trash2 size={12} /> Clear All
          </button>
        </div>
        <textarea 
          className={styles.textarea}
          placeholder="Enter values here&#10;One per line..."
          onChange={handleTextChange}
          value={inputValue}
        ></textarea>
      </div>

      <div className={styles.settingsSection}>
        <div className={styles.settingItem}>
          <div className={styles.settingLabelRow}>
            <label><Ruler size={12} /> Barcode Height</label>
            <span className={styles.valueBadge}>{height}px</span>
          </div>
          <input type="range" min="20" max="200" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className={styles.rangeInput} />
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingLabelRow}>
            <label><MoveHorizontal size={12} /> Barcode Width</label>
            <span className={styles.valueBadge}>{width}px</span>
          </div>
          <input type="range" min="1" max="4" step="0.1" value={width} onChange={(e) => setWidth(parseFloat(e.target.value))} className={styles.rangeInput} />
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingLabelRow}>
            <label><Type size={12} /> Text Position</label>
            <div className={styles.toggleGroup}>
              <button 
                onClick={() => setTextPosition('top')} 
                className={textPosition === 'top' ? styles.active : ''}
              >Top</button>
              <button 
                onClick={() => setTextPosition('bottom')} 
                className={textPosition === 'bottom' ? styles.active : ''}
              >Bottom</button>
            </div>
          </div>
        </div>

        <div className={styles.settingItem}>
          <div className={styles.settingLabelRow}>
            <label><ImageIcon size={12} /> Export Format</label>
            <select 
              value={exportFormat} 
              onChange={(e) => setExportFormat(e.target.value)}
              className={styles.select}
            >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
        </div>
      </div>

      <SamplePreview 
        height={height} 
        width={width} 
        textPosition={textPosition} 
        theme={theme} 
      />

      <div className={styles.actionSection}>
        <button onClick={downloadBulk} className={styles.downloadBtn} disabled={numbers.length === 0 || isDownloading}>
          {isDownloading ? <><Loader className={styles.spin} size={20} /> Generating...</> : <><DownloadCloud size={20} /> Download ZIP</>}
        </button>
      </div>
    </aside>
  );
}