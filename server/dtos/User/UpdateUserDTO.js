const CreateUserDTO = require("./CreateUserDTO");

class UpdateUserDTO extends CreateUserDTO {
    id;

    constructor(data) {
        super(data);
        this.id = id;
    }
}
