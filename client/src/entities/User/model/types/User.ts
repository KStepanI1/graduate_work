import { AuthData } from "features/AuthByEmail";

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
}

export interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    role: UserRole;
    basketId: number;
}

export interface UserSchema {
    authData?: AuthData;
    _mounted: boolean;
}
