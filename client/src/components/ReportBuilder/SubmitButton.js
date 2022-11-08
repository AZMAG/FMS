import React from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";

function SubmitButton() {
    const store = useDataStore();

    function submitClicked() {
        const isValid = store.queryBuilder.checkValidity();
        if (isValid) {
            store.queryBuilder.setSubmitModalShown(true);
        }
    }

    return (
        <button
            onClick={submitClicked}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
        >
            Calculate
        </button>
    );
}
export default observer(SubmitButton);
