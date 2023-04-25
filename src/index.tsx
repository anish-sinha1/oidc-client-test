import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: "https://idp.sonarmentalhealth.com/realms/sonar_staging",
  client_id: "sonar_client",
  redirect_uri: "http://localhost:3000/",
  onSigninCallback: (_user: any | void): void => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
  onRemoveUser: () => {
    window.location.pathname = "";
  },
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
