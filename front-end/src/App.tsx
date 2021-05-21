import React, { useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

function App() {
    const auth = useContext(AuthContext) as { isLoggedIn: boolean };
    return (
        <Router>
            <MainNavigation />
            <main>
                {auth.isLoggedIn ? (
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
                ) : (
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
                )}
            </main>
        </Router>
    );
}
export default App;
