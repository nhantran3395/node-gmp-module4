import Joi from "joi";
import { Permission } from "../enums";

export const CreateGroupRequestSchema = Joi.object().keys({
  name: Joi.string().required(),
  permissions: Joi.array().items(
    Joi.string().valid(
      Permission.READ,
      Permission.WRITE,
      Permission.DELETE,
      Permission.SHARE,
      Permission.UPLOAD_FILES
    )
  ),
});
