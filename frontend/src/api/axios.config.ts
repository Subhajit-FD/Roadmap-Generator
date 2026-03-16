import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  withCredentials: true,
});

export default api;