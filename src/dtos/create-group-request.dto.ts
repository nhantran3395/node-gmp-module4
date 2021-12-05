import { Permission } from "../enums";

export interface CreateGroupRequestDto {
  name: number;
  permissions: Permission[];
}
