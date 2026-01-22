import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { motion } from 'framer-motion';
import { Camera, X, Search, Loader, Sparkles } from 'lucide-react';

interface BarcodeScannerProps {
  onScan: (isbn: string) => void;
  onClose: () => void;
}

export default function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [manualISBN, setManualISBN] = useState('');
  const [error, setError] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    startScanner();
    return () => { stopScanner(); };
  }, []);

  const startScanner = async () => {
    try {
      setScanning(true); setError('');
      const html5QrCode = new Html5Qrcode('qr-reader');
      scannerRef.current = html5QrCode;
      await html5QrCode.start({ facingMode: 'environment' }, { fps: 10, qrbox: { width: 250, height: 150 } },
        (decodedText) => {
          const isbnMatch = decodedText.match(/\d{10,13}/);
          if (isbnMatch) { onScan(isbnMatch[0]); stopScanner(); }
        }, () => { });
    } catch (err) {
      console.error('Scanner error:', err);
      setError('Camera access denied. Please enter ISBN manually.');
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try { await scannerRef.current.stop(); scannerRef.current.clear(); } catch (err) { console.error('Error stopping scanner:', err); }
    }
    setScanning(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualISBN.trim()) onScan(manualISBN.trim());
  };

  return (
    <div className="fixed inset-0 bg-void/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div className="glass-card max-w-2xl w-full overflow-hidden" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <div className="flex items-center gap-3">
            <Camera className="w-6 h-6 text-accent-violet" />
            <h2 className="text-2xl font-display font-bold text-text-primary">Scan Barcode</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X className="w-6 h-6 text-text-secondary" /></button>
        </div>

        <div className="p-6 space-y-6">
          <div className="relative bg-graphite rounded-element overflow-hidden">
            <div id="qr-reader" className="w-full min-h-[300px]" />
            {scanning && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div className="border-2 border-accent-violet rounded-element w-64 h-40" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-graphite/90">
                <div className="text-center p-6">
                  <Camera className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
                  <p className="text-text-secondary text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>

          <div className="glass-card bg-accent-violet/10 p-4">
            <h3 className="font-semibold text-text-primary mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4 text-accent-violet" />How to scan:</h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Position the book's barcode in the highlighted area</li>
              <li>• Hold steady for automatic detection</li>
              <li>• Ensure good lighting for best results</li>
            </ul>
          </div>

          <div className="border-t border-glass-border pt-6">
            <h3 className="font-semibold text-text-primary mb-3">Or enter ISBN manually:</h3>
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input type="text" value={manualISBN} onChange={(e) => setManualISBN(e.target.value)} placeholder="Enter 10 or 13 digit ISBN" className="input-ethereal flex-1" pattern="\d{10,13}" />
              <motion.button type="submit" className="flex items-center gap-2 px-6 py-3 btn-holographic rounded-element font-semibold" whileHover={{ scale: 1.02 }}>
                <Search className="w-5 h-5" />Search
              </motion.button>
            </form>
          </div>

          {scanning && !error && (
            <div className="flex items-center justify-center gap-2 text-text-secondary">
              <Loader className="w-5 h-5 animate-spin text-accent-violet" /><span>Scanning for barcode...</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
