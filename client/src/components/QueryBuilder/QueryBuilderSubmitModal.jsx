import React from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";

function QueryBuilderSubmitModal() {
  const store = useDataStore();
  const navigate = useNavigate();

  async function submitClicked() {
    const res = await store.queryBuilder.addGeneratedReport();

    if (res.status === 200) {
      navigate(`/report/${res.data.id}`);
    } else {
      alert(
        "There was an error generating your report request.  Please try again later."
      );
    }

    store.queryBuilder.setSubmitModalShown(false);
  }

  return (
    <Modal open={store.queryBuilder.submitModalShown}>
      <div className="flex h-screen w-screen">
        <div className="m-auto w-1/4 rounded-sm bg-white p-6 shadow-lg">
          Your time estimate is ...
          <div className="mt-2">
            <button
              onClick={() => store.queryBuilder.setSubmitModalShown(false)}
              className="rounded bg-blue-500 px-4 py-1 font-bold text-white hover:bg-blue-600"
            >
              Close
            </button>
            <button
              onClick={submitClicked}
              className="ml-2 rounded bg-green-500 px-4 py-1 font-bold text-white hover:bg-green-600"
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
