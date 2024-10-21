import { apiMeta, apiManga } from "../utils/axiosConfig";

export const uploadImg = (formData) =>
  apiMeta.post("/upload-gensk/200?type=src_nam", formData);

export const swapAlbumImages = (albumId, imgSrc, idUser) =>
  apiManga.get(
    `/getdata/swap/listimage?device_them_su_kien=gdgdgf&ip_them_su_kien=dfbdfbdf&id_user=${idUser}&list_folder=album_${albumId}`,
    { headers: { link1: imgSrc } }
  );

export const swapVideo = (albumId, imgSrc) =>
  apiManga.get(
    `/getdata/swap/listimage?device_them_su_kien=gdgdgf&ip_them_su_kien=dfbdfbdf&id_user=144&list_folder=album_${albumId}`,
    { headers: { link1: imgSrc } }
  );
