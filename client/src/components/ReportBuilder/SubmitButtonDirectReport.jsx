/*
Component for dynamically kicking off the report generation process.

Updates:

11/3/2020 - Chapman Munn - added dynamic-reports route.
*/


import React from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";
import { apiUrl } from "../../DocConfig";
import axios from "axios";

function SubmitButton() {

    const store = useDataStore();

    function submitClicked() {

        const detectorCorridorSelected = () => {
            /*
            Make sure the user has selected a detector or a corridor
            */

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
                detectorCorridor : null
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

                    var queryParams = encodeURIComponent(JSON.stringify(reportData))
                    window.open(`/dynamic-report?reportParams=${queryParams}`, '_blank')

                })



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
                reportData.route = store.queryBuilder.selectedCorridor.corridor.name;

            }




        }
    }

    return (
        <button
            onClick={submitClicked}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
        >
            Submit
        </button>
    );
}
export default observer(SubmitButton);
