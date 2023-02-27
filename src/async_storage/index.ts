import { grouptable, GroupType } from "./tables/group";
import { membertable, MemberType } from "./tables/member";
import { TableInterface, ToggleStateType } from "./tables/table.types";

interface StorageInitInterface {
  group: TableInterface<GroupType>;
  member: TableInterface<MemberType>;
}

export function useStorage(toggleState?: ToggleStateType): StorageInitInterface {
  return {
    group: grouptable(toggleState),
    member: membertable(toggleState),
  };
}
