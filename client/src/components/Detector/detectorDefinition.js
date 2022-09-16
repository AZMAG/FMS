import React from "react";

export default function DetectorDefinition() {
    return (
        <div className="bg-[#eeeeee] text-sm p-4">
            <h4 className="text-lg font-semibold mb-2">
                Definition of Error Flag Criteria*
            </h4>
            <p className="ml-2 mt-0 mb-4">
                Note: All criteria are applied to individual 5-minute data rows.
            </p>
            <ol className="list-[upper-alpha] marker:font-semibold px-8 mb-2">
                <li>
                    Speed
                    <ol className="list-decimal pl-4">
                        <li>Speed {">"} 85 mph in any lane</li>
                        <li>
                            Speed {"<"} 5 mph but {">"} 0 in any lane
                        </li>
                        <li>
                            Speed<sub>n+1</sub> {"<"} (0.45 × speed
                            <sub>n</sub>) but speed
                            <sub>n+1</sub> {">"} 0
                        </li>
                    </ol>
                </li>
                <li>
                    Volume (Applied to GP, HOV, or All lanes together rather
                    than each individual lane)
                    <ol className="list-decimal pl-4">
                        <li>Volume {">"} 3,000 vph per lane</li>
                        <li>Density {">"} 220 vehicles per mile per lane</li>
                    </ol>
                </li>
                <li>
                    Occupancy
                    <ol className="list-decimal pl-4">
                        <li>Occupancy {">"} 80% in any lane</li>
                    </ol>
                </li>
                <li>
                    Difference Error
                    <ol className="list-decimal pl-4">
                        <li>
                            Speed, volume, or occupancy = 0 where the sum of all
                            is {">"} 0
                        </li>
                    </ol>
                </li>
                <li>
                    Zero Error (missing data)
                    <ol className="list-decimal pl-4">
                        <li>All lanes = 0</li>
                        <li>
                            Any individual lane = 0 continuously for 20-minutes
                            or more
                        </li>
                    </ol>
                </li>
                <li>
                    Row Errors
                    <ul className="list-disc pl-4">
                        <li>Count of rows with one or more error flags</li>
                    </ul>
                </li>
                <li>
                    Rows Valid
                    <ul className="list-disc pl-4">
                        <li>Count of rows with no error flags</li>
                    </ul>
                </li>
            </ol>
            <p className="ml-2 mt-0 mb-4">
                * Criteria adapted from the TTI Urban Congestion Report
                methodology and other research.
            </p>
            <h6 className="text-[14px] font-semibold mb-2">
                Recommended Macroscopic Checks
            </h6>
            <p className="ml-2 mt-0 mb-4">
                Additional quality control filters are recommended beyond the
                validity criteria listed above. Where the above criteria seeks
                to filter out erroneous data rows at the microscopic level, the
                macroscopic criteria would consider and potentially reject the
                detector as a whole. Some macroscopic rejection criteria might
                include:
            </p>
            <ol className="list-decimal marker:font-semibold pl-8">
                <li>
                    More than 50% of individual data rows have been filtered
                    out.
                </li>
                <li>
                    Speed and volume trend lines (or other visual charts) appear
                    abnormal and unreasonable.
                </li>
                <li>
                    Spatial comparisons of result charts with adjacent locations
                    show unreasonable trends.
                </li>
            </ol>
        </div>
    );
}
