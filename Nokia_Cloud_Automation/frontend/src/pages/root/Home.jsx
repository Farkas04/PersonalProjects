import React, { useEffect, useState } from 'react';
import NavBar from '../../components/shared/NavBar';
import VMBox from '../../components/vmbox/VMBox';
import ApiService from '../../api/apiService';
import AuthService from '../../api/authService';
import ModalForm from '../../components/forms/ModalForm';
import AddVMBox from '../../components/vmbox/AddVMBox';
import ExtendVMBox from '../../components/vmbox/ExtendVMBox';
import useAlert from '../../hooks/useAlert';
import Alert from '../../components/shared/Alert';

const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVM, setSelectedVM] = useState(null);
  const [showOnlyAccessible, setShowOnlyAccessible] = useState(false);
  const {alert, showAlert, hideAlert } = useAlert();

  useEffect(() => {
    const isAdmin = AuthService.getAdminState();
    setIsAdmin(isAdmin);
  }, []);

  useEffect(() => {
    ApiService.getVMs().then(rawData => {
      const sortedData = rawData.vms.sort((a, b) => b.has_access - a.has_access);
      setData(sortedData);
      setFilteredData(sortedData);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  useEffect(() => {
    if (showOnlyAccessible) {
      setFilteredData(data.filter(vm => vm.has_access));
    } else {
      setFilteredData(data);
    }
  }, [showOnlyAccessible, data]);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const handleFormSubmit = async (newData) => {
    try {
      const response = await ApiService.createVM(newData);
      showAlert({ show: true, text: 'VM added successfully!', type: 'success' });
    } catch (error) { 
      console.log(error)
      showAlert({ show: true, text: `${error.response.data.error}`, type: 'danger' })
    }
    setTimeout(() => {
      hideAlert();
      window.location.reload();
    }, [3000])
  };

  const handleVMClick = (vmData) => {
    setSelectedVM(vmData);
  };

  const handleVMDelete = async (vmId) => {
    try {
      await ApiService.deleteVM(vmId);
      setData(data.filter(vm => vm.id !== vmId));
      showAlert({ show: true, text: 'VM deleted successfully!', type: 'success' });
    } catch (error) {
      showAlert({ show: true, text: `${error}`, type: 'danger' })
    }
    setTimeout(() => {
      hideAlert();
    }, [3000])
  };

  const toggleAccessFilter = () => {
    setShowOnlyAccessible(!showOnlyAccessible);
  };

  return (
    <div className='px-10 pb-10 pt-32 flex w-full'>
      {alert.show && <Alert {...alert} />}
      <div className='flex-col w-5/12'>
        <div className="flex items-center gap-2 mb-5">
          <label className="relative inline-block w-14 h-8">
            <input type="checkbox" className="sr-only" onChange={toggleAccessFilter}/>
            <span className="block w-14 h-8 bg-gray-300 rounded-full shadow-inner"></span>
            <span className="absolute block w-6 h-6 mt-1 ml-1 rounded-full bg-white shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out" 
                role="checkbox"
                tabIndex="0"></span>
          </label>
          <span className="text-sm text-white font-semibold">Show Accessible VMs Only</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-r-white border-r-2 pr-6">
        {filteredData.map((row, index) => (
          <div key={index} className={row.has_access ? '' : 'opacity-50'}>
            <VMBox data={row} onClick={() => handleVMClick(row)} onDelete={handleVMDelete} />
          </div>
        ))}
        {isAdmin && (
          <AddVMBox onClick={handleAddClick} />
        )}
        </div>
      </div>
      <div className='w-7/12 pl-6 flex items-start'>
        <ExtendVMBox vmData={selectedVM} />
      </div>
      <ModalForm isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleFormSubmit} />
    </div>
  )
}

export default Home;
