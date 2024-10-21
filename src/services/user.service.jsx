import { apiAuth, apiImg } from "../utils/axiosConfig";

export const changeAvatar = (id, formData) =>
  apiAuth.post(`/changeavatar/${id}`, formData);

export const uploadImg = (data) => apiImg.post("/1/upload", data);

