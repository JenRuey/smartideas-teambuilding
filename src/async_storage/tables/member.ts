import { createTable } from "../utils/table.func";
import { CommonType, TableInterface, ToggleStateType } from "./table.types";

const tablename = "tbl-member";

export interface MemberType extends CommonType {
  membername: string;
  group: string;
}

export const membertable = (toggleState?: ToggleStateType): TableInterface<MemberType> => createTable<MemberType>(tablename, toggleState);
