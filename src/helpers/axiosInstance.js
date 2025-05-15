// import axios from "axios";
// import { getCookie } from "cookies-next";

// // Créer une instance d'Axios
// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8016/api/',
//   // baseURL: 'https://orbitcity.sn/api/',
//   headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//   }
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//         const token = JSON.parse(getCookie('__CCBME_RH_REACT_AUTH__'));
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//         config.headers = {
//             Authorization : 'No Authorization'
//         };
//     }
    
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;

import axios from "axios"
import { getCookie } from "cookies-next"

// Créer une instance d'Axios
const axiosInstance = axios.create({
  // baseURL: "http://localhost:8016/api/",
  baseURL: 'https://orbitcity.sn/api/',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from cookie or localStorage
    const cookieToken = getCookie("__CCBME_RH_REACT_AUTH__TOKEN")
    const localStorageToken = localStorage.getItem("__CCBME_RH_REACT_AUTH__TOKEN")

    // Try to parse the token if it exists
    let token = null

    if (cookieToken) {
      try {
        token = JSON.parse(cookieToken)
      } catch (error) {
        console.warn("Failed to parse token from cookie:", error)
      }
    } else if (localStorageToken) {
      try {
        token = JSON.parse(localStorageToken)
      } catch (error) {
        console.warn("Failed to parse token from localStorage:", error)
      }
    }

    // Set the Authorization header if we have a token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      // Check if we're authenticated but token format is different
      const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

      if (isAuthenticated) {
        // Try to get the session object directly
        const sessionCookie = getCookie("__CCBME_RH_REACT_AUTH__")
        const sessionLocalStorage = localStorage.getItem("__CCBME_RH_REACT_AUTH__")

        let session = null

        if (sessionCookie) {
          try {
            session = JSON.parse(sessionCookie)
            if (session && session.access_token) {
              config.headers.Authorization = `Bearer ${session.access_token}`
            }
          } catch (error) {
            console.warn("Failed to parse session from cookie:", error)
          }
        } else if (sessionLocalStorage) {
          try {
            session = JSON.parse(sessionLocalStorage)
            if (session && session.access_token) {
              config.headers.Authorization = `Bearer ${session.access_token}`
            }
          } catch (error) {
            console.warn("Failed to parse session from localStorage:", error)
          }
        }
      } else {
        config.headers.Authorization = "No Authorization"
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the error is due to an unauthorized request (401)
    if (error.response && error.response.status === 401) {
      console.log("Token expired or invalid. Redirecting to login...")
      // Clear auth data
      localStorage.removeItem("isAuthenticated")
      // Redirect to login page
      window.location.href = "/auth/sign-in"
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
