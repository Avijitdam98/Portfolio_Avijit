import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_ENDPOINTS } from '../../config/api';

const SimpleAdmin = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_ENDPOINTS.cv}/list`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch CVs');
      }
      
      const data = await response.json();
      setCvs(data);
    } catch (error) {
      console.error('Error fetching CVs:', error);
      setError('Failed to load CVs');
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('cv', file);

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_ENDPOINTS.cv}/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload CV');
      }

      await fetchCVs(); // Refresh the list
      event.target.value = ''; // Reset file input
    } catch (error) {
      console.error('Error uploading CV:', error);
      setError(error.message || 'Failed to upload CV');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      setError(null);
      const response = await fetch(`${API_ENDPOINTS.cv}/${id}/toggle-active`, {
        method: 'PATCH',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to update CV status');
      }

      await fetchCVs(); // Refresh the list
    } catch (error) {
      console.error('Error updating CV:', error);
      setError('Failed to update CV status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this CV?')) return;

    try {
      setError(null);
      const response = await fetch(`${API_ENDPOINTS.cv}/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete CV');
      }

      await fetchCVs(); // Refresh the list
    } catch (error) {
      console.error('Error deleting CV:', error);
      setError('Failed to delete CV');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">CV Management</h1>

        {/* Upload Section */}
        <div className="mb-8 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Upload New CV</h2>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={loading}
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-600 file:text-white
                hover:file:bg-indigo-700
                disabled:opacity-50"
            />
            {loading && <span className="text-gray-400">Uploading...</span>}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-900/50 text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* CV List */}
        <div className="space-y-4">
          {cvs.map((cv) => (
            <motion.div
              key={cv._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gray-800 rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{cv.filename}</p>
                <p className="text-sm text-gray-400">
                  Uploaded: {new Date(cv.uploadDate).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleToggleActive(cv._id)}
                  className={`px-4 py-2 rounded-md ${
                    cv.isActive
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}
                >
                  {cv.isActive ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => handleDelete(cv._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleAdmin;
