import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
	<Auth0Provider
		domain="dev-cd29zu3y.us.auth0.com"
		clientId="n28Biun64j5BsM2EDTAUB2ZaJvh96M1k"
		redirectUri={window.location.origin}
	>
		<App />
	</Auth0Provider>,
	document.getElementById("root")
);
