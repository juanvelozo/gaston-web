import { IBaseResponse } from "../../../types/proyect.model";
import { ITokens, IUser } from "./auth.model";

export type ILoginResponse = IBaseResponse<LoginResponse>;
export interface LoginResponse {
  tokens: ITokens;
  user: IUser;
}

export type IRefreshTokenResponse = IBaseResponse<ITokens>;
