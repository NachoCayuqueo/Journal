import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { AuthRouter, AuthRoutes } from "../auth/routes";
import { JournalRouter, JournalRoutes } from "../journal/routes";
import { CheckingAuth } from "../ui";
import { useChechAuth } from "../hooks";

// const router = createBrowserRouter([
//   {
//     // JournalApp
//     path: "/",
//     element: <JournalRouter />,
//     children: JournalRoutes,
//   },
//   {
//     //Login y Registros
//     path: "/auth/*",
//     element: <AuthRouter />,
//     children: AuthRoutes,
//   },
// ]);

const routerAuthenticated = createBrowserRouter([
  {
    // JournalApp
    path: "/",
    element: <JournalRouter />,
    children: JournalRoutes,
    errorElement: <h1>Error</h1>,
  },
  {
    // Ruta para la página de inicio
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
const routerNotAuthenticated = createBrowserRouter([
  {
    //Login y Registros
    path: "/auth/*",
    element: <AuthRouter />,
    children: AuthRoutes,
    errorElement: <h1>Error</h1>,
  },
  {
    // Ruta para la página de inicio
    path: "*",
    element: <Navigate to="/auth/login" replace />,
  },
]);

export const AppRouter = () => {
  const { status } = useChechAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <RouterProvider
        router={
          status === "authenticated"
            ? routerAuthenticated
            : routerNotAuthenticated
        }
      />
    </>
  );
};
