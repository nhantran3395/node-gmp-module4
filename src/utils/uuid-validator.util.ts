import { Logger } from "../logger";

const uuidRegExp =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

const uuidValidator = (uuid: string): boolean => {
  return uuidRegExp.test(uuid);
};

export default uuidValidator;
