export const isTokenExpired = (token) => {
    if (!token) {
        return true
    }

    try {
        const tokenInfo = token.split('.')[1]
        const tokenInfoDecoded = window.atob(tokenInfo)
        const { exp } = JSON.parse(tokenInfoDecoded)

        const unixTime = Math.round(+ new Date() / 1000)
        const tokenLeftTime = exp - unixTime

        // const minLifeTimeForUpdate = (exp - iat)
        return tokenLeftTime < 5
    } catch (e) {
        console.error(e)
        return true
    }
}

export const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken.split('Bearer ')[1]);
    localStorage.setItem('refreshToken', refreshToken);
};

export const removeTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}
