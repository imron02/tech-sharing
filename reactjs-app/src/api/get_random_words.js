import { axiosInstance } from "./axios";

export const getRandomWord = () => {
  return axiosInstance.get("/").then((response) => response.data);
};
