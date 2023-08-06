import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
// test
export default App;
