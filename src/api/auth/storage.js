export const TOKEN_KEY = 'sdJWT'

export const setToken = token => localStorage.setItem(TOKEN_KEY, token)
export const getToken = () => localStorage.getItem(TOKEN_KEY)
