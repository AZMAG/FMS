import React from "react";
// import ReactGA from "react-ga";
// import "bootstrap/dist/css/bootstrap.min.css";
import "@arcgis/core/assets/esri/themes/dark/main.css";
import "@progress/kendo-theme-default/dist/all.css";
import "hammerjs";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Layout/header/Header";
import Footer from "./components/Layout/footer/Footer";
import HomePage from "./components/Layout/pages/Home";
import DetectorPage from "./components/Layout/pages/Detector";
import DetectorComparePage from "./components/Layout/pages/DetectorCompare";
import CorridorsPage from "./components/Layout/pages/Corridors";
import QueryBuilderPage from "./components/Layout/pages/QueryBuilder";
import AdminPage from "./components/Layout/pages/Admin";

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
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route path="detector/:id" element={<DetectorPage />} />
                        <Route
                            path="compare/:id"
                            element={<DetectorComparePage />}
                        />
                        <Route path="corridors" element={<CorridorsPage />} />
                        <Route path="query" element={<QueryBuilderPage />} />
                        <Route path="admin" element={<AdminPage />} />
                    </Routes>
                    <Footer />
                </Router>
            </DataProvider>
        </div>
    );
}

export default App;
