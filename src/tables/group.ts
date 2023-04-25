import { createTable } from "./table.func";
import { CommonType, TableInterface, ToggleStateType } from "./table.types";

const tablename = "tbl-group";

export interface GroupType extends CommonType {
  groupname: string;
}

export const grouptable = (toggleState?: ToggleStateType): TableInterface<GroupType> => createTable<GroupType>(tablename, toggleState);
