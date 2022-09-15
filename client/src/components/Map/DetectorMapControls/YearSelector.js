import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import DocConfig from "../../../config";
// import { Donyears } from "../../../config";
import { useDataStore } from "../../../stores/DataContext";
import { observer } from "mobx-react-lite";

function YearSelector() {
    const store = useDataStore();
    function handleChange(e) {
        store.setSelectedYear(e.target.value);
    }
    let sortedYears = [...DocConfig.years];
    sortedYears.sort((a, b) => b - a);

    return (
        <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
            <InputLabel>Year</InputLabel>
            <Select
                size="small"
                value={store.selectedYear}
                onChange={handleChange}
                label="Year"
            >
                {sortedYears.map((year, i) => (
                    <MenuItem value={year} key={i}>
                        {year}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
export default observer(YearSelector);
