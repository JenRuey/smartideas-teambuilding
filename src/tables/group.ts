import { CommonType, createTable, TableInterface, ToggleStateType } from "@roy1997/components";

const tablename = "tbl-group";

export interface GroupType extends CommonType {
  groupname: string;
}

export const grouptable = (toggleState?: ToggleStateType): TableInterface<GroupType> => createTable<GroupType>(tablename, toggleState);
