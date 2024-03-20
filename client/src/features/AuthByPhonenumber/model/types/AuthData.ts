import { User } from "entities/User";

export interface AuthData {
    accessToken: string;
    refreshToken: string;
    user: User;
}
