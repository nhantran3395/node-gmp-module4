class UserInputInvalid extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UserInputInvalid.prototype);
  }
}

export default UserInputInvalid;
