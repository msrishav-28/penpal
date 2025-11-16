import { useState } from 'react';
import { Upload, FileText, Download, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

export default function Import() {
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      
      setImporting(true);
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);

      try {
        // Simulated upload - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        setImportResult({
          total: 150,
          imported: 142,
          skipped: 8,
          errors: [
            { title: 'Unknown Book 1', error: 'Book not found' },
            { title: 'Unknown Book 2', error: 'ISBN invalid' }
          ]
        });
      } catch (error) {
        console.error('Import failed:', error);
      } finally {
        setImporting(false);
      }
    }
  });

  const downloadTemplate = () => {
    // In real implementation, fetch from /api/import/template
    const csvContent = `Book Id,Title,Author,ISBN13,My Rating,Date Read,Exclusive Shelf,My Review
123456,The Great Gatsby,F. Scott Fitzgerald,9780743273565,4,2024/01/15,read,Amazing book about the American Dream.`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'goodreads-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            📥 Import Library
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Import your books from Goodreads or other platforms
          </p>
        </div>

        {/* Instruction Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-700/50">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">1️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Export from Goodreads</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Go to My Books → Import/Export → Export Library
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-700/50">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">2️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Download CSV</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Wait for email with your exported library
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-gray-200/50 dark:border-gray-700/50">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">3️⃣</span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Upload Here</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drag and drop or click to upload
            </p>
          </div>
        </div>

        {/* Upload Area */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-6 border border-gray-200/50 dark:border-gray-700/50">
          <div
            {...getRootProps()}
            className={`border-4 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
              isDragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
          >
            <input {...getInputProps()} />
            
            {importing ? (
              <div className="flex flex-col items-center gap-4">
                <Loader className="w-16 h-16 text-blue-600 animate-spin" />
                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                  Importing your library...
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  This may take a few minutes
                </div>
              </div>
            ) : (
              <>
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <div className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {isDragActive ? 'Drop your CSV file here' : 'Drag & drop your Goodreads CSV'}
                </div>
                <div className="text-gray-600 dark:text-gray-400 mb-4">
                  or click to browse files
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
                  <FileText className="w-4 h-4" />
                  Accepts .csv files only
                </div>
              </>
            )}
          </div>

          {/* Download Template Button */}
          <div className="mt-6 text-center">
            <button
              onClick={downloadTemplate}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Download className="w-5 h-5" />
              Download Sample Template
            </button>
          </div>
        </div>

        {/* Import Results */}
        {importResult && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Import Complete!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your library has been imported successfully
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {importResult.imported}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Imported</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {importResult.skipped}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Skipped</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-gray-600 dark:text-gray-400">
                  {importResult.total}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
              </div>
            </div>

            {/* Errors */}
            {importResult.errors.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Skipped Items ({importResult.errors.length})
                  </h4>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {importResult.errors.map((error: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm"
                    >
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {error.title}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">{error.error}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Supported Formats */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Supported Platforms
          </h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Goodreads CSV Export
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              StoryGraph Export (coming soon)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              LibraryThing Export (coming soon)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
