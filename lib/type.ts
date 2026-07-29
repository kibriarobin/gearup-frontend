export type TRole = "CUSTOMER" | "PROVIDER" | "ADMIN";
export type TStatus = "ACTIVE" | "SUSPENDED" | "INACTIVE";

export interface IUserProfile {
  id: string;
  bio: string | null;
  profilePhoto: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: TRole;
  status: TStatus;
  createdAt: string;
  updatedAt: string;
  profile: IUserProfile;
}

export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export type TGetMeResponse = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    profile: IUser;
  };
};

export interface IAuthError {
  success: false;
  message: string;
}

export interface NavbarProps {
  user: TGetMeResponse | IAuthError;
}

// login

export type TLoginSuccess = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type TLoginFieldErrors = {
  email?: string[];
  password?: string[];
};

export type TLoginError = {
  success: false;
  message: string;
  errors?: TLoginFieldErrors;
};

export type LoginState = TLoginSuccess | TLoginError | null;

// Register

export type TRegisterRole = "CUSTOMER" | "PROVIDER";

export type TRegisterSuccess = {
  success: true;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type TRegisterFieldErrors = {
  name?: string[];
  email?: string[];
  phone?: string[];
  password?: string[];
};

export type TRegisterError = {
  success: false;
  message: string;
  errors?: TRegisterFieldErrors;
};

export type RegisterState = TRegisterSuccess | TRegisterError | null;