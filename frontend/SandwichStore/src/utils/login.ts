import jwt_decode from "jwt-decode";
import { User } from "../context/reducer";
 
export const decodeToken = (token : string) : User => {
  return jwt_decode(token);
}