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
import GeneratedReportPage from "./components/Layout/pages/GeneratedReport";
import CorridorsPage from "./components/Layout/pages/Corridors";
import ReportBuilderPage from "./components/Layout/pages/ReportBuilder";
import AdminPage from "./components/Layout/pages/Admin";
import GeneratedReportsPage from "./components/Layout/pages/GeneratedReports";

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
        <div className="flex h-screen w-full flex-col">
            <DataProvider>
                <Router>
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route path="detector/:id" element={<DetectorPage />} />
                        <Route
                            path="report/:id"
                            element={<GeneratedReportPage />}
                        />
                        <Route
                            path="reports"
                            element={<GeneratedReportsPage />}
                        />
                        <Route path="corridors" element={<CorridorsPage />} />
                        <Route
                            path="report-builder"
                            element={<ReportBuilderPage />}
                        />
                        <Route path="admin" element={<AdminPage />} />
                    </Routes>
                    <Footer />
                </Router>
            </DataProvider>
        </div>
    );
}

export default App;
