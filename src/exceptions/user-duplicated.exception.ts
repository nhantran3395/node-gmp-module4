import ApiError from "./api-error";

class UserDuplicated extends ApiError {
  constructor() {
    super(400, "User with this login already exists");
    Object.setPrototypeOf(this, UserDuplicated.prototype);
  }
}

export default UserDuplicated;
