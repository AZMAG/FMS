/*
Main application component
*/

import React from "react";
import "@arcgis/core/assets/esri/themes/light/main.css";
import "@progress/kendo-theme-default/dist/all.css";
import "hammerjs";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./header";
import DetectorsPage from "./pages/Detectors";
import DetectorPage from "./pages/Detector";
import GeneratedReportPage from "./pages/GeneratedReport";
import CorridorsPage from "./pages/Corridors";
import ReportBuilderPage from "./pages/ReportBuilder";
import GeneratedReportsPage from "./pages/GeneratedReports";
import NewCorridorPage from "./pages/NewCorridor";

import { DataProvider } from "./stores/DataContext";

function App() {
  //     const TRACKING_ID = "UA-29422512-1";
  //     ReactGA.initialize(TRACKING_ID, {
  //       debug: true,
  //       titleCase: false,
  //       gaOptions: {},
  //     });
  //   ReactGA.pageview(window.location.pathname + window.location.search)
  const isProduction = import.meta.env.PROD;
  const basename = isProduction ? "/fms/test" : "";
  return (
    <div className="h-screen">
      <DataProvider>
        <Router basename={basename}>
          <Header />
          <div className="h-20"></div>
          <Routes>
            <Route exact path="/" element={<DetectorsPage />} />
            <Route path="detector/:year/:id" element={<DetectorPage />} />
            <Route path="report/:id" element={<GeneratedReportPage />} />
            <Route path="reports" element={<GeneratedReportsPage />} />
            <Route path="corridors" element={<CorridorsPage />} />
            <Route path="report-builder" element={<ReportBuilderPage />} />
            <Route path="add-corridor" element={<NewCorridorPage />} />
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
