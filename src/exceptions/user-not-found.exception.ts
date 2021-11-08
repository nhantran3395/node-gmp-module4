import ApiError from "./api-error";

class UserNotFound extends ApiError {
  constructor(id: string) {
    super(404, `User not found for id = ${id}`);
    Object.setPrototypeOf(this, UserNotFound.prototype);
  }
}

export default UserNotFound;
