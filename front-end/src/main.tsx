import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { domain, clientId } from "./shared/utils/constant.ts";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
