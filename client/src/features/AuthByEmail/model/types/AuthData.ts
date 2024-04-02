import { User } from "entities/User";

export interface AuthData {
    accessToken: string;
    user: User;
}
