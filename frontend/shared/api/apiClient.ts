import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.frankfurter.dev/v2",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});
