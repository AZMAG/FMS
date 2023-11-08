import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import getCorridors from "../../Map/getCorridors";

function CorridorDropdown({corridor, setCorridor}) {
    
    const [options, setOptions] = useState([]);

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
    }, []);

    return (
        <>

            <div className="mb-4">
                <p className="w-1/2 font-semibold text-md italic mb-2">Select Corridor:</p>
                <Autocomplete
                    isOptionEqualToValue={(option, val) => {
                        return option.id === val.id;
                    }}
                    size="small"
                    className="w-1/2"
                    options={options}
                    value={corridor}
                    onChange={(event, newValue) => {setCorridor(newValue)}}
                    renderInput={(params) => (
                        <TextField
                            // error={showErrors}
                            label="Select Corridor"
                            {...params}
                        />
                    )}
                />
            </div>


        </>
    );
}

export default observer(CorridorDropdown);
