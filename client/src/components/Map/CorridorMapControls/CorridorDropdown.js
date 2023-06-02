import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../../stores/DataContext";
import getCorridors from "../getCorridors";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";

function DetectorDropdown() {
    const store = useDataStore();
    const [options, setOptions] = useState([]);
    const [selectedCorridor, setSelectedCorridor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const corridors = await getCorridors();
            setOptions(
                corridors
                    .sort((a, b) => a.Name - b.Name)
                    .map((corridor, i) => {
                        return {
                            label: `${corridor.Name}`,
                            id: i,
                            corridor,
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
                Select a corridor from the dropdown below to open the report for
                the year selected above. ({store.corridorMap.selectedYear}).
            </p>

            <div className="flex items-center justify-between">
                <Autocomplete
                    isOptionEqualToValue={(option, val) => {
                        return option.id === val.id;
                    }}
                    size="small"
                    className="w-3/4"
                    options={options}
                    value={selectedCorridor}
                    onChange={(event, newValue) => {
                        setSelectedCorridor(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField label="Select Corridor" {...params} />
                    )}
                />
                <button
                    onClick={() =>
                        navigate(
                            `/corridor/${store.detectorMap.selectedYear}/${selectedCorridor.detector.det_num}`
                        )
                    }
                    title={selectedCorridor ? "" : "Select a corridor to open"}
                    className={
                        selectedCorridor && selectedCorridor !== ""
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
