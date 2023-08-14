import axios from "axios";

const instance = axios.create({
  baseURL: "https://exam.pishgamanasia.com/webapi",
});

instance.interceptors.request.use((config) => {
  let token = localStorage.getItem("asia_toke");
  if (token)
    config.data = {
      ...config.data,
      token,
    };

  return config;
});

export default instance;
