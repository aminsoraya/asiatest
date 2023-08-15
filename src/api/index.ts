import axios from "axios";

const InstanceEnhancer = ({ appendToken }: { appendToken?: boolean }) => {
  const instance = axios.create({
    baseURL: "https://exam.pishgamanasia.com/webapi",
  });

  instance.interceptors.request.use((config) => {
    let userToken =  localStorage.getItem("asia_token") ;
    if (userToken && appendToken && config.method == "post")
      config.data = {
        ...config.data,
        userToken,
      };
    else if (userToken && appendToken && config.method == "get")
      config.params = { ...config.params, userToken };

    return config;
  });

  return instance;
};

export default InstanceEnhancer;
