import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../../stores/DataContext"

import getDetectors from "../../Map/getDetectors";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function DetectorDropdown({detector, reportType, setDetector}) {
    /*
    {
        "label": "2 (I-10 EB 83RD AVE)",
        "id": 1,
        "detector": {
            "ID": 22,
            "det_num": 2,
            "Location": "I-10 EB 83RD AVE",
            "Route": "I-10",
            "Direction": "EB",
            "Milepost": 135.883,
            "GPS": true,
            "Type": "pad",
            "Length_ft": 3602.75952149,
            "y": 33.46212387,
            "x": -112.23562622,
            "Segment": "[[-112.22637512899996,33.462164166000036],[-112.23080390499996,33.46207975200008],[-112.23333717099996,33.46207578700006],[-112.23333775499998,33.46207578600007],[-112.23522974899998,33.46206573300003],[-112.23818539099994,33.46198686500003]]"
        }
    }
    */

    const [detectors, setDetectors] = useState([]);
    // const [selected, setSelected] = useState(undefined)

    useEffect(() => {
        (async () => {
            const d = await getDetectors();
            setDetectors(
                d
                    .sort((a, b) => a.det_num - b.det_num)
                    .map((detector, i) => {
                        return {
                            label: `${detector.det_num} (${detector.Location})`,
                            id: i,
                            detector,
                        };
                    })
            );
        })();
    }, []);

    return (

        <div className="mb-4">
            <p className="w-1/2 font-semibold text-md italic mb-2">Select Detector:</p>
            <Autocomplete
                isOptionEqualToValue={(option, val) => {
                    return option.id === val.id;
                }}
                size="small"
                className="w-1/2"
                options={detectors}
                value={detector}
                onChange={(event, newValue) => {setDetector(newValue)}}
                renderInput={(params) => (
                    <TextField
                        label="Select Detector"
                        {...params}
                        value = {params.value || undefined}
                    />
                )}
            />
        </div>

    );
}

export default observer(DetectorDropdown);
