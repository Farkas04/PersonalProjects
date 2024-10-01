import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Function to refresh the access token
const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
        const response = await axios.post(`${API_URL}/user/refresh`, {}, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });
        const { access_token } = response.data;
        localStorage.setItem('access_token', access_token);
        sessionStorage.setItem('access_token', access_token);
        return access_token;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
};

// Request interceptor to add the Authorization header
axiosInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    config.headers['Content-Type'] = 'application/json';
    config.headers['Access-Control-Allow-Origin'] = '*';
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle responses
axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const newAccessToken = await refreshAccessToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
        } catch (refreshError) {
            logout(); // Perform logout if refresh fails
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});

const register = (username, email, password) => {
    return axiosInstance.post('/user/register', {
        username,
        email,
        password
    });
};

const login = async (email, password, rememberMe) => {
    try {
        const response = await axios.post(`${API_URL}/user/login`, {
            email,
            password
        });

        if (response.data.access_token) {
            const { access_token, refresh_token } = response.data;

            if (rememberMe) {
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
            } else {
                sessionStorage.setItem('access_token', access_token);
                sessionStorage.setItem('refresh_token', refresh_token);
            }

            await fetchAdminStatus(rememberMe);
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

const fetchAdminStatus = async (rememberMe) => {
    const accessToken = getAccessToken();
    if (accessToken) {
        const response = await axios.get(`${API_URL}/user/isAdmin`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const isAdmin = response.data.is_admin;
        if (rememberMe) {
            localStorage.setItem('is_admin', isAdmin);
        } else {
            sessionStorage.setItem('is_admin', isAdmin);
        }
    }
};

const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('is_admin');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('is_admin');
};

const deleteUser = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/user/delete/${userId}`);
        logout();
        window.location.reload();
        return response.data; // Return the success message from the server
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; // Rethrow to handle it in the UI layer, such as showing an error message to the user
    }
};


const getAccessToken = () => {
    return localStorage.getItem('access_token') || sessionStorage.getItem('access_token') || null;
};

const getAdminState = () => {
    const isAdmin = localStorage.getItem('is_admin') === 'true' || sessionStorage.getItem('is_admin') === 'true';
    return isAdmin;
};

export default {
    register,
    login,
    logout,
    deleteUser,
    getAccessToken,
    getAdminState,
    refreshAccessToken
};