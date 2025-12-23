import axios, { AxiosHeaders } from "axios";
import Cookies from "js-cookie";
import { camelCase, isArray, isPlainObject, transform } from "lodash";

// Recursively convert all keys in an object from PascalCase to camelCase
// Special handling: preserve _id fields (don't convert to id)
function toCamelCase(obj: any): any {
  if (isArray(obj)) {
    return obj.map((item) => toCamelCase(item));
  }

  if (isPlainObject(obj)) {
    return transform(obj, (result: any, value: any, key: string) => {
      // Preserve _id as-is (don't convert to id)
      const camelKey = key === "_id" ? "_id" : camelCase(key);
      result[camelKey] = toCamelCase(value);
    });
  }

  return obj;
}

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  responseType: "json",
});

export const ACCESS_TOKEN = "jwt";

axiosClient.interceptors.request.use(
  async (req) => {
    const accessToken = Cookies.get(ACCESS_TOKEN);

    if (accessToken) {
      (req.headers as AxiosHeaders).set(
        "Authorization",
        `Bearer ${accessToken}`
      );
    }

    return req;
  },

  (err) => Promise.reject(err)
);

axiosClient.interceptors.response.use(
  (response) => {
    // Transform response data from PascalCase to camelCase
    if (response.data) {
      response.data = toCamelCase(response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.data?.statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/tenant/auth/refresh`,
            {
              refreshToken,
            }
          );

          const { data } = response.data;
          const newAccessToken = data.accessToken;
          Cookies.set("jwt", newAccessToken);
          localStorage.setItem("jwt", newAccessToken);

          // Update the authorization header and retry the original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          Cookies.remove("jwt");
          Cookies.remove("refreshToken");
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, clear everything and redirect
        Cookies.remove("jwt");
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
