import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/';

class UserService {
  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  refreshAccessToken() {
    return axios.post(API_URL + 'api/token/refresh/', { refresh: JSON.parse(localStorage.getItem('user') ?? '{}').refresh});
  }
}

export default new UserService();