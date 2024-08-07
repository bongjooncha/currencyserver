import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "pages/Home";
// Upbit
import Upbit from "pages/Coin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin" element={<Upbit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
