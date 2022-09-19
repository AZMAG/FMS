import React from "react";
// import ReactGA from "react-ga";
// import "bootstrap/dist/css/bootstrap.min.css";
import "@arcgis/core/assets/esri/themes/dark/main.css";
import "@progress/kendo-theme-default/dist/all.css";
import "hammerjs";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import DetectorPage from "./pages/Detector";
import CorridorsPage from "./pages/Corridors";
import QueryBuilderPage from "./pages/QueryBuilder";
import AdminPage from "./pages/Admin";

import { DataProvider } from "./stores/DataContext";

function App() {
    //     const TRACKING_ID = "UA-29422512-1";
    //     ReactGA.initialize(TRACKING_ID, {
    //       debug: true,
    //       titleCase: false,
    //       gaOptions: {},
    //     });
    //   ReactGA.pageview(window.location.pathname + window.location.search)
    return (
        <div className="flex flex-col w-full h-screen">
            <DataProvider>
                <Router>
                    <Navbar />
                    <div className="container flex justify-around absolute top-24">
                        <Routes>
                            <Route exact path="/" element={<HomePage />} />
                            <Route
                                path="detector/:id"
                                element={<DetectorPage />}
                            />
                            <Route
                                path="corridors"
                                element={<CorridorsPage />}
                            />
                            <Route
                                path="query"
                                element={<QueryBuilderPage />}
                            />
                            <Route path="admin" element={<AdminPage />} />
                        </Routes>
                    </div>

                    <Footer />
                </Router>
            </DataProvider>
        </div>
    );
}

export default App;
