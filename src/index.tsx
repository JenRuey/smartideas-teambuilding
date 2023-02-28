import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import AlertContainer from "./components/user-alert/AlertContainer";
import ModalContainer from "./components/user-alert/ModalContainer";
import { ThemeContextProvider } from "./context/themeContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./state/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ReduxProvider store={store}>
    <ThemeContextProvider>
      <App />
      <ToastContainer />
      <AlertContainer />
      <ModalContainer />
    </ThemeContextProvider>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
