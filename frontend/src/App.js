import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navbar from "./components/Navbar";
import UserApplication from "./components/UserApplication";
import { restoreUser } from "./store/session";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import { Redirect } from "react-router-dom";
import SplashPage from "./components/SplashPage";
import InviteHandling from "./components/InviteHandling";

// TODO reorganize all components
// TODO reorganize app to allow use of @me

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	document.addEventListener("contextmenu", (e) => e.preventDefault());

	return (
		<>
			{/* <Navigation isLoaded={isLoaded} /> */}
			{isLoaded && (
				<Switch>
					<Route exact path="/login">
						<LoginFormPage />
					</Route>

					<Route exact path="/signup">
						<SignupFormPage />
					</Route>

					<Route exact path="/">
						<SplashPage />
					</Route>

					<Route exact path="/:serverId(\d+)?/:channelId(\d+)?">
						<UserApplication />
					</Route>

					<Route exact path="/@me">
						<UserApplication />
					</Route>

					<Route exact path={`/inv` + ":invite"}>
						<InviteHandling />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
