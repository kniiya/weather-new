// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Weather from "./pages/Weather";
import Weather2 from "./pages/Weather2";

const App = () => {
  return (
    <Router>
      <div>
        {/* ナビゲーションバー */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/weather">Weather</Link>
            </li>
            <li>
              <Link to="/weather2">Weather2</Link>
            </li>
          </ul>
        </nav>

        {/* ルーティング設定 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/weather2" element={<Weather2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
