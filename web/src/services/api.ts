import axios from 'axios';

const HOST = import.meta.env.VITE_API_URL || 'http://localhost:3333';

const api = axios.create({
  baseURL: HOST,
});

export default api;
