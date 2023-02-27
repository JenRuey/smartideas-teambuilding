import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState, useEffect } from "react";

type ThemeContextType = {
  lightmode: boolean;
  setLightMode: Dispatch<SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeContextType>({ lightmode: true, setLightMode: () => {} });
export function ThemeContextProvider({ children }: PropsWithChildren<{}>) {
  const [lightmode, setLightMode] = useState<boolean>(true);

  useEffect(() => {
    document.body.style.background = lightmode ? "white" : "black";
  }, [lightmode]);

  return <ThemeContext.Provider value={{ lightmode, setLightMode }}>{children}</ThemeContext.Provider>;
}
export function useThemeContext() {
  return useContext(ThemeContext);
}
