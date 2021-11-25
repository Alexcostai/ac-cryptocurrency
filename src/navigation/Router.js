import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./screens/Home";
import Login from "./screens/Login";
import NoMatch from "./screens/NoMatch";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="about" element={<About />} />
				<Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
