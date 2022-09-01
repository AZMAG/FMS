import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import DetectorPage from "./pages/Detector";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./stores/DataContext";

function App() {
    return (
        <div className="w-full h-screen">
            <DataProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="detector/:id" element={<DetectorPage />} />
                        <Route exact path="/" element={<HomePage />} />
                    </Routes>
                </Router>
            </DataProvider>
        </div>
    );
}

export default App;
