// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GagakuLayout from "./layouts/GagakuLayout";
import FuneralLayout from "./layouts/FuneralLayout";
import Home from "./pages/Home";
import GagakuPage from "./pages/GagakuPage";
import FuneralPage from "./pages/FuneralPage";
import Weather from "./pages/Weather";
import Weather2 from "./pages/Weather2";
import WeatherAtomic from "./pages/WeatherAtomic";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 雅楽エリア */}
        <Route element={<GagakuLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gagaku" element={<GagakuPage />} />
          <Route path="/weather_atomic" element={<WeatherAtomic />} />
        </Route>

        {/* お通夜エリア */}
        <Route element={<FuneralLayout />}>
          <Route path="/funeral" element={<FuneralPage />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/weather2" element={<Weather2 />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
