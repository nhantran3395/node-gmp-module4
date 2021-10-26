class UserNotFound extends Error {
  constructor(id: string) {
    super(`User not found for id = ${id}`);
    Object.setPrototypeOf(this, UserNotFound.prototype);
  }
}

export default UserNotFound;
