/*
Dynamically created reports page.
*/

import React from "react";
import MainDynamicReportComponent from "../components/DynamicReport/MainDynamicReportComponent";

function DynamicReport () {

    var urlParams = new URLSearchParams(window.location.search);
    var reportParams = JSON.parse(urlParams.get('reportParams'));

    return (
        <div className='bg-white h-full w-full'>

            <MainDynamicReportComponent data={reportParams} />

        </div>
    )

};

export default DynamicReport;