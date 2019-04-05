import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { renderRoutes } from "../imports/routers/Routers.js"; 
import "semantic-ui-css/semantic.min.css";

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById("react-target"));
});
