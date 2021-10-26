class UserNotFound extends Error {
  constructor(id: string) {
    super(`User not found for id = ${id}`);
  }
}

export default UserNotFound;
