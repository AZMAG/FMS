import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useDataStore } from "../../../stores/DataContext";
import { observer } from "mobx-react-lite";

function DirectionSelector({ path }) {
  const store = useDataStore();

  function handleChange(e) {
    store[path].setSelectedDirection(e.target.value);
  }
  let routes = [];
  if (store[path].detectorsLayer && store[path].detectorsLayer.source) {
    const distinctDirections = [];
    store[path].detectorsLayer.source.items.forEach((feature) => {
      const direction = feature.attributes.Direction;
      if (!distinctDirections.includes(direction)) {
        distinctDirections.push(direction);
      }
    });
    distinctDirections.sort();
    routes = ["All", ...distinctDirections];
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
      <InputLabel>Direction</InputLabel>
      <Select
        label="Direction"
        value={store[path].selectedDirection}
        onChange={handleChange}
      >
        {routes.map((route, i) => (
          <MenuItem value={route} key={i}>
            {route}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default observer(DirectionSelector);
