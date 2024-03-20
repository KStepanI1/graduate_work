const { models } = require("../db");
const UserDTO = require("../dtos/User/UserDTO");
const { ApiError } = require("../error/ApiError");
const TokenService = require("./TokenService");
const phoneNumberFormatter = require("phone-number-formats");

class UserService {
    #formatPhoneNumber(phoneNumber) {
        return new phoneNumberFormatter(phoneNumber).format({
            areaCode: "7",
            type: "international",
        }).string;
    }

    async registration(phoneNumber) {
        const formatedPhoneNumber = this.#formatPhoneNumber(phoneNumber);

        const candidate = await models.user.findOne({
            where: { phoneNumber: formatedPhoneNumber },
        });

        if (candidate) {
            throw ApiError.badRequest(
                "Пользователь с таким номером телефона уже существует"
            );
        }

        const user = await models.user.create({
            phoneNumber: formatedPhoneNumber,
        });
        const userDto = new UserDTO(user);
        const tokens = TokenService.generateTokens({ ...userDto });
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async login(phoneNumber) {
        const formatedPhoneNumber = this.#formatPhoneNumber(phoneNumber);

        const user = await models.user.findOne({
            where: { phoneNumber: formatedPhoneNumber },
        });

        if (!user) {
            throw ApiError.badRequest(
                "Пользователь с таким номером телефона не был найден"
            );
        }
        const userDto = new UserDTO(user);
        const tokens = TokenService.generateTokens({ ...userDto });

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthoirized("Не авторизован");
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findRefreshToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.unauthoirized();
        }
        const user = await models.user.findOne({ id: userData.id });
        const userDto = new UserDTO(user);
        const tokens = TokenService.generateTokens({ ...userDto });

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
        };
    }

    async getALlUsers() {
        const users = await models.user.findAll();
        return users;
    }
}

module.exports = new UserService();
