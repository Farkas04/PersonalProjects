import axios from 'axios';
import AuthService from './authService';

const API_URL = 'http://127.0.0.1:5000';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const access_token = AuthService.getAccessToken();
        if (access_token) {
            config.headers['Authorization'] = `Bearer ${access_token}`;
        }
        config.headers['Content-Type'] = 'application/json';
        config.headers['Access-Control-Allow-Origin'] = '*';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const newAccessToken = await AuthService.refreshAccessToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
        } catch (refreshError) {
            AuthService.logout(); // Perform logout if refresh fails
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});

// User endpoints

const getCurrentUser = async () => {
    try {
        const response = await axiosInstance.get('/user/user');
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getUsers = async () => {
    try {
        const response = await axiosInstance.get('/user/users');
        return response.data;
    } catch (error) {
        throw error;
    }
}

//vm Endpoints

const createVM = async (vmData) => {
    try {
        const response = await axiosInstance.post('/vm/vms', vmData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteVM = async (vmId) => {
    try {
        const response = await axiosInstance.delete(`/vm/vms/${vmId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getVMs = async () => {
    try {
        const response = await axiosInstance.get('/vm/vms');
        return response.data;
    } catch (error) {
        throw error;
    }
};

//vm access endpoints

const grantAccess = async (user_id, vm_id) => {
    try {
        const response = await axiosInstance.post('/vm/vms/grant_access', { user_id, vm_id });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const revokeAccess = async (user_id, vm_id) => {
    try {
        const response = await axiosInstance.post('/vm/vms/revoke_access', { user_id, vm_id });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//ssh endpoints

const connectSSH = async (hostname, username, password) => {
    try {
        const response = await axiosInstance.post('/ssh/connect', { hostname, username, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const runScript = async (command) => {
    try {
        const response = await axiosInstance.post('/ssh/execute', { command });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const closeSSH = async () => {
    try {
        const response = await axiosInstance.post('/ssh/close');
        return response.data;
    } catch(error) {
        throw error;
    }
}

export default {
    getCurrentUser,
    createVM,
    deleteVM,
    getVMs,
    getUsers,
    grantAccess,
    revokeAccess,
    connectSSH,
    runScript,
    closeSSH
};
