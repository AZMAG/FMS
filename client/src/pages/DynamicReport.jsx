/*
Dynamically created reports page.
*/

import React from "react";
import MainDynamicReportComponent from "../components/DynamicReport/MainDynamicReportComponent";

function DynamicReport () {


    var urlParams = new URLSearchParams(window.location.search);
    var reportParams = JSON.parse(urlParams.get('reportParams'));

    console.log(reportParams)

    return (
        <div className='mx-36 flex pt-32'>

            <MainDynamicReportComponent data={reportParams} />

        </div>
    )

}

export default DynamicReport;