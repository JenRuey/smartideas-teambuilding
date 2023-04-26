import { RYAlert, RYModal } from "@roy1997/components";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { ThemeContextProvider } from "./context/themeContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./state/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ReduxProvider store={store}>
    <ThemeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ToastContainer />
      <RYAlert.Container />
      <RYModal.Container />
    </ThemeContextProvider>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
