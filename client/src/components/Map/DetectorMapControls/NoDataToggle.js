import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../../stores/DataContext";

function NoDataToggle() {
    const store = useDataStore();

    return (
        <FormGroup className="ml-3">
            <FormControlLabel
                control={
                    <Switch
                        className="mr-2"
                        size="small"
                        checked={store.detectorMap.noDataAvailableShown}
                        onChange={() =>
                            store.detectorMap.toggleNoDataAvailableShown()
                        }
                    />
                }
                label="Show detectors with no data available"
            />
        </FormGroup>
    );
}

export default observer(NoDataToggle);
