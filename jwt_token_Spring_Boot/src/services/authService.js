import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

class AuthService {
    async login(loginData) {
        const response = await axios.post(`${API_URL}/login`, loginData);
        return response.data;
    }

    async register(registerData) {
        const response = await axios.post(`${API_URL}/register`, registerData);
        return response.data;
    }

    logout() {
        localStorage.removeItem('token');
    }

    getCurrentUser() {
        return localStorage.getItem('token');
    }
}

export default new AuthService();
