const uuidValidator = (uuid: string): boolean => {
  const uuidRegExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return uuidRegExp.test(uuid);
};

export default uuidValidator;
