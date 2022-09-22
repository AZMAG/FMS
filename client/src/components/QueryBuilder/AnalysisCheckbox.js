import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function AnalysisCheckbox({
    value,
    label,
    tooltip,
    onChange,
    checked,
}) {
    return (
        <div>
            <FormControlLabel
                componentsProps={{ typography: { variant: "p" } }}
                control={
                    <Checkbox
                        checked={checked}
                        onChange={(e) => onChange(value, e.target.checked)}
                        name={value}
                    />
                }
                label={label}
            />
        </div>
    );
}
