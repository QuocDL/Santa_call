import { apiMeta } from "../utils/axiosConfig";

export const getAllAlbums = () => apiMeta.get("/get/list_image/all/1");
