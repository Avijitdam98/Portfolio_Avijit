import React, { useState, useEffect } from 'react';

const CVManager = () => {
  const [cvVersions, setCVVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchCVVersions();
  }, []);

  const fetchCVVersions = async () => {
    try {
      const response = await fetch('/api/cv/versions');
      const data = await response.json();
      setCVVersions(data);
    } catch (error) {
      console.error('Error fetching CV versions:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('cv', file);

    setIsUploading(true);
    try {
      const response = await fetch('/api/cv/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        fetchCVVersions();
      }
    } catch (error) {
      console.error('Error uploading CV:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">Upload New CV</h3>
        <div className="mt-4">
          <label className="block">
            <span className="sr-only">Choose CV file</span>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
          {isUploading && (
            <p className="mt-2 text-sm text-indigo-600">Uploading...</p>
          )}
        </div>
      </div>

      {/* CV Versions List */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900">CV Versions</h3>
        <div className="mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cvVersions.map((version) => (
                  <tr key={version.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {version.version}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(version.uploadDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        version.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {version.isActive ? 'Active' : 'Archived'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => window.open(`/api/cv/download/${version.id}`, '_blank')}
                      >
                        Download
                      </button>
                      {!version.isActive && (
                        <button
                          className="text-green-600 hover:text-green-900"
                          onClick={() => {/* Set as active logic */}}
                        >
                          Set Active
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVManager;
