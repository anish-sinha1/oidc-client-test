import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useAuth, hasAuthParams } from "react-oidc-context";

function App() {
  const auth = useAuth();

  // automatically sign-in
  React.useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading
    ) {
      auth.signinRedirect();
    }
  }, [
    auth.isAuthenticated,
    auth.activeNavigator,
    auth.isLoading,
    auth.signinRedirect,
  ]);

  if (auth.activeNavigator) {
    return <div>Signing you in/out...</div>;
  }
  if (!auth.isAuthenticated) {
    return <div>Unable to log in</div>;
  }
  return (
    <button
      onClick={() => {
        auth.clearStaleState();
        auth.removeUser();
        auth.signoutSilent();
      }}
    >
      Log out
    </button>
  );
}

export default App;
