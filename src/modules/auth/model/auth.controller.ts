import { ITokens, IUser } from "./auth.model";

export interface IAuthResponse {
  tokens: ITokens;
  user: IUser;
}
