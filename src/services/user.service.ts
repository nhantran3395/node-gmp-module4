import { UniqueConstraintError, Op } from "sequelize";
import { User } from "../models";
import {
  ResourceNotFound,
  InputInvalid,
  ResourceDuplicated,
} from "../exceptions";
import { CreateUserRequestSchema } from "../validations";
import { CreateUserRequestDto } from "../dtos";
import { uuidValidator } from "../utils";

export const userService = {
  async getUserById(id: string): Promise<User> {
    if (!uuidValidator(id)) {
      throw new InputInvalid("id must be in uuid format");
    }

    let user: User | null;

    try {
      user = await User.findOne({ where: { id: id } });
    } catch (err: any) {
      throw new Error(err.message);
    }

    if (!user) {
      throw new ResourceNotFound("User", id);
    }

    return user;
  },
  async getUserAutoSuggestion(
    loginQuery: string,
    limit: number
  ): Promise<User[]> {
    let suggestsLimited: User[];

    try {
      suggestsLimited = await User.findAll({
        where: { login: { [Op.like]: `%${loginQuery}%` } },
        limit: limit,
      });
    } catch (err: any) {
      throw new Error(err.message);
    }

    return suggestsLimited;
  },
  async createUser(userData: CreateUserRequestDto): Promise<void> {
    const { error } = CreateUserRequestSchema.validate(userData);

    if (error) {
      throw new InputInvalid(error.message);
    }

    const { login, password, age } = userData;

    try {
      await User.create({ login, password, age });
    } catch (err: any) {
      if (err instanceof UniqueConstraintError) {
        throw new ResourceDuplicated("User", "login");
      }

      throw new Error(err.message);
    }

    return;
  },
  async updateUser(id: string, userData: CreateUserRequestDto): Promise<User> {
    await userService.getUserById(id);

    const { error } = CreateUserRequestSchema.validate(userData);

    if (error) {
      throw new InputInvalid(error.message);
    }

    const { login, password, age } = userData;

    try {
      await User.update(
        { login, password, age, updatedAt: new Date() },
        { where: { id: id } }
      );
    } catch (err: any) {
      throw new Error(err.message);
    }

    const updatedUser = userService.getUserById(id);
    return updatedUser;
  },
  async deleteUser(id: string) {
    await userService.getUserById(id);

    try {
      User.update(
        { isDeleted: true, updatedAt: new Date() },
        { where: { id: id } }
      );
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
