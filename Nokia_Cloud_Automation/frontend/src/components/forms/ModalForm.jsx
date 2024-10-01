// ModalForm.js
import React, { useState } from 'react';
import useAlert from '../../hooks/useAlert';
import Alert from '../shared/Alert';


const ModalForm = ({ isOpen, onClose, onSubmit }) => {
  const [vmData, setVmData] = useState({
    name: '',
    topology: '',
    VM1: '',
    VM2: '',
    M_Plane: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setVmData({ ...vmData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(vmData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-2/5">
        <h2 className="text-2xl mb-6">Add New VM</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={vmData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Topology</label>
              <input
                type="text"
                name="topology"
                value={vmData.topology}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">VM1</label>
              <input
                type="text"
                name="VM1"
                value={vmData.VM1}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">VM2</label>
              <input
                type="text"
                name="VM2"
                value={vmData.VM2}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">M-Plane</label>
              <input
                type="text"
                name="M_Plane"
                value={vmData.M_Plane}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg text-gray-700"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className='loader'></div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
