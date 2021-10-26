import { v4 as uuidv4 } from "uuid";

import { User } from "../models";
import { UserNotFound } from "../exceptions";
import Logger from "../../common/logger";
import { CreateUserRequestDto } from "../dtos/create-user-request.dto";

let users: User[] = [];

export const userService = {
  getUserById(id: string): User {
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new UserNotFound(id);
    }

    return user;
  },
  getUserAutoSuggestion(loginQuery: string, limit: number): User[] {
    const suggests = users.filter((user) => user.login.includes(loginQuery));
    const suggestsLimited = suggests.slice(0, limit);
    return suggestsLimited;
  },
  createUser(userData: CreateUserRequestDto) {
    const { login, password, age } = userData;
    const userId = uuidv4();
    const user = { id: userId, login, password, age, isDeleted: false };
    users = [...users, user];
    Logger.debug(users);
  },
  updateUser(id: string, userData: CreateUserRequestDto) {
    let user = users.find((user) => user.id === id);
    const { login, password, age } = userData;

    if (!user) {
      throw new UserNotFound(id);
    }

    user.login = login;
    user.password = password;
    user.age = age;
    Logger.debug(user);
  },
  deleteUser(id: string) {
    let user = users.find((user) => user.id === id);

    if (!user) {
      throw new UserNotFound(id);
    }

    user.isDeleted = true;
    Logger.debug(user);
  },
};
