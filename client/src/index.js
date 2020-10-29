import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Firebase, {FirebaseContext} from "./components/Firebase";
import registerServiceWorker from "./registerServiceWorker";
import "./pages/css/reset.css";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
		<App />
	</FirebaseContext.Provider>, 
	document.getElementById("root"));
registerServiceWorker();
