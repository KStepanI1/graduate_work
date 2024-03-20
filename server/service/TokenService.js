const jwt = require("jsonwebtoken");
const config = require("../assets/config");
const { models } = require("../db");
const { ApiError } = require("../error/ApiError");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.JWT_SECRET_ACCESS, {
            expiresIn: "15m",
        });
        const refreshToken = jwt.sign(payload, config.JWT_SECRET_REFRESH, {
            expiresIn: "30d",
        });

        return { accessToken, refreshToken };
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await models.token.findOne({ userId });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await models.token.create({ userId, refreshToken });
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await models.token.destroy({
            where: { refreshToken },
        });

        return tokenData;
    }

    validateAccessToken(token) {
        try {
            const tokenData = jwt.verify(token, config.JWT_SECRET_ACCESS);
            return tokenData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const tokenData = jwt.verify(token, config.JWT_SECRET_REFRESH);
            return tokenData;
        } catch (e) {
            return null;
        }
    }

    async findRefreshToken(refreshToken) {
        const tokenData = await models.token.findOne({
            where: { refreshToken },
        });
        return tokenData;
    }
}

module.exports = new TokenService();
