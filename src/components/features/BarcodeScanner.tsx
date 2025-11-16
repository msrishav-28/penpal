import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, X, Search, Loader } from 'lucide-react';

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
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      setScanning(true);
      setError('');

      const html5QrCode = new Html5Qrcode('qr-reader');
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 150 }
        },
        (decodedText) => {
          // ISBN can be 10 or 13 digits
          const isbnMatch = decodedText.match(/\d{10,13}/);
          if (isbnMatch) {
            onScan(isbnMatch[0]);
            stopScanner();
          }
        },
        () => {
          // Scan error - ignore for continuous scanning
        }
      );
    } catch (err) {
      console.error('Scanner error:', err);
      setError('Camera access denied or not available. Please enter ISBN manually.');
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
    setScanning(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualISBN.trim()) {
      onScan(manualISBN.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Camera className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Scan Barcode
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Scanner Area */}
        <div className="p-6 space-y-6">
          {/* Camera View */}
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden">
            <div id="qr-reader" className="w-full min-h-[300px]" />
            {scanning && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="border-2 border-blue-500 rounded-lg w-64 h-40 animate-pulse" />
              </div>
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90">
                <div className="text-center p-6">
                  <Camera className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-white text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              📸 How to scan:
            </h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Position the book's barcode in the highlighted area</li>
              <li>• Hold steady for automatic detection</li>
              <li>• Ensure good lighting for best results</li>
              <li>• The ISBN will be detected automatically</li>
            </ul>
          </div>

          {/* Manual ISBN Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              Or enter ISBN manually:
            </h3>
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                value={manualISBN}
                onChange={(e) => setManualISBN(e.target.value)}
                placeholder="Enter 10 or 13 digit ISBN"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                pattern="\d{10,13}"
                title="ISBN must be 10 or 13 digits"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </form>
          </div>

          {/* Status */}
          {scanning && !error && (
            <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
              <Loader className="w-5 h-5 animate-spin" />
              <span>Scanning for barcode...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
