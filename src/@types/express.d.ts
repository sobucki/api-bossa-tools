declare namespace Express {
  export interface Request {
    decoded: import('@src/services/auth').DecodedUser;
  }
}
