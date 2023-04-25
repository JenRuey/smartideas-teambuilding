import { GroupType, grouptable } from "./group";
import { MemberType, membertable } from "./member";
import { TableInterface, ToggleStateType } from "./table.types";

export interface StorageInitInterface {
  group: TableInterface<GroupType>;
  member: TableInterface<MemberType>;
}

export function initStorage(toggleState?: ToggleStateType): StorageInitInterface {
  return { group: grouptable(toggleState), member: membertable(toggleState) };
}
