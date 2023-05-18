
import * as jwt from 'jsonwebtoken';

export async function  getUserFromToken(token: string): Promise<any> {
  try {
    const decodedToken = await jwt.verify(token, 'jwtsecret');
    return decodedToken;
  } catch (error) {
    // Token verification failed or expired
    return null;
  }
}



