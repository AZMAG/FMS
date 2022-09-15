import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDataStore } from "../../../stores/DataContext";
import InputLabel from "@mui/material/InputLabel";
import { observer } from "mobx-react-lite";

function RouteSelector() {
    const store = useDataStore();

    function handleChange(e) {
        store.setSelectedRoute(e.target.value);
    }
    let routes = [];
    if (store.detectorsLayer && store.detectorsLayer.source) {
        const distinctRoutes = [];
        store.detectorsLayer.source.items.forEach((feature) => {
            const route = feature.attributes.Route;
            if (!distinctRoutes.includes(route)) {
                distinctRoutes.push(route);
            }
        });
        distinctRoutes.sort();
        routes = ["All", ...distinctRoutes];
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel>Route</InputLabel>
            <Select
                value={store.selectedRoute}
                onChange={handleChange}
                label="Route"
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
export default observer(RouteSelector);
