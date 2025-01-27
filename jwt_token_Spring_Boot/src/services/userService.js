import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user';

class UserService {
    async getUserProfile() {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
}

export default new UserService();
