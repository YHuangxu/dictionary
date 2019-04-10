import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";

import App from "../ui/App.jsx";
import NotFound from "../ui/NotFound.jsx";
import MyGlossary from "../ui/MyGlossary.jsx";
import ChallengeGame from "../ui/ChallengeGame.jsx";
import Gaming from "../ui/Gaming.jsx";

const browserHistory = createBrowserHistory();

const authPages = ["/glossary", "/challenge", "/challenge/gameplaying"];

// Tracking auth status
const authStatus = isLoggedin => {
	// get the current location
	const pathname = browserHistory.location.pathname;

	const isAuthPage = authPages.includes(pathname);

	// if user on an authenticated page but not logged in, redirect to /
	if (isAuthPage && !isLoggedin) {
		browserHistory.replace("/");
	}
};

// routers
export const renderRoutes = () => (
	<Router history={browserHistory}>
		<Switch>
			<Route exact path="/" component={App} />

			<Route exact path="/glossary" component={MyGlossary} />

			<Route exact path="/challenge" component={ChallengeGame} />

			<Route exact path="/challenge/playing" component={Gaming} />

			<Route component={NotFound} />
		</Switch>
	</Router>
);

Tracker.autorun(() => {
	const isLoggedin = !!Meteor.userId();
	authStatus(isLoggedin);
});
