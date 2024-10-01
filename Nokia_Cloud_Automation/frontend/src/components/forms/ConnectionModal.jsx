import React, { useState } from 'react';

const ConnectionModal = ({ isOpen, onClose, onSubmit, vmData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedVM, setSelectedVM] = useState(vmData.VM1);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onSubmit({ username, password, vm: selectedVM }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-md shadow-md z-10 w-1/3">
        <h2 className="text-lg font-bold mb-4">Connect to {vmData.name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
              // required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">VM</label>
            <select
              value={selectedVM}
              onChange={(e) => setSelectedVM(e.target.value)}
              className="border rounded-md px-3 py-2 w-full bg-gray-100"
            >
              <option value={vmData.VM1}>{vmData.VM1}</option>
              {vmData.VM2 !== '0' && (
                <option value={vmData.VM2}>{vmData.VM2}</option>
              )}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 border rounded-md bg-red-500 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md relative"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loader"></div>  // Show spinner when loading
              ) : (
                "Connect"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConnectionModal;