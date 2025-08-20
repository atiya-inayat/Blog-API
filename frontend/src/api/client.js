import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Auto-attach token if present
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("userInfo");
  const token = stored ? JSON.parse(stored)?.token : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
