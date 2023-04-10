import { CommonType, createTable, TableInterface, ToggleStateType } from "@roy1997/components";

const tablename = "tbl-member";

export interface MemberType extends CommonType {
  membername: string;
  group: string;
}

export const membertable = (toggleState?: ToggleStateType): TableInterface<MemberType> => createTable<MemberType>(tablename, toggleState);
