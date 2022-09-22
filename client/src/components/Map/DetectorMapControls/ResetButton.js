import React from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../../stores/DataContext";

function ResetButton() {
    const store = useDataStore();

    const anyChanges = store.detectorMap.anyChanges();

    function resetClicked() {
        store.detectorMap.resetMapControls();
    }

    const defaultStyle = "bg-mag-teal text-white font-bold py-1 px-4 rounded";
    const disabledStyle =
        "bg-mag-teal text-white font-bold py-1 px-4 rounded opacity-50 cursor-not-allowed";

    return (
        <button
            disabled={!anyChanges}
            onClick={resetClicked}
            className={anyChanges ? defaultStyle : disabledStyle}
        >
            <span>Reset</span>
        </button>
    );
}
export default observer(ResetButton);
