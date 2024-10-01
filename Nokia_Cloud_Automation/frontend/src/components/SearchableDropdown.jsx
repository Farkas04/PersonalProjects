import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa'

const SearchableDropdown = ({ vms, vm_id, setVMId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    
    const filteredVms = vms.filter(vm =>
      vm.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
      <div className="relative w-64">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
        >
          Select VM
          <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>
          {isOpen && (
            <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg w-full">
              <div className="p-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Search..."
                  />
                  <FaSearch className="absolute top-3 right-3 text-gray-400" />
                </div>
              </div>
              <ul className="max-h-60 overflow-auto">
                {filteredVms.length > 0 ? (
                  filteredVms.map(vm => (
                    <li
                      key={vm.id}
                      onClick={() => {
                        setVMId(vm.id);
                        setSearchTerm(vm.name);
                        setIsOpen(false);
                      }}
                      className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                    >
                      <input
                        id={`checkbox-item-${vm.id}`}
                        type="checkbox"
                        checked={vm_id === vm.id}
                        onChange={() => setVMId(vm.id)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label htmlFor={`checkbox-item-${vm.id}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{vm.name}</label>
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No results found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      );
}

export default SearchableDropdown