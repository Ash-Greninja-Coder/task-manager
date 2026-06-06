import axios from "axios";

const api = axios.create({
  // 1. Check if Vercel provided a live URL. 
  // 2. If it didn't find one, fall back to your local machine server automatically!
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;