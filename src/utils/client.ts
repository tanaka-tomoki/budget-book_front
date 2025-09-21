import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 環境変数からベースURLを取得
  timeout: 100000, // タイムアウトを100秒に設定
  headers: {
    "Content-Type": "application/json",
  },
});

// リクエスト関数の型定義
type RequestFunc = <T = any, R = AxiosResponse<T>>(
  url: string,
  config?: AxiosRequestConfig,
) => Promise<R>;

// リクエスト関数
const request: RequestFunc = (url, config) =>
  client.request({ ...config, url });

// 汎用的なAPIリクエスト関数
export const api = {
  get: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>(url, { ...config, method: "get", data }),
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>(url, { ...config, method: "post", data }),
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    request<T>(url, { ...config, method: "put", data }),
  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    request<T>(url, { ...config, method: "delete" }),
  // 他のHTTPメソッドも同様に追加可能
};
export default api;
