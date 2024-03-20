import { getUserId } from "./model/selectors/getUserId/getUserId";
import { getUser } from "./model/selectors/getUser/getUser";
import { getUserAuthData } from "./model/selectors/getUserAuthData/getUserAuthData";
import { getUserState } from "./model/selectors/getUserState/getUserState";
import { cehckAuth } from "./model/services/checkAuth/checkAuth";
import { User, UserSchema } from "./model/types/User";
import { userActions, userReducer } from "./model/slice/userSlice";

export {
    userReducer,
    userActions,
    User,
    UserSchema,
    cehckAuth,
    getUserState,
    getUserAuthData,
    getUser,
    getUserId,
};
