import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { renderRoutes } from "../imports/routers/Routers.js"; 

Meteor.startup(() => {
	render(renderRoutes(), document.getElementById("react-target"));
});
