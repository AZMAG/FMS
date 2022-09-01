import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import DetectorPage from "./pages/Detector";
import CorridorsPage from "./pages/Corridors";
import QueryBuilderPage from "./pages/QueryBuilder";
import AdminPage from "./pages/Admin";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./stores/DataContext";

function App() {
    return (
        <div className="w-full h-screen">
            <DataProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route path="detector/:id" element={<DetectorPage />} />
                        <Route path="corridors" element={<CorridorsPage />} />
                        <Route path="query" element={<QueryBuilderPage />} />
                        <Route path="admin" element={<AdminPage />} />
                    </Routes>
                </Router>
            </DataProvider>
        </div>
    );
}

export default App;
