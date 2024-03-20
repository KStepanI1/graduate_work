import { AuthData } from "features/AuthByPhonenumber";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  phoneNumber: string;
  firstName: string;
  role: UserRole;
  basketId: number;
}

export interface UserSchema {
  authData?: AuthData;
  _mounted: boolean;
}
