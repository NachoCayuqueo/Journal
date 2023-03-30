import React from "react";
import { Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages";

//children of
export const AuthRoutes = [
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
  { path: "/auth/*", element: <Navigate to="/auth/login" /> },
];

// export const AuthRoutes = [
//   <Routes>
//     <Route path="login" element={<LoginPage />}></Route>
//     <Route path="register" element={<RegisterPage />}></Route>
//     <Route path="/*" element={<Navigate to="/auth/login" />}></Route>
//   </Routes>,
// ];
