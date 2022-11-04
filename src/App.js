import Home from "./pages/Home/Home";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import './App.css';

function App() {
    const { currentUser  } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return children
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;