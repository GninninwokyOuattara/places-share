import React, { useContext, useEffect, useState } from "react";
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
    const [expirationDate, setExpirationDate] = useState<null | number>(null);
    const auth = useContext(AuthContext) as {
        isLoggedIn: boolean;
        logout: () => void;
        login: (
            userId: string,
            userToken: string,
            expirationDate?: string
        ) => void;
    };

    let timerId: ReturnType<typeof setTimeout>;

    useEffect(() => {
        const userData: {
            userId: string;
            userToken: string;
            expirationDate: string;
        } = JSON.parse(localStorage.getItem("userData") as string);
        console.log(userData);
        if (userData) {
            setExpirationDate(new Date(userData.expirationDate).getTime());
        }
        if (
            userData &&
            userData.userToken &&
            userData.userId &&
            userData.expirationDate &&
            new Date(userData.expirationDate) > new Date()
        ) {
            auth.login(
                userData.userId,
                userData.userToken,
                userData.expirationDate
            );
        } else {
            auth.logout();
        }

        console.log(userData);
    }, [auth.login, auth.logout]);

    useEffect(() => {
        if (auth.isLoggedIn && expirationDate) {
            timerId = setTimeout(() => {
                auth.logout();
            }, expirationDate - new Date().getTime());
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [auth.isLoggedIn, expirationDate]);

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
