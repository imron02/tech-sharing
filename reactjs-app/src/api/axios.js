import axios from "axios";

const defaultOptions = {
  baseURL: 'http://localhost:3030',
  timeout: 30000
};

export const axiosInstance = axios.create(defaultOptions);