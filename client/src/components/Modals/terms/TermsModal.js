import React, { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
// import TermsText from "./TermsText";

function Terms() {
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = (e) => {
    //     e.preventDefault();
    //     setShow(true);
    // };

    // let url = "#";

    return (
        <>
            {/* <a href={url} className="link" onClick={handleShow}>
                Terms
            </a> */}

            {/* <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                aria-label="modal terms"
                scrollable
            >
                <Modal.Header closeVariant="white" closeButton>
                    <Modal.Title>
                        <FontAwesomeIcon icon={faUserEdit} />
                        &nbsp;Terms
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TermsText />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
}
export default Terms;
