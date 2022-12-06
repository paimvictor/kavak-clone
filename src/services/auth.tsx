import axios from "axios";

const API_URL = "http://localhost:8000/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "accounts/login", {
        email,
        password
      })
      .then(response => {
        if (response.data.access) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }


  async refreshAccessToken() {
    const newAcessToken = await axios
     .post(API_URL + 'api/token/refresh/', 
     { refresh: this.getCurrentUser().refresh});
    
     if (newAcessToken.data.access) {
       const oldUserData = this.getCurrentUser()
      oldUserData.access = newAcessToken.data.access
      

       localStorage.setItem("user", JSON.stringify(oldUserData));
     }
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email: string, password: string) {
    return axios.post(API_URL + "accounts/register", {
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') ?? '{}');
  }
}

export default new AuthService();