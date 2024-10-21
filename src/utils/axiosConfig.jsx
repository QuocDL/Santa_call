import axios from "axios";

const apiImg = axios.create({
  baseURL: "https://databaseswap.mangasocial.online",
});

const apiMeta = axios.create({
  baseURL: "https://databaseswap.mangasocial.online",
});
// new API
const apiAuth = axios.create({
  baseURL: 'https://api.funface.online'
})

const apiManga = axios.create({
  baseURL: "https://video.funface.online",
});

[apiImg, apiMeta, apiManga, apiAuth].map((item) =>
  item.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  )
);

export { apiImg, apiMeta, apiManga , apiAuth};
