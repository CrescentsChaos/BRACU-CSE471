import React from 'react';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      {/* Container Card */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-indigo-600 p-8 text-center text-white">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Skill Swap <span className="text-indigo-200">2.0</span>
          </h1>
          <p className="text-indigo-100 font-medium">
            Securely share PDFs and Images via Cloudinary
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800">Upload Assets</h2>
            <p className="text-sm text-slate-500">Supported formats: PNG, JPG, PDF (Max 10MB)</p>
          </div>
          
          <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-4 transition-all hover:border-indigo-300">
             <FileUpload />
          </div>
        </div>

        {/* Footer info */}
        <footer className="bg-slate-50 border-t border-slate-100 p-4 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Powered by Cloudinary & React
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;