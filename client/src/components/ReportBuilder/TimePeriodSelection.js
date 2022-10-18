import TextField from "@mui/material/TextField";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import DocConfig from "../../DocConfig";

function TimePeriodSelection({ timePeriod }) {
    const store = useDataStore();

    function handleYearChange(e) {
        store.queryBuilder.setTimePeriodYear(timePeriod, e.target.value);
    }

    function datePickerChange(isStart, val) {
        if (isStart) {
            store.queryBuilder.setStartDate(timePeriod, val);
        } else {
            store.queryBuilder.setEndDate(timePeriod, val);
        }
    }

    const showErrors =
        store.queryBuilder.validated &&
        !store.queryBuilder.isTimePeriodValid(timePeriod);

    let sortedYears = [...DocConfig.years];
    sortedYears.sort((a, b) => b - a);

    return (
        <div className=" flex-1">
            <p className="mt-4 mb-1">Time Period {timePeriod}</p>
            <div
                className={`border border-gray-300 p-1 mr-4 pb-3 pl-3  ${
                    showErrors ? "border-red-500" : ""
                }`}
            >
                <div className="flex items-center">
                    <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
                        <InputLabel>Year</InputLabel>
                        <Select
                            size="small"
                            value={
                                store.queryBuilder[
                                    "timePeriodYear" + timePeriod
                                ]
                            }
                            onChange={handleYearChange}
                            label="Year"
                        >
                            {sortedYears.map((year, i) => (
                                <MenuItem value={year} key={i}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <span className="ml-4 mr-4">OR</span>
                    <div className="flex flex-col">
                        <TextField
                            onChange={(e) => {
                                datePickerChange(true, e.target.value);
                            }}
                            value={store.queryBuilder["startDate" + timePeriod]}
                            size="small"
                            label="Start Date"
                            type="date"
                            sx={{ my: 2 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            onChange={(e) => {
                                datePickerChange(false, e.target.value);
                            }}
                            value={store.queryBuilder["endDate" + timePeriod]}
                            size="small"
                            label="End Date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                {showErrors && (
                    <div className=" mx-2 mt-3 flex-1 bg-red-100 rounded-lg py-1 px-2 text-base text-red-700">
                        <ErrorOutlineIcon /> Please select a year or choose a
                        start and end date.
                    </div>
                )}
            </div>
        </div>
    );
}
export default observer(TimePeriodSelection);
