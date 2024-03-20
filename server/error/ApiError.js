class ApiError extends Error {
    status;
    message;
    errors;

    constructor(status, message, errors) {
        super();
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    static unauthoirized(message = "Не авторизован") {
        return new ApiError(401, message);
    }

    static badRequest(message = "Некорректный запрос", errors = []) {
        return new ApiError(400, message, errors);
    }

    static notFound(message = "Запрос не найден") {
        return new ApiError(404, message);
    }

    static internal(message = "На сервере произошла ошибка") {
        return new ApiError(500, message);
    }

    static forbidden(message = "Отказано в доступе") {
        return new ApiError(403, message);
    }
}

module.exports = { ApiError };
