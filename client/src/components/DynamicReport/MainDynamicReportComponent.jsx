import React, { useRef } from "react";
import PageHeader from "../GeneratedReport/PageHeader";
import PageSideMenu from "../GeneratedReport/PageSideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faLocationDot,
    faShield,
    faClock,
} from "@fortawesome/free-solid-svg-icons";

function MainDynamicReportComponent({ data }) {
    /*
    Main report creation component.

    Inputs:
    data -- object (standardized for both detector and corridor reports)

    Detector Data --
    {
        "startDate": "2023-10-31",
        "endDate": "2023-11-30",
        "reportType": "detector",
        "detNumbers": 1,
        "detIDs": 21,
        "description": "I-10 WB 83RD AVE",
        "route": "I-10",
        "detectorCorridor": {
            "ID": 21,
            "det_num": 1,
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
    }

    Corridor Data --

    */

    console.log(data)

    // Header Styling
    const divStyle = "mt-2 flex items-center text-sm text-gray-500";
    const iconStyle = "mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400";

    return (
        <div className="h-full w-full">

            {/* Header */}
            <div className="border py-2 text-center">

                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {(data.reportType === 'detector') ? "Detector" : "Corridor"} Report
                </h2>

                <div className="flex flex-col justify-center pt-4 sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">

                    <div className={divStyle}>
                        <FontAwesomeIcon
                            icon={faShield}
                            className={iconStyle}
                            aria-hidden="true"
                        />
                        Detector IDs:
                        <span className="ml-2 font-bold">{data.detNumbers}</span>
                    </div>

                    <div className={divStyle}>
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className={iconStyle}
                            aria-hidden="true"
                        />
                        {(data.reportType === 'detector') ? 'Detector Location:' : 'Route:'}
                        <span className="ml-2 font-bold">{data.route}</span>
                    </div>

                    <div className={divStyle}>
                        <FontAwesomeIcon
                            icon={faCalendarDays}
                            className={iconStyle}
                            aria-hidden="true"
                        />
                        Start Search Date: {data.startDate}
                    </div>

                    <div className={divStyle}>
                        <FontAwesomeIcon
                            icon={faCalendarDays}
                            className={iconStyle}
                            aria-hidden="true"
                        />
                        End Search Date: {data.endDate}
                    </div>


                </div>

            </div>
            {/* End Header */}

            {/* Report Content */}
            <div className="overflow-y-auto mx-40 text-black">

                {
                    
                    data.reportType === 'detector' && (
                        <p>dsadsada</p>
                    )
                        // data.reportType === 'detector' && {

                        //     var detector;
                    

                        
                        
                    
                    
                        // }
                    
                        // else {
                    
                        //     <p>Corridor</p>
                        // }
                }

                {/* Map
                <div id="section-map">
                    {
                        data.reportType === 'detector' ? (<p>Detector</p>) : (<p></p>)
                    }
                </div> */}

            </div>


        </div>
    )

};

export default MainDynamicReportComponent