import { v4 as uuidv4 } from "uuid";

import { User } from "../models";
import { UserNotFound } from "../exceptions";

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
    return [];
  },
  createUser(login: string, password: string, age: number) {
    const userId = uuidv4();
    const user = { id: userId, login, password, age, isDeleted: false };
    users = [...users, user];
  },
  updateUser(id: string) {},
  deleteUser(id: string) {},
};
