import { TableInterface, ToggleStateType } from "@roy1997/components";
import { grouptable, GroupType } from "./group";
import { membertable, MemberType } from "./member";

interface StorageInitInterface {
  group: TableInterface<GroupType>;
  member: TableInterface<MemberType>;
}

export function useStorage(toggleState?: ToggleStateType): StorageInitInterface {
  return { group: grouptable(toggleState), member: membertable(toggleState) };
}
