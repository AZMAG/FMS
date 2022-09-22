import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Popover from "@mui/material/Popover";
import HelpIcon from "@mui/icons-material/Help";

export default function AnalysisCheckbox({
    value,
    label,
    tooltip,
    onChange,
    checked,
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <FormControlLabel
                sx={{ mr: "5px", py: 0 }}
                componentsProps={{ typography: { variant: "x-small" } }}
                control={
                    <Checkbox
                        checked={checked}
                        onChange={(e) => onChange(value, e.target.checked)}
                        name={value}
                    />
                }
                label={label}
            />
            {tooltip && (
                <>
                    <span
                        className="ml-0 hover:opacity-60 cursor-pointer"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        <HelpIcon fontSize="small" />
                    </span>
                    <Popover
                        open={open}
                        sx={{
                            pointerEvents: "none",
                        }}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <div className="py-2 px-4 border ">{tooltip}</div>
                    </Popover>
                </>
            )}
        </div>
    );
}
