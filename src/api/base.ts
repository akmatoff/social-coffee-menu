import axios from "axios";
import { API_URL } from "../config";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    // Server-side: add Accept-Language from global context if available
    // You must manually pass language to the axios call in SSR
  } else {
    const language = navigator.language || "ru";
    config.headers["Accept-Language"] = language;
  }

  return config;
});

export default api;
