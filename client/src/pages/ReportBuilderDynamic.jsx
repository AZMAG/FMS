import React, {useState} from "react";

import ReportTypeToggle from "../components/ReportBuilder/ReportTypeToggle";
import DetectorDropdown from "../components/ReportBuilder/DetectorDropdown";
import CorridorDropdown from "../components/ReportBuilder/CorridorDropdown";
import TimePeriodSelection from "../components/ReportBuilder/TimePeriodSelection";

import ReportBuilderMap from "../components/ReportBuilder/ReportBuilderMap";

import ResetButton from "../components/ReportBuilder/ResetButton";

import MainDynamicReportComponent from "../components/DynamicReport/MainDynamicReportComponent";

import { useDataStore } from "../stores/DataContext";
import { apiUrl } from "../DocConfig";
import axios from "axios";


function ReportBuilder() {

    ////////////////////////////
    // Data Store
    ////////////////////////////
    const store = useDataStore();

    ////////////////////////////
    // Set Component State
    ////////////////////////////
    const [dynamicReportData, setReportData] = useState(0)

    ////////////////////////////
    // Submit Report
    ////////////////////////////
    const detectorCorridorSelected = () => {

        if (store.queryBuilder.reportType === 'detector') {
            if (store.queryBuilder.selectedDetector === null) {
                alert('Please select a Detector.')
                return false
            }
            else {
                return true
            }
        }
        else {
            if (store.queryBuilder.selectedCorridor === null) {
                alert('Please select a Corridor.')
                return false;
            }
            else {
                return true
            }

        }

    }

    const checkDateRange = () => {

        if (store.queryBuilder.startDate === undefined || store.queryBuilder.endDate === undefined) {
            alert("Please select a valid Start Date and End Date.")
            return false
        }
        else {
            return true
        }
    }

    const submitClicked = () => {

        if (detectorCorridorSelected() && checkDateRange()) {

            var reportType = store.queryBuilder.reportType;
            var reportData = {
                startDate: store.queryBuilder.startDate,
                endDate: store.queryBuilder.endDate,
                reportType: store.queryBuilder.reportType,
                detNumbers: null,
                detIDs: null,
                description: null,
                route: null,
                detectorCorridor : null,
                corridorID : null
            };

            if (reportType === 'detector') {

                var detectorData = store.queryBuilder.selectedDetector.detector
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

                axios.get(
                    `${apiUrl}/Detector/GetDetectorJSON`,
                    {
                        params: {
                            det_num: reportData['detNumbers']
                        }
                    }
                ).then((data) => {

                    reportData.detectorCorridor = data.data;

                    setReportData(reportData)

                    console.log(dynamicReportData)

                    // var queryParams = encodeURIComponent(JSON.stringify(reportData))
                    // window.open(`/dynamic-report?reportParams=${queryParams}`, '_blank')

                });

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

                    console.log(dynamicReportData)

                    // var queryParams = encodeURIComponent(JSON.stringify(reportData))
                    // window.open(`/dynamic-report?reportParams=${queryParams}`, '_blank')

                })

            }

        }
    }

    return (

        <main
            id="ReportBuilder"
            className="container w-full h-full mx-40"
        >
            <div className="mt-3 grid grid-cols-3 gap-4 content-evenly">
                <ReportTypeToggle />
                <DetectorDropdown />
                <CorridorDropdown />
                <TimePeriodSelection />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4 content-evenly">
                <ResetButton />

                <button
                    onClick={submitClicked}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
                >
                    Submit
                </button>

            </div>

            <div className='mt-3 w-full h-[700px]'>
                <ReportBuilderMap />
            </div>

            <div className="mt-3 w-full h-full">
                <MainDynamicReportComponent data={dynamicReportData}/>
            </div>

        </main>

    )
    // }
}
export default ReportBuilder;
