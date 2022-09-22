import React from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

function QueryBuilderSubmitModal() {
    const store = useDataStore();
    const navigate = useNavigate();

    function submitClicked() {
        store.queryBuilder.setSubmitModalShown(false);
        navigate(
            "/detector/" + store.queryBuilder.selectedDetector.detector.det_num
        );
    }

    return (
        <Modal open={store.queryBuilder.submitModalShown}>
            <div className="w-screen h-screen flex">
                <div className="m-auto bg-white p-6 w-1/4 rounded-sm shadow-lg">
                    Your time estimate is ...
                    <div className="mt-2">
                        <button
                            onClick={() =>
                                store.queryBuilder.setSubmitModalShown(false)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
                        >
                            Close
                        </button>
                        <button
                            onClick={submitClicked}
                            className="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
export default observer(QueryBuilderSubmitModal);
