import React from 'react';

const AddVMBox = ({ onClick }) => {
  return (
    <div
      className="border p-4 bg-white shadow-md rounded-md flex items-center justify-center cursor-pointer h-[142px]"
      onClick={onClick}
    >
      <span className="text-4xl font-bold text-gray-700">+</span>
    </div>
  );
};

export default AddVMBox;
