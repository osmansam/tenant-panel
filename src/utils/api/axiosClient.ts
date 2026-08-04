import axios from "axios";
import { camelCase, isArray, isPlainObject, transform } from "lodash";
import { logout } from "../auth";

function toCamelCase(obj: any): any {
  if (isArray(obj)) return obj.map(toCamelCase);
  if (isPlainObject(obj)) {
    return transform(obj, (result: any, value: any, key: string) => {
      result[key === "_id" ? "_id" : camelCase(key)] = toCamelCase(value);
    });
  }
  return obj;
}

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: "json",
  withCredentials: true,
});

export const ACCESS_TOKEN = "jwt";
let refreshPromise: Promise<unknown> | null = null;

axiosClient.interceptors.response.use(
  (response) => {
    if (response.data) response.data = toCamelCase(response.data);
    return response;
  },
  async (error) => {
    const request = error.config;
    const is401 = error?.response?.status === 401 || error?.response?.data?.statusCode === 401;
    if (!is401 || request?._retry || request?.url?.includes("/tenant/auth/refresh")) {
      return Promise.reject(error);
    }
    request._retry = true;
    try {
      refreshPromise ??= axios.post(
        `${import.meta.env.VITE_API_URL}/tenant/auth/refresh`,
        undefined,
        { withCredentials: true },
      ).finally(() => { refreshPromise = null; });
      await refreshPromise;
      return axiosClient(request);
    } catch (refreshError: any) {
      if (refreshError?.response?.status === 401) logout(true, "Session expired");
      return Promise.reject(refreshError);
    }
  },
);
