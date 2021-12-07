import Joi from "joi";

export const AddUsersToGroupSchema = Joi.object().keys({
  groupId: Joi.string().uuid().required(),
  userIds: Joi.array().items(Joi.string().uuid()).required(),
});
