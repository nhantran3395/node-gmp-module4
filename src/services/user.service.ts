import { ValidationError } from "sequelize";
import { User } from "../models";
import { UserNotFound, UserInputInvalid, UserDuplicated } from "../exceptions";
import { CreateUserRequestSchema } from "../validations";
import { CreateUserRequestDto } from "../dtos/create-user-request.dto";
import { Logger } from "../logger";

export const userService = {
  async getUserById(id: string): Promise<User> {
    Logger.info(`Finding user with id = ${id}`);
    let user: User | null;

    try {
      user = await User.findOne({ where: { id: id } });
    } catch (err: any) {
      throw new Error(err.message);
    }

    if (!user) {
      throw new UserNotFound(id);
    }

    return user;
  },
  // getUserAutoSuggestion(loginQuery: string, limit: number): User[] {
  //   const suggests = users.filter((user) => user.login.includes(loginQuery));
  //   const suggestsLimited = suggests.slice(0, limit);
  //   return suggestsLimited;
  // },
  async createUser(userData: CreateUserRequestDto): Promise<void> {
    const { error } = CreateUserRequestSchema.validate(userData);

    if (error) {
      throw new UserInputInvalid(error.message);
    }

    const { login, password, age } = userData;

    let createdUser: User | null;

    try {
      createdUser = await User.create({ login, password, age });
    } catch (err: any) {
      // got ValidationError when register with login that already been used (violating unique constraint)
      if (err instanceof ValidationError) {
        throw new UserDuplicated();
      }

      throw new Error(err.message);
    }

    Logger.debug(createdUser);
  },
  // updateUser(id: string, userData: CreateUserRequestDto): User {
  //   let user = users.find((user) => user.id === id);
  //   const { login, password, age } = userData;

  //   if (!user) {
  //     throw new UserNotFound(id);
  //   }

  //   const { error } = CreateUserRequestSchema.validate(userData);

  //   if (error) {
  //     throw new UserInputInvalid(error.message);
  //   }

  //   user.login = login;
  //   user.password = password;
  //   user.age = age;

  //   Logger.debug(user);
  //   return user;
  // },
  async deleteUser(id: string) {
    await userService.getUserById(id);

    try {
      User.update({ isDeleted: true }, { where: { id: id } });
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
