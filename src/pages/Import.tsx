import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Download, CheckCircle, AlertCircle, Loader, Sparkles } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { TextReveal } from '../components/ui';

export default function Import() {
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      setImporting(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      setImportResult({ total: 150, imported: 142, skipped: 8, errors: [{ title: 'Unknown Book 1', error: 'Book not found' }, { title: 'Unknown Book 2', error: 'ISBN invalid' }] });
      setImporting(false);
    }
  });

  const downloadTemplate = () => {
    const csvContent = `Book Id,Title,Author,ISBN13,My Rating,Date Read,Exclusive Shelf,My Review\n123456,The Great Gatsby,F. Scott Fitzgerald,9780743273565,4,2024/01/15,read,Amazing book.`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'penpal-template.csv'; a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <Upload className="w-8 h-8 text-accent-violet" />
          <TextReveal as="h1" className="text-display-lg font-display text-text-primary">Import Library</TextReveal>
        </div>
        <p className="text-text-secondary">Import your books from Goodreads or other platforms</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[{ step: '1️⃣', title: 'Export from Goodreads', desc: 'Go to My Books → Import/Export' }, { step: '2️⃣', title: 'Download CSV', desc: 'Wait for email with export' }, { step: '3️⃣', title: 'Upload Here', desc: 'Drag and drop to upload' }].map((item, i) => (
          <motion.div key={item.step} className="glass-card p-6 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="w-12 h-12 bg-accent-violet/20 rounded-element flex items-center justify-center mx-auto mb-3"><span className="text-2xl">{item.step}</span></div>
            <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
            <p className="text-sm text-text-secondary">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div className="glass-card p-8 mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div {...getRootProps()} className={`border-4 border-dashed rounded-element p-12 text-center cursor-pointer transition-all ${isDragActive ? 'border-accent-violet bg-accent-violet/10' : 'border-glass-border hover:border-accent-violet/50'}`}>
          <input {...getInputProps()} />
          {importing ? (
            <div className="flex flex-col items-center gap-4">
              <Loader className="w-16 h-16 text-accent-violet animate-spin" />
              <div className="text-xl font-semibold text-text-primary">Importing your library...</div>
              <div className="text-text-secondary">This may take a few minutes</div>
            </div>
          ) : (
            <>
              <Upload className="w-16 h-16 text-text-tertiary mx-auto mb-4" />
              <div className="text-xl font-semibold text-text-primary mb-2">{isDragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV'}</div>
              <div className="text-text-secondary mb-4">or click to browse files</div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-violet/10 text-accent-violet rounded-element text-sm"><FileText className="w-4 h-4" />Accepts .csv files only</div>
            </>
          )}
        </div>
        <div className="mt-6 text-center">
          <motion.button onClick={downloadTemplate} className="inline-flex items-center gap-2 px-6 py-3 btn-holographic rounded-element font-semibold" whileHover={{ scale: 1.02 }}>
            <Download className="w-5 h-5" />Download Sample Template
          </motion.button>
        </div>
      </motion.div>

      {importResult && (
        <motion.div className="glass-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-accent-violet" />
            <div><h3 className="text-xl font-bold text-text-primary">Import Complete!</h3><p className="text-text-secondary">Your library has been imported successfully</p></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-accent-violet/10 rounded-element p-4 text-center"><div className="text-3xl font-bold text-accent-violet">{importResult.imported}</div><div className="text-sm text-text-secondary">Imported</div></div>
            <div className="bg-accent-gold/10 rounded-element p-4 text-center"><div className="text-3xl font-bold text-accent-gold">{importResult.skipped}</div><div className="text-sm text-text-secondary">Skipped</div></div>
            <div className="bg-graphite rounded-element p-4 text-center"><div className="text-3xl font-bold text-text-secondary">{importResult.total}</div><div className="text-sm text-text-tertiary">Total</div></div>
          </div>
          {importResult.errors.length > 0 && (
            <div className="border-t border-glass-border pt-4">
              <div className="flex items-center gap-2 mb-3"><AlertCircle className="w-5 h-5 text-accent-gold" /><h4 className="font-semibold text-text-primary">Skipped Items ({importResult.errors.length})</h4></div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {importResult.errors.map((error: any, i: number) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-accent-gold/10 rounded-element text-sm">
                    <AlertCircle className="w-4 h-4 text-accent-gold flex-shrink-0 mt-0.5" />
                    <div><div className="font-medium text-text-primary">{error.title}</div><div className="text-text-secondary">{error.error}</div></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      <motion.div className="mt-8 glass-card p-6 bg-gradient-to-r from-accent-violet/10 to-accent-fuchsia/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5 text-accent-violet" />Supported Platforms</h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent-violet" />Goodreads CSV Export</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent-violet" />StoryGraph Export (coming soon)</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent-violet" />LibraryThing Export (coming soon)</li>
        </ul>
      </motion.div>
    </div>
  );
}
