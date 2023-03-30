import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { JournalPage } from "../pages/JournalPage";

export const JournalRoutes = [
  { path: "/", element: <JournalPage /> },
  { path: "/*", element: <Navigate to="/" /> },
];

// export const JournalRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<JournalPage />}></Route>
//       <Route path="/*" element={<Navigate to="/" />}></Route>
//     </Routes>
//   );
// };
