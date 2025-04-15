import axios from "axios";
import { getCookie } from "cookies-next"; 

// Créer une instance d'Axios
const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8016/api',
  baseURL: 'https://orbitcity.sn/api/',
  headers: {
      'Content-Type': 'application/json', 
      'Accept': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
        const token = JSON.parse(getCookie('__CCBME_RH_REACT_AUTH__'));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
        config.headers = {
            Authorization : 'No Authorization'
        };
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;