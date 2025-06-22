export interface IRegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ITokens {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  id: number;
  email: string;
  hash: string;
  fullName: any;
  profileImage: any;
  createdAt: string;
  updatedAt: string;
  refreshToken: string;
}
