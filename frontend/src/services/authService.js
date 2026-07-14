import API from "../api/axios";

export const registerUser = (userData) => {
  return API.post("/auth/register", userData);
};

export const loginUser = (credentials) => {
  return API.post("/auth/login", credentials);
};

export const getProfile = () => {
  return API.get("/auth/profile");
};