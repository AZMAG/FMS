import React from "react";

export default function DetectorNotes() {
    return (
        <div className="bg-[#eeeeee] text-sm p-4">
            <h4 className="text-lg font-semibold">Data Notes</h4>
            <ol className="list-decimal marker:font-semibold px-8">
                <li>
                    Original source data is available from ADOT at:&nbsp;
                    <a
                        href="ftp://ftp.az511.com/pub/traffic/5min/"
                        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    >
                        ftp://ftp.az511.com/pub/traffic/5min/
                    </a>
                </li>
                <li>
                    Raw data aggregation level is 5-minute by lane averages.
                </li>
                <li>
                    This file is a standard template receptacle for data
                    processed through a standard macro. ADOT metadata is needed
                    to identify characteristics specific to individual detector
                    locations. Metadata beyond what is listed here can be
                    obtained from Zip file available from ADOT at:&nbsp;
                    <a
                        href="ftp://ftp.az511.com/pub/traffic/docs/"
                        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    >
                        ftp://ftp.az511.com/pub/traffic/docs/
                    </a>
                    &nbsp; A spreadsheet called "fms-det.xslx" contains
                    information on individual detectors including:
                    <ul className="list-disc pl-6">
                        <li>
                            Detector location (description, milepost, and x/y
                            coordinates)
                        </li>
                        <li>
                            Lane configurations (number of lanes and presence of
                            hov lane)
                        </li>
                        <li>
                            Detector type (collection technology is usually
                            dual-loops and sometimes PADS)
                        </li>
                    </ul>
                </li>
                <li>
                    All flagged data rows have been omitted from calculated
                    averages on summary tab.
                </li>
                <li>
                    Most data quality measures here are calculated from
                    qualified weekdays only.
                </li>
            </ol>
        </div>
    );
}
