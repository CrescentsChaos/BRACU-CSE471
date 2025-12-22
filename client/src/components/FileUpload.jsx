import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState(''); // New error state

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(''); // Clear error when new file selected
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setError("Please select a file first!");

    const formData = new FormData();
    formData.append('myFile', file);

    setLoading(true);
    setError(''); // Reset error before starting
    
    try {
      const res = await axios.post('http://localhost:5000/api/files/upload', formData);
      setFileUrl(res.data.url);
      alert("Upload Successful!");
    } catch (err) {
      console.error("Full Error Object:", err);
      
      // Capture specific error message from Backend or Network
      const message = err.response?.data?.error || err.message || "Server is unreachable";
      setError(`Upload failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Upload Image or PDF</h3>
      <input type="file" onChange={handleFileChange} accept="image/*,.pdf" />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload to Cloud'}
      </button>

      {/* ERROR DISPLAY SECTION */}
      {error && (
        <div style={{ marginTop: '10px', color: 'red', fontWeight: 'bold' }}>
          ⚠️ {error}
        </div>
      )}

      {fileUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>✅ File Shared!</p>
          <a href={fileUrl} target="_blank" rel="noreferrer">View / Download File</a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;