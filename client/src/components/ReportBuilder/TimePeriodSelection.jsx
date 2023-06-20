import TextField from "@mui/material/TextField";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import DocConfig from "../../DocConfig";
import DeleteIcon from "@mui/icons-material/Delete";

function TimePeriodSelection({ timePeriod }) {
    const store = useDataStore();

    function handleYearChange(e) {
        store.queryBuilder.setTimePeriodYear(timePeriod, e.target.value);
    }

    function datePickerChange(isStart, val) {
        if (isStart) {
            store.queryBuilder.setStartDate(val);
        } else {
            store.queryBuilder.setEndDate(val);
        }
    }
    console.log(store.queryBuilder);

    const showErrors =
        store.queryBuilder.validated &&
        !store.queryBuilder.isTimePeriodValid(timePeriod);

    let sortedYears = [...DocConfig.years];
    sortedYears.sort((a, b) => b - a);

    return (
        <div className="flex w-full flex-col gap-0.5">
            <div
                className={`text-sm  ${
                    showErrors ? "border-red-500" : ""
                }`}
            >
                <p className="flex  items-center font-semibold text-md italic mb-2">
                    <span className="flex-1 ">
                        Time Period:{" "}
                        {store.queryBuilder.isTwoTimePeriods ? timePeriod : ""}
                    </span>
                    {store.queryBuilder.isTwoTimePeriods && timePeriod === 2 && (
                        <button
                            title="Remove Time Period 2"
                            onClick={() =>
                                store.queryBuilder.setIsTwoTimePeriods(false)
                            }
                            className="rounded bg-red-500 p-1 text-white hover:bg-red-600"
                        >
                            <DeleteIcon fontSize="small" />
                        </button>
                    )}
                </p>
                <div className="block w-full">
                    {/* <FormControl sx={{ minWidth: 85 }} size="small">
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
                    </FormControl> */}

                    {/* <span className="mx-2 font-medium">OR</span> */}

                    <TextField
                        onChange={(e) => {
                            datePickerChange(true, e.target.value);
                        }}
                        value={store.startDate}
                        size="small"
                        label="Start Date"
                        type="date"
                        sx={{ my: 1, mr: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        onChange={(e) => {
                            datePickerChange(false, e.target.value);
                        }}
                        value={store.endDate}
                        size="small"
                        label="End Date"
                        type="date"
                        sx={{ my: 1 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>

                {showErrors && (
                    <div className=" mx-2 mt-3 flex-1 rounded-lg bg-red-100 py-1 px-2 text-base text-red-700">
                        <ErrorOutlineIcon /> Please choose a start and end date.
                    </div>
                )}
            </div>
        </div>
    );
}
export default observer(TimePeriodSelection);
