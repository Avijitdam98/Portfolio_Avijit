import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SimpleAdmin = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch CVs
  const fetchCVs = async () => {
    try {
      setError(null);
      const response = await fetch('/api/cv/list');
      if (!response.ok) {
        throw new Error('Failed to fetch CVs');
      }
      const data = await response.json();
      setCvs(data.cvs || []);
    } catch (error) {
      console.error('Error fetching CVs:', error);
      setError('Failed to load CVs. Please try again.');
    }
  };

  useEffect(() => {
    fetchCVs();
  }, []);

  // Upload CV
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('cv', file);
    formData.append('title', file.name.replace('.pdf', ''));

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/cv/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload CV');
      }
      
      fetchCVs(); // Refresh the list
    } catch (error) {
      console.error('Error uploading CV:', error);
      setError('Failed to upload CV. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle CV active status
  const handleToggleActive = async (id) => {
    try {
      setError(null);
      const response = await fetch(`/api/cv/${id}/toggle-active`, {
        method: 'PATCH',
      });
      
      if (!response.ok) {
        throw new Error('Failed to update CV status');
      }
      
      fetchCVs(); // Refresh the list
    } catch (error) {
      console.error('Error updating CV status:', error);
      setError('Failed to update CV status. Please try again.');
    }
  };

  // Delete CV
  const handleDelete = async (id) => {
    try {
      setError(null);
      const response = await fetch(`/api/cv/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete CV');
      }
      
      fetchCVs(); // Refresh the list
    } catch (error) {
      console.error('Error deleting CV:', error);
      setError('Failed to delete CV. Please try again.');
    }
  };

  // Handle download
  const handleDownload = async (id) => {
    try {
      setError(null);
      const response = await fetch('/api/cv/latest');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to download CV');
      }
      
      // Get the filename from the Content-Disposition header if available
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'Avijit_Dam_CV.pdf';
      if (contentDisposition) {
        const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading CV:', error);
      setError(error.message || 'Failed to download CV. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">CV Manager</h1>
      
      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {/* Upload Section */}
      <div className="mb-8 p-4 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Upload New CV</h2>
        <input
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          disabled={loading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {loading && <p className="mt-2 text-sm text-blue-600">Uploading...</p>}
      </div>

      {/* CV List */}
      <div className="bg-white rounded shadow">
        <h2 className="text-lg font-semibold p-4 border-b">Uploaded CVs</h2>
        <div className="divide-y">
          {cvs.map((cv) => (
            <motion.div
              key={cv.id}
              className="p-4 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{cv.title}</p>
                  {cv.isActive && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Uploaded: {new Date(cv.uploadDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleToggleActive(cv.id)}
                  className={`inline-flex items-center px-3 py-1.5 text-sm font-medium text-white rounded-md transition-all duration-200 group ${
                    cv.isActive
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={cv.isActive 
                        ? "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" 
                        : "M5 13l4 4L19 7"
                      }
                    />
                  </svg>
                  {cv.isActive ? 'Deactivate' : 'Activate'}
                </button>
                
                <button
                  onClick={() => handleDownload(cv.id)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-1.5 group-hover:translate-y-0.5 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v12m0 0l-4-4m4 4l4-4m-4 8v0"
                    />
                  </svg>
                  Download
                </button>

                <button
                  onClick={() => handleDelete(cv.id)}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md hover:from-red-600 hover:to-red-700 transition-all duration-200 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
          {cvs.length === 0 && (
            <p className="p-4 text-gray-500">No CVs uploaded yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleAdmin;
