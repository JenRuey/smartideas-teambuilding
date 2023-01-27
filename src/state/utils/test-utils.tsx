import { PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { setupStore, StoreState, StoreType } from "../store";

interface RenderWithProvidersType extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<StoreState>;
  store?: StoreType;
}

export function renderWithProviders(ui: React.ReactElement, { preloadedState, store = setupStore(), ...renderOptions }: RenderWithProvidersType) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
