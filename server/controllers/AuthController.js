const { ApiError } = require("../error/ApiError");
const UserService = require("../service/UserService");
const { validationResult } = require("express-validator");

class AuthController {
    async login(req, res, next) {
        try {
            const { phoneNumber } = req.body;
            const userData = await UserService.login(phoneNumber);

            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                hhtpOnly: true,
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async registration(req, res, next) {
        try {
            const validation = validationResult(req);

            if (!!validation.errors?.length) {
                return next(
                    ApiError.badRequest(
                        "Некоректный номер телефона",
                        validation.errors
                    )
                );
            }

            const { phoneNumber } = req.body;

            const userData = await UserService.registration(phoneNumber);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                hhtpOnly: true,
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);

            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                hhtpOnly: true,
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
                return next(ApiError.unauthoirized());
            }

            await UserService.logout(refreshToken);
            await res.clearCookie("refreshToken");
            return res.status(200).json();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();
