import React, { useState, useEffect } from 'react';
import ApiService from '../../api/apiService';
import Alert from '../shared/Alert';
import useAlert from '../../hooks/useAlert';

const GrantAccessForm = () => {
    const [users, setUsers] = useState([]);
    const [vms, setVMs] = useState([]);
    const [user_id, setUserId] = useState('');
    const [vm_id, setVMId] = useState('');

    const {alert, showAlert, hideAlert } = useAlert();

    useEffect(() => {
        const fetchUsersAndVMs = async () => {
            try {
                const [userResponse, vmResponse] = await Promise.all([
                    ApiService.getUsers(), 
                    ApiService.getVMs()
                ]);
                setUsers(userResponse.users);
                setVMs(vmResponse.vms);
            } catch (error) {
                console.error('Error fetching users and VMs:', error);
            }
        };

        fetchUsersAndVMs();
    }, []);

    const handleGrantAccess = async (e) => {
        e.preventDefault();
        try {
            await ApiService.grantAccess(user_id, vm_id);
            showAlert({ show: true, text: 'Access granted successfully', type: 'success'});
        } catch (error) {
            showAlert({ show: true, text: `${error.response.data.message}`, type: 'danger'});
        }
        setTimeout(() => {
            hideAlert();
          }, [3000])
    };

    const handleRevokeAccess = async (e) => {
        e.preventDefault();
        try {
            await ApiService.revokeAccess(user_id, vm_id);
            showAlert({ show: true, text: 'Access revoked successfully', type: 'success'});
        } catch (error) {
            showAlert({ show: true, text: `${error.response.data.message}`, type: 'danger'});
        }
        setTimeout(() => {
            hideAlert();
          }, [3000])
    };

    return (
        <form className='font-poppins justify-center'>
            {alert.show && <Alert {...alert} />}
            <label>
                <p className='font-semibold'>Select User:</p>
                <select className="border rounded-md px-2 py-1" value={user_id} onChange={(e) => setUserId(e.target.value)} required>
                    <option value="" disabled>Select a user</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.email}</option>
                    ))}
                </select>
            </label>
            <br />
            <label className=''>
                <p className='font-semibold mt-3'>Select VM:</p>
                <select className="border rounded-md px-2 py-1" value={vm_id} onChange={(e) => setVMId(e.target.value)} required>
                    <option value="" disabled>Select a VM</option>
                    {vms.map(vm => (
                        <option key={vm.id} value={vm.id}>{vm.name}</option>
                    ))}
                </select>
            </label>
            <br />
            <div className='container items-center h-fit flex-row'>
                <button 
                    className="w-1/2 mt-3 bg-nokiaBlue text-white rounded-md px-4 py-2 mr-2" 
                    type="button"
                    onClick={handleGrantAccess}
                >
                    Grant Access
                </button>
                <button 
                    className="w-1/2 mt-3 bg-red-500 text-white rounded-md px-4 py-2" 
                    type="button"
                    onClick={handleRevokeAccess}
                >
                    Revoke Access
                </button>
            </div>
        </form>
    );
};

export default GrantAccessForm;