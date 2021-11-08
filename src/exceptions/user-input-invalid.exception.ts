import ApiError from "./api-error";

class UserInputInvalid extends ApiError {
  constructor(message: string) {
    super(400, message);
    Object.setPrototypeOf(this, UserInputInvalid.prototype);
  }
}

export default UserInputInvalid;
