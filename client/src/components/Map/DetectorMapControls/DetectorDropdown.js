import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../../stores/DataContext";
import getDetectors from "./../getDetectors";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";

function DetectorDropdown() {
    const store = useDataStore();
    const [options, setOptions] = useState([]);
    const [selectedDetector, setSelectedDetector] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const detectors = await getDetectors();
            setOptions(
                detectors
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
    }, [store]);

    const defaultButtonStyle =
        "inline-flex items-center rounded bg-mag-teal/75 py-1 px-4 font-bold text-white hover:bg-mag-teal";

    const disabledButtonStyle =
        "inline-flex items-center rounded bg-gray-300 py-1 px-4 font-bold text-white hover:bg-gray-300 cursor-not-allowed";
    return (
        <>
            <p className="w-full pb-4 text-sm italic">
                Select a detector from the dropdown below to open the report for
                the year selected above. ({store.detectorMap.selectedYear}).
            </p>

            <div className="flex items-center justify-between">
                <Autocomplete
                    isOptionEqualToValue={(option, val) => {
                        return option.id === val.id;
                    }}
                    size="small"
                    className="w-3/4"
                    options={options}
                    value={selectedDetector}
                    onChange={(event, newValue) => {
                        setSelectedDetector(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            // error={}
                            label="Select Detector"
                            {...params}
                        />
                    )}
                />
                <button
                    onClick={() =>
                        navigate(
                            `/detector/${store.detectorMap.selectedYear}/${selectedDetector.detector.det_num}`
                        )
                    }
                    title={selectedDetector ? "" : "Select a detector to open"}
                    className={
                        selectedDetector && selectedDetector !== ""
                            ? defaultButtonStyle
                            : disabledButtonStyle
                    }
                >
                    {" "}
                    Open
                </button>
            </div>
        </>
    );
}

export default observer(DetectorDropdown);
