import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";

import App from "../ui/App.jsx";
import NotFound from "../ui/NotFound.jsx";
import MyGlossary from "../ui/MyGlossary.jsx";
import ChallengePage1 from "../ui/ChallengePage1.jsx";
import ChallengePage2 from "../ui/ChallengePage2.jsx";
import WinnerBoard from "../ui/WinnerBoard.jsx";

const browserHistory = createBrowserHistory();

const authPages = ["/glossary", "/challenge", "/challenge/playing"];

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

			<Route exact path="/challenge" component={ChallengePage1} />

			<Route exact path="/winnerboard" component={WinnerBoard} />

			<Route exact path="/challenge/playing" component={ChallengePage2} />

			<Route component={NotFound} />
		</Switch>
	</Router>
);

Tracker.autorun(() => {
	const isLoggedin = !!Meteor.userId();
	authStatus(isLoggedin);
});
