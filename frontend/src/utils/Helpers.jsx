import jwtDecode from 'jwt-decode'

export function validateToken(token) {
  if (!token) {
    return false;
  }
  try {
    const decodedJwt = jwtDecode(token);
    return decodedJwt.exp >= Date.now() / 1000;
  } catch (error) {
    return false;
  }
}