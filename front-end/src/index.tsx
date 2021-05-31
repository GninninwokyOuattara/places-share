import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthProvider from "./shared/context/auth-context";

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Suspense>
    </React.StrictMode>,
    document.getElementById("root")
);
