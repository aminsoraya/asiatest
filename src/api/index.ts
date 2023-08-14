import axios from "axios";


const InstanceEnhancer = ({ appendToken }: { appendToken?: boolean }) => {
  const instance = axios.create({
    baseURL: "https://exam.pishgamanasia.com/webapi",
  });

  instance.interceptors.request.use((config) => {
    let token = localStorage.getItem("asia_token");

    if (token && appendToken)
      config.data = {
        ...config.data,
        token,
      };

    return config;
  });

  return instance;
};

export default InstanceEnhancer;
