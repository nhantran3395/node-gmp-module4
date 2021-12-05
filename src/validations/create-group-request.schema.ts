import Joi from "joi";

export const CreateGroupRequestSchema = Joi.object().keys({
  name: Joi.string().required,
  permissions: Joi.array().items(
    Joi.string().valid("READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES")
  ),
});
