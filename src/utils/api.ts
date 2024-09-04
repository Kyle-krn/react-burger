const API_URL = 'https://norma.nomoreparties.space'

export interface ResponseBody {
  success: boolean;
}

export interface ResonseRefreshToken extends ResponseBody {
  refreshToken: string;
  accessToken: string;
}

const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = async (): Promise<ResonseRefreshToken>  => {
  const res = await fetch(`${API_URL}/api/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
  const refreshData: ResonseRefreshToken = await checkResponse(res);
  if (!refreshData.success) {
    return Promise.reject(refreshData);
  }
  localStorage.setItem("refreshToken", refreshData.refreshToken);
  localStorage.setItem("accessToken", refreshData.accessToken.split('Bearer ')[1]);
  return refreshData;
  };

export const request = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    try {
        const res = await fetch(API_URL + url, options);
        return await checkResponse<T>(res);
      } catch (err) {
        if (err instanceof Error && err.message === "jwt expired") {
            try {
              const refreshData = await refreshToken(); //обновляем токен
              (options.headers as Record<string, string>)['authorization'] = refreshData.accessToken;
              options.headers = {authorization: refreshData.accessToken};
              const res = await fetch(API_URL + url, options);
              return await checkResponse<T>(res);
            } catch (error) {
            return Promise.reject(err);  
            }
        } else {
          return Promise.reject(err);
        }
      }
}