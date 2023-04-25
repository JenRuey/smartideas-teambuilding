import { createContext, useContext } from "react";
import { StorageInitInterface, initStorage } from "../tables";

function createDBContext() {
  const storage = initStorage();
  return createContext<StorageInitInterface>(storage);
}

export const DBContext = createDBContext();
export function useDBContext() {
  return useContext(DBContext);
}
