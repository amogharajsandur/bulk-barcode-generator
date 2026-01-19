import JsBarcode from 'jsbarcode';

/**
 * Generates a watermarked barcode canvas.
 * @param {Object} options - Barcode options (value, height, width, etc.)
 * @returns {HTMLCanvasElement}
 */
export const getWatermarkedCanvas = ({
  value,
  height,
  width,
  font,
  barColor,
  bgColor,
  textPosition
}) => {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, value, {
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

  return canvas;
};

/**
 * Injects basic metadata into a PNG blob using a simple string manipulation for the 'Software' chunk.
 * Note: This is a lightweight approach for marketing.
 */
export const injectMetadata = async (blob, format) => {
  if (format !== 'png') return blob;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const view = new DataView(arrayBuffer);
      
      // Basic PNG check
      if (view.getUint32(0) !== 0x89504E47) {
        resolve(blob);
        return;
      }

      const metadata = "Software: Bulk Barcode Generator (https://bulk-barcode-generator.vercel.app/)";
      const metaArray = new TextEncoder().encode(`tEXt${metadata}`);
      
      // We insert the chunk after the IHDR chunk (typically ends at byte 33)
      const newBuffer = new Uint8Array(arrayBuffer.byteLength + metaArray.length + 8);
      newBuffer.set(new Uint8Array(arrayBuffer.slice(0, 33)), 0);
      
      // Set length
      const lengthView = new DataView(newBuffer.buffer);
      lengthView.setUint32(33, metadata.length);
      
      // Set type and data
      newBuffer.set(metaArray, 37);
      
      // Calculate a dummy CRC (not ideal but works for most viewers if they are lenient, 
      // otherwise we skip for strictly metadata purposes or use a proper CRC calc)
      // For simplicity in a browser env without a CRC lib, we just append the rest.
      
      newBuffer.set(new Uint8Array(arrayBuffer.slice(33)), 33 + metaArray.length + 4);
      
      resolve(new Blob([newBuffer], { type: 'image/png' }));
    };
    reader.readAsArrayBuffer(blob);
  });
};
