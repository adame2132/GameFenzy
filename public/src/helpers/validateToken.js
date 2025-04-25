import jwt_decode from 'jwt-decode';

export const isTokenValid = (token) => {
    try {
        const decoded = jwt_decode(token);
        const now_time = Date.now() / 1000;
        return decoded.exp < now_time; 
    } catch (error) {
        console.log("Error trying to validate token: ", error);
        return true; 
    }
};