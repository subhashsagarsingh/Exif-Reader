import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // your backend URL
});

// Add token automatically if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
