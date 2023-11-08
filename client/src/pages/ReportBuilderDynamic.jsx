import React, { useState, useEffect } from "react";
import { useDataStore } from "../stores/DataContext";

import ReportTypeToggle from "../components/DynamicReport/Components/ReportTypeToggle"
import TimePeriodSelection from "../components/DynamicReport/Components/TimePeriodSelection";
import DetectorDropdown from "../components/DynamicReport/Components/DetectorDropdown";

import ReportBuilderMap from "../components/DynamicReport/Components/ReportBuilderMap";

import CorridorDropdown from "../components/ReportBuilder/CorridorDropdown";

import getDetectorsLayer from "../components/Map/getDetectorsLayer";
import getCorridorsLayer from "../components/Map/getCorridorsLayer";

import MainDynamicReportComponent from "../components/DynamicReport/MainDynamicReportComponent";

import { apiUrl } from "../DocConfig";
import axios from "axios";

function assembleDates() {
    let dateObj = new Date();
    let month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
    let day = dateObj.getUTCDate().toString().padStart(2, '0');
    let year = dateObj.getUTCFullYear();
    let result = {
        today: `${year}-${month}-${day}`,
        past: `${year - 2}-${month}-${day}`
    }
    return result
}

function ReportBuilder() {

    console.log('Main Componenet')

    ////////////////////////////
    // Data Store
    ////////////////////////////
    const store = useDataStore();

    ////////////////////////////
    // Set Component State
    ////////////////////////////
    const [dynamicReportData, setReportData] = useState(undefined);
    const [detector, setDetector] = useState(undefined);
    const [corridor, setCorridor] = useState(undefined);
    const [reportType, setReportType] = useState('detector');

    let dates = assembleDates();
    const [startDate, setStartDate] = useState(dates['past']);
    const [endDate, setEndDate] = useState(dates['today']);

    var [detectorsLayer, setDetectorsLayer] = useState(undefined)
    var [corridorsLayer, setCorridorsLayer] = useState(undefined)

    ////////////////////////////
    // Submit Report
    ////////////////////////////
    const detectorCorridorSelected = () => {

        if (reportType === 'detector') {
            if (detector === undefined) {
                alert('Please select a Detector.')
                return false
            }
            else {
                return true
            }
        }
        else {
            if (corridor === undefined) {
                alert('Please select a Corridor.')
                return false;
            }
            else {
                return true
            }

        }

    };

    const checkDateRange = () => {

        if (startDate === undefined || endDate === undefined) {
            alert("Please select a valid Start Date and End Date.")
            return false
        }
        else {
            return true
        }
    };

    const submitClicked = () => {

        if (detectorCorridorSelected() && checkDateRange()) {

            var reportData = {
                startDate: startDate,
                endDate: endDate,
                reportType: reportType,
                detNumbers: null,
                detIDs: null,
                description: null,
                route: null,
                detectorCorridor: null,
                corridorID: null
            };

            if (reportType === 'detector') {

                var detectorData = detector.detector
                /*
                {
                    "ID": 21,
                    "det_num": 1, (Detector Number)
                    "Location": "I-10 WB 83RD AVE",
                    "Route": "I-10",
                    "Direction": "WB",
                    "Milepost": 135.753,
                    "GPS": false,
                    "Type": "pad",
                    "Length_ft": 2170.30493164,
                    "y": 33.46250153,
                    "x": -112.23600769,
                    "Segment": "[[-112.23106460499997,33.46280114000007],[-112.23443235799999,33.46265030200004],[-112.23817470799997,33.462558029000036]]"
                }
                */
                reportData.detNumbers = detectorData.det_num;
                reportData.detIDs = detectorData['ID']
                reportData.description = detectorData['Location']
                reportData.route = detectorData['Route']

                reportData.detectorCorridor = detectorData;
                setReportData(reportData)
            }

            else {

                /*
                    {
                        "Detectors": [
                            {
                                "ID": 357,
                                "det_num": 10,
                                "Location": "Estrella",
                                "Route": "I-10",
                                "Direction": "EB",
                                "Milepost": 126.839,
                                "GPS": null,
                                "Type": null,
                                "Length_ft": null,
                                "y": 33.46115,
                                "x": -112.39,
                                "Segment": null
                            },
                            {
                                "ID": 429,
                                "det_num": 761,
                                "Location": "Bullard Ave",
                                "Route": "I-10",
                                "Direction": "EB",
                                "Milepost": 127.93,
                                "GPS": null,
                                "Type": null,
                                "Length_ft": null,
                                "y": 33.45894,
                                "x": -112.3715,
                                "Segment": null
                            },
                        ],
                        "id": 29,
                        "Name": "Estrella Pkwy to Loop 101 – Agua Fria (EB)",
                        "Description": "The I-10 detectors eastbound from Estrella Pkwy to the Loop 101 - Agua Fria",
                        "Year": null
                    }
                */

                reportData.detNumbers = store.queryBuilder.selectedCorridor.corridor['Detectors'].map(item => item.det_num).join(', ');
                reportData.detIDs = store.queryBuilder.selectedCorridor.corridor['Detectors'].map(item => item.ID).join(', ');
                reportData.description = store.queryBuilder.selectedCorridor.corridor.description;
                reportData.route = store.queryBuilder.selectedCorridor.corridor.Name;
                reportData.corridorID = store.queryBuilder.selectedCorridor.corridor['id']

                // http://localhost:56118/Detector/GetCorridorJSON?corridor_id=29
                axios.get(
                    `${apiUrl}/Detector/GetCorridorJSON`,
                    {
                        params: {
                            corridor_id: reportData['corridorID']
                        }
                    }
                ).then((data) => {

                    reportData.detectorCorridor = data.data;

                    setReportData(reportData)

                })

            }

        }
    };

    const resetClicked = () => {

    };

    ////////////////////////////
    // Map Items
    ////////////////////////////

    // var MapClass = new Map({ container: 'x' });

    // (async () => {
    if (corridorsLayer === undefined || detectorsLayer === undefined) {
        getDetectorsLayer()
        .then((result) => {
            setDetectorsLayer(result);
        });
        getCorridorsLayer()
        .then((result) => {
            setCorridorsLayer(result);
        });
    }

    ////////////////////////////
    // Render
    ////////////////////////////
    return (

        <main
            id="ReportBuilder"
            className="container w-full h-full mx-auto"
        >

            {/* Report Selections */}
            <div className="mt-3 grid grid-cols-3 gap-4 content-evenly">
                <ReportTypeToggle reportType={reportType} setReportType={setReportType} />
                {reportType === 'detector' && <DetectorDropdown detector={detector} reportType={reportType} setDetector={setDetector} />}
                {reportType === 'corridor' && <CorridorDropdown />}
                <TimePeriodSelection setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate} />
            </div>

            {/* Reset and Generate Buttons */}
            <div className="mt-3 grid grid-cols-2 gap-4 content-evenly">

                <button
                    onClick={resetClicked}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
                >
                    Reset
                </button>

                <button
                    onClick={submitClicked}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
                >
                    Generate
                </button>

            </div>

            <div className={dynamicReportData === undefined && `mt-3 w-full h-[800px]` || dynamicReportData != undefined && `mt-3 w-full h-[400px]`}>

                {
                    detectorsLayer != undefined &&
                    corridorsLayer != undefined &&
                    <ReportBuilderMap
                        reportType={reportType}
                        detectorsLayer={detectorsLayer}
                        corridorsLayer={corridorsLayer}
                        detector={detector}
                        corridor={corridor}
                    />
                }


            </div>

            <div className="mt-3">
                {
                    dynamicReportData != undefined && <MainDynamicReportComponent data={dynamicReportData} />
                }
                {
                    dynamicReportData === undefined && <p>Select a Detector/Corridor, Time Period, and press the Generate button.</p>
                }

            </div>

        </main>

    )
    // }
}
export default ReportBuilder;
