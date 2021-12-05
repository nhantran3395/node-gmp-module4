import ApiError from "./api-error";

class InputInvalid extends ApiError {
  constructor(message: string) {
    super(400, message);
    Object.setPrototypeOf(this, InputInvalid.prototype);
  }
}

export default InputInvalid;
