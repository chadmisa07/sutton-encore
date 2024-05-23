import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Success from "./pages/Success";
import Admin from "./pages/Admin";
import LandingPage from "./pages/Landing";

function App() {
  return (
    <Router basename={process.env.REACT_APP_BASENAME || null}>
      <Routes>
        <Route path="/">
          <Route exact path="/success/:session_id?" element={<Success />} />
          <Route exact path="/__admin/:adminSection?" element={<Admin />} />
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/*" element={<LandingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
