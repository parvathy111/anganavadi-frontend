export const storeTokenAfterLogin = (token) => {
    localStorage.setItem('token', token);
};