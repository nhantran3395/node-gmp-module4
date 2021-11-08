import { v4 as uuidv4 } from "uuid";

import { User } from "../models";
import { UserNotFound, UserInputInvalid } from "../exceptions";
import { CreateUserRequestSchema } from "../validations";
import { CreateUserRequestDto } from "../dtos/create-user-request.dto";
import Logger from "../logger";

let users: User[] = [
  {
    id: "a4c758cc-b37e-4b33-836a-1ae0632108d7",
    login: "francisjackson",
    password: "dogpound",
    age: 31,
    isDeleted: false,
  },
  {
    id: "8b9e13e3-9ae2-4d9f-bd79-53a63ff438fd",
    login: "samehenry",
    password: "keksa12",
    age: 26,
    isDeleted: false,
  },
  {
    id: "82de10e9-71c9-4654-9cdc-2861181aa175",
    login: "isabellayoung",
    password: "bigguy",
    age: 28,
    isDeleted: false,
  },
];

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
    const { error } = CreateUserRequestSchema.validate(userData);

    if (error) {
      throw new UserInputInvalid(error.message);
    }

    const { login, password, age } = userData;
    const userId = uuidv4();
    const user = { id: userId, login, password, age, isDeleted: false };
    users = [...users, user];
    Logger.debug(users);
  },
  updateUser(id: string, userData: CreateUserRequestDto): User {
    let user = users.find((user) => user.id === id);
    const { login, password, age } = userData;

    if (!user) {
      throw new UserNotFound(id);
    }

    const { error } = CreateUserRequestSchema.validate(userData);

    if (error) {
      throw new UserInputInvalid(error.message);
    }

    user.login = login;
    user.password = password;
    user.age = age;

    Logger.debug(user);
    return user;
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
