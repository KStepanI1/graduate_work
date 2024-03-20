class CreateUserDTO {
    telegramId;
    telegramChatId;
    username;
    firstName;
    email;
    login;
    phoneNumber;
    lastName;

    constructor(data) {
        this.telegramId = data.telegramId;
        this.telegramChatId = data.telegramChatId;
        this.username = data.username;
        this.firstName = data.firstName;
        this.email = data.email;
        this.login = data.login;
        this.phoneNumber = data.phoneNumber;
        this.lastName = data.lastName;
    }
}

module.exports = CreateUserDTO;
