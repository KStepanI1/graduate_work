module.exports = class UserDTO {
  phoneNumber;
  id;
  role;

  constructor(model) {
    this.phoneNumber = model.phoneNumber;
    this.role = model.role;
    this.id = model.id;
  }
};
