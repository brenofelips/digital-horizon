import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MessageList from "./components/MessageList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { AuthProvider } from "./AuthContext";
import { Container } from "@mui/material";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MessageList />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute restricted={true}>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute restricted={true}>
                  <Register />
                </PublicRoute>
              }
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
