import axios from "axios";

let setLoading: (loading: boolean) => void = () => {};

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  setLoading(true);
  return config;
});

api.interceptors.response.use(
  (response) => {
    setLoading(false);
    return response;
  },
  (error) => {
    setLoading(false);
    return Promise.reject(error);
  }
);

export const registerLoadingHandler = (fn: typeof setLoading) => {
  setLoading = fn;
};
