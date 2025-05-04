let token = '';

export default {
    setToken(token) {
      localStorage.setItem('token', token);
    },
    getToken() {
      return localStorage.getItem('token');
    },
    removeToken() {
      localStorage.removeItem('token');
    },
    setAuthData(token, expiresIn) {
        localStorage.setItem('token', token);
        localStorage.setItem('token_expiry', Date.now() + expiresIn * 1000);
    }
  };


