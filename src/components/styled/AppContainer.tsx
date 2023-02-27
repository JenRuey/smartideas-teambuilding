import React from "react";
import styled from "styled-components";
import { useThemeContext } from "../../context/themeContext";

interface ThemeContainerType {
  lightmode: boolean;
}
export const ThemeContainer = styled.div<ThemeContainerType>`
  background: ${(props) => (props.lightmode ? "white" : "black")} !important;
  color: ${(props) => (props.lightmode ? "black" : "white")} !important;
`;
export function Tdiv(props: React.HTMLAttributes<HTMLDivElement>) {
  const { lightmode } = useThemeContext();

  return <ThemeContainer lightmode={lightmode} {...props} />;
}
