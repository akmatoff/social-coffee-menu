import axios from "axios";
import { API_URL } from "../config";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
  } else {
    const language = navigator.language || "ru";
    config.headers["Accept-Language"] = language;
  }

  return config;
});

export default api;
