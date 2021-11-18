import { StrictMode } from "react";
import ReactDOM from "react-dom";
import IndexPage from "./pages/index";
import getFirebase from "./firebase/firebaseconfiguration";
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory({ forceRefresh: true });
const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <IndexPage getFirebase={getFirebase} history={history} />
  </StrictMode>,
  rootElement
);
