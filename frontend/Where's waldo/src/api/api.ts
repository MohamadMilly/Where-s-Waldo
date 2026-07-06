import axios, { type AxiosInstance } from "axios";

const token = localStorage.getItem("token");

export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  },
});

if (token) {
  apiClient.defaults.headers.common["authorization"] = `Bearer ${token}`;
}
