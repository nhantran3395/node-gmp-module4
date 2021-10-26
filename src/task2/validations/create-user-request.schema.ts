import Joi from "joi";

export const CreateUserRequestSchema = Joi.object().keys({
  login: Joi.required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{0,}$/)
    .required(),
  age: Joi.number().integer().min(4).max(130).required(),
});
