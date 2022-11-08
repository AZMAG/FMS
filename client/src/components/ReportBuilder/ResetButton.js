import React from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";

function ResetButton() {
    const store = useDataStore();
    const anyChanges = store.queryBuilder.anyChanges();

    function resetClicked() {
        store.queryBuilder.resetQueryBuilder();
    }

    const defaultStyle =
        "bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded";
    const disabledStyle =
        "bg-blue-500 text-white font-bold py-1 px-4 rounded opacity-50 cursor-not-allowed";

    return (
        <button
            disabled={!anyChanges}
            onClick={resetClicked}
            className={anyChanges ? defaultStyle : disabledStyle}
        >
            Reset
        </button>
    );
}
export default observer(ResetButton);
