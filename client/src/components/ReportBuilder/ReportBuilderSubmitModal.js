import React from "react";
import { observer } from "mobx-react-lite";
import { useDataStore } from "../../stores/DataContext";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";

function QueryBuilderSubmitModal() {
    const store = useDataStore();
    const navigate = useNavigate();
    function isValidEmail(email) {
        return /^\S+@\S+\.\S+$/.test(email);
    }

    async function submitClicked() {
        if (store.queryBuilder.emailRequested) {
            if (!isValidEmail(store.queryBuilder.email)) {
                store.queryBuilder.setEmailError(true);
                return;
            }
        }

        const res = await store.queryBuilder.addGenereatedReport();

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
                    <p className="text-lg font-semibold">
                        Are you sure you want to create a new report?
                    </p>

                    <FormGroup className="my-5">
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={(e) =>
                                        store.queryBuilder.setEmailRequested(
                                            e.target.checked
                                        )
                                    }
                                    checked={store.queryBuilder.emailRequested}
                                />
                            }
                            label="Email me when this is finished"
                        />
                        {store.queryBuilder.emailRequested && (
                            <FormControl
                                sx={{ width: "300px", marginTop: "10px" }}
                            >
                                <TextField
                                    id="email-input"
                                    value={store.queryBuilder.email}
                                    label="Email"
                                    error={store.queryBuilder.emailError}
                                    size="small"
                                    onChange={(e) =>
                                        store.queryBuilder.setEmail(
                                            e.target.value
                                        )
                                    }
                                ></TextField>
                            </FormControl>
                        )}
                    </FormGroup>
                    <div className="mt-2">
                        <button
                            onClick={() =>
                                store.queryBuilder.setSubmitModalShown(false)
                            }
                            className="rounded bg-blue-500 py-1 px-4 font-bold text-white hover:bg-blue-600"
                        >
                            Close
                        </button>
                        <button
                            onClick={submitClicked}
                            className="ml-2 rounded bg-green-500 py-1 px-4 font-bold text-white hover:bg-green-600"
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
