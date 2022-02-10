import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

import handleAxiosResponseError from "./utils/handleAxiosResponseError";
import handleAxiosResponseSuccess from "./utils/handleAxiosResposeSuccess";

const Http = axios.create();

function getData<T>(response: AxiosResponse<T>) {
  return response.data;
}

class Service {
  protected static Http = Http;
  protected static getData = getData;

  public static setRequestInterceptors(
    onFulfilled: (
      request: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    onRejected?: (error: any) => any
  ) {
    Http.interceptors.request.use(onFulfilled, onRejected);
  }
}

Http.defaults.baseURL = "http://192.168.15.126:8080";

Http.interceptors.response.use(
  handleAxiosResponseSuccess,
  handleAxiosResponseError
);

export default Service;
