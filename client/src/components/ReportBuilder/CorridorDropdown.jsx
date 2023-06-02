import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import getCorridors from "../Map/getCorridors";
function CorridorDropdown() {
    const store = useDataStore();
    const [options, setOptions] = useState([]);

    const showErrors =
        store.queryBuilder.validated && !store.queryBuilder.selectedCorridor;
    const [selectedCorridor, setSelectedCorridor] = useState(null);

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

    return (
        <>
            {store.queryBuilder.reportType === "corridor" && (
                <div className="flex items-center">
                    <p className="w-1/2">Select Corridor:</p>
                    <Autocomplete
                        isOptionEqualToValue={(option, val) => {
                            return option.id === val.id;
                        }}
                        size="small"
                        className="w-1/2"
                        options={options}
                        value={store.queryBuilder.selectedCorridor}
                        onChange={(event, newValue) => {
                            store.queryBuilder.setSelectedCorridor(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                error={showErrors}
                                label="Select Corridor"
                                {...params}
                            />
                        )}
                    />
                </div>
            )}
            {/* {store.queryBuilder.selectedCorridor && (
                <SmallCorridorInfoBox
                    Corridor={store.queryBuilder.selectedCorridor.Corridor}
                />
            )} */}
        </>
    );
}

export default observer(CorridorDropdown);
