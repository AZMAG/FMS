import TextField from "@mui/material/TextField";
import { observer } from "mobx-react-lite";

function TimePeriodSelection({ setStartDate, setEndDate, startDate, endDate }) {

    return (
        <div className="flex w-full flex-col gap-0.5">

            <span className="flex tems-center font-semibold text-md italic">
                Time Period:{" "}
            </span>

            <div className="block w-full">

                <TextField
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                    size="small"
                    label="Start Date"
                    type="date"
                    sx={{ my: 1, mr: 2 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                    size="small"
                    label="End Date"
                    type="date"
                    sx={{ my: 1 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>

        </div>
    );
}
export default observer(TimePeriodSelection);
