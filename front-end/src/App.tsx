import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = lazy(() => import("./users/pages/Users"));
const NewPlace = lazy(() => import("./places/pages/NewPlace"));
const MainNavigation = lazy(
    () => import("./shared/components/Navigation/MainNavigation")
);
const UserPlaces = lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = lazy(() => import("./places/pages/UpdatePlace"));
const Auth = lazy(() => import("./users/pages/Auth"));

function App() {
    const { auth, expirationDate, uuid } = useAuth();
    // const [router, setRouter] = useState<() => Element>()

    let router;
    if (auth.isLoggedIn) {
        router = (
            <Switch>
                <Route path="/" exact>
                    <Users />
                </Route>
                <Route path="/:uid/places" exact>
                    <UserPlaces />
                </Route>
                <Route path="/places/new" exact>
                    <NewPlace />
                </Route>
                <Route path="/places/:placeid" exact>
                    <UpdatePlace />
                </Route>
                <Redirect to="/" />
            </Switch>
        );
    } else {
        router = (
            <Switch>
                <Route path="/" exact>
                    <Users />
                </Route>
                <Route path="/:uid/places" exact>
                    <UserPlaces />
                </Route>
                <Route path="/auth" exact>
                    <Auth />
                </Route>
                <Redirect to="/auth" />
            </Switch>
        );
    }
    console.log(router);
    return (
        <Router>
            <MainNavigation />
            <main>
                <Suspense
                    fallback={
                        <div className="center">
                            <LoadingSpinner />
                        </div>
                    }
                >
                    {router}
                </Suspense>
            </main>
        </Router>
    );
}
export default App;
