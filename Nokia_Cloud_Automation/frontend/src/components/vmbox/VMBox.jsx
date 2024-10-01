import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import AuthService from '../../api/authService';

const VMBox = ({ data, onClick, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const isAdmin = AuthService.getAdminState();
    setIsAdmin(isAdmin);
  }, []);

  return (
    <div
      className="relative border p-4 bg-white shadow-md rounded-md cursor-pointer hover:bg-gray-100"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && isAdmin && (
        <div
          className="absolute top-2 right-2 text-gray-300 hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(data.id);
          }}
        >
          <FaTrash />
        </div>
      )}
      <h2 className="text-lg font-bold mb-4">{data.name}</h2>
      <div className="mb-2">
        <span className="font-semibold capitalize">VM1:</span> {data.VM1}
      </div>
      {data.VM2 !== '0' && (
        <div className="mb-2">
          <span className="font-semibold capitalize">VM2:</span> {data.VM2}
        </div>
      )}
      <div className="mb-2">
        <span className="font-semibold capitalize">Owner:</span> {data.owner}
      </div>
    </div>
  );
};

export default VMBox;