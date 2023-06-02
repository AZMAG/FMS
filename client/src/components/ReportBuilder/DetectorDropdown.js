import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";
import getDetectors from "./../Map/getDetectors";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SmallDetectorInfoBox from "./SmallDetectorInfoBox";

function DetectorDropdown() {
    const store = useDataStore();
    const [options, setOptions] = useState([]);

    const showErrors =
        store.queryBuilder.validated && !store.queryBuilder.selectedDetector;

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

    return (
        <>
            {store.queryBuilder.reportType === "detector" && (
                <div className="flex items-center">
                    <p className="w-1/2">Select Detector:</p>
                    <Autocomplete
                        isOptionEqualToValue={(option, val) => {
                            return option.id === val.id;
                        }}
                        size="small"
                        className="w-1/2"
                        options={options}
                        value={store.queryBuilder.selectedDetector}
                        onChange={(event, newValue) => {
                            store.queryBuilder.setSelectedDetector(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                error={showErrors}
                                label="Select Detector"
                                {...params}
                            />
                        )}
                    />
                </div>
            )}
            {/* {store.queryBuilder.selectedDetector && (
                <SmallDetectorInfoBox
                    detector={store.queryBuilder.selectedDetector.detector}
                />
            )} */}
        </>
    );
}

export default observer(DetectorDropdown);
