import axios, { AxiosRequestConfig } from 'axios';
// import toast from 'react-hot-toast';
// import { tokenRefresh } from '../services/api';
const API = axios.create({
  baseURL: 'https://mymoobe-4cn4h6o76q-du.a.run.app',
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// 토큰이 갱신되었을 때 대기 중인 요청들을 처리하는 함수
function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

// 토큰 갱신 중일 때 대기 중인 요청을 큐에 추가하는 함수
function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

// 토큰을 갱신하는 함수
async function refreshToken() {
  const response = await API.post('/auth/Refresh');
  return response.data.access_token;
}

// 원래 요청을 갱신된 토큰으로 다시 시도하는 함수
function retryOriginalRequest(
  originalRequest: AxiosRequestConfig,
  token: string,
) {
  originalRequest.headers = {
    ...originalRequest.headers,
    Authorization: `Bearer ${token}`,
  };
  return axios(originalRequest);
}

export function setAccessToken(accessToken: string) {
  API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

// Axios 응답 인터셉터
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: {
        status,
        data: { message },
      },
    } = error;
    const originalRequest: AxiosRequestConfig = config;
    if (status === 401 && message === 'Unauthorized') {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // 토큰 갱신 시도
          const newToken = await refreshToken();
          setAccessToken(newToken);
          onRefreshed(newToken);
          isRefreshing = false;
          return retryOriginalRequest(originalRequest, newToken);
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = []; // Refresh 실패 시, 대기 중인 요청들을 모두 제거
          window.location.replace('/sign-in');
          return Promise.reject(refreshError);
        }
      } else {
        // 토큰 갱신 중일 때 대기 중인 요청을 큐에 추가
        return new Promise((resolve, reject) => {
          addRefreshSubscriber((token: string) => {
            if (token) {
              resolve(retryOriginalRequest(originalRequest, token));
            } else {
              reject(error);
            }
          });
        });
      }
    }

    return Promise.reject(error);
  },
);

export default API;
