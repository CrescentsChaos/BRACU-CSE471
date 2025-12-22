import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    setLoading(true);

    const formData = new FormData();
    formData.append('myFile', file);

    try {
      const res = await axios.post('http://localhost:5000/api/files/upload', formData);
      setUploadUrl(res.data.url);
      //alert("Upload Successful!");
    } catch (err) {
      console.error(err);
      //alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-inner-container">
      <div className="input-group">
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="image/*,.pdf,.png,.webp,.gif,.jpeg,.jpg" 
          className="file-input-custom"
        />
        <button 
          onClick={handleUpload} 
          disabled={loading}
          className={`upload-button ${loading ? 'btn-loading' : 'btn-active'}`}
        >
          {loading ? 'Uploading...' : 'Upload to Cloud'}
        </button>
      </div> 
      {uploadUrl && (
        <div className="success-area">
          <p className="success-text">File Shared Successfully!</p>
          <a href={uploadUrl} target="_blank" rel="noreferrer" className="view-link">
            View File
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;