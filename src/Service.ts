import axios, { AxiosResponse } from "axios";
import handleAxiosResponseError from "./utils/handleAxiosResponseError";
import handleAxiosResponseSuccess from "./utils/handleAxiosResposeSuccess";

const Http = axios.create();

function getData<T>(response: AxiosResponse<T>) {
  return response.data;
}

class Service {
  protected static Http = Http;
  protected static getData = getData;
}

Http.defaults.baseURL = "http://192.168.15.126:8080";

Http.interceptors.response.use(
  handleAxiosResponseSuccess,
  handleAxiosResponseError
);

export default Service;
