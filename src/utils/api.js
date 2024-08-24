const API_URL = 'https://norma.nomoreparties.space'

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

export const refreshToken = () => {
    return fetch(`${API_URL}/api/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
    .then(checkResponse)
    .then((refreshData) => {
      if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
      localStorage.setItem("refreshToken", refreshData.refreshToken); 
      localStorage.setItem("accessToken", refreshData.accessToken.split('Bearer ')[1]);
      return refreshData;
    });
  };

export const request = async (url, options) => {
    try {
        const res = await fetch(API_URL + url, options);
        return await checkResponse(res);
      } catch (err) {
        console.log('err: ', err)
        if (err.message === "jwt expired") {
          const refreshData = await refreshToken(); //обновляем токен
          options.headers.authorization = refreshData.accessToken;
          const res = await fetch(API_URL + url, options); //повторяем запрос
          return await checkResponse(res);
        } else {
          return Promise.reject(err);
        }
      }
    // const res = await fetch(API_URL + url, options);
    // return checkResponse(res);
}