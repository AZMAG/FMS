import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import LegalText from "./LegalText";
// import "../modals.scss"

function LegalDisclaimer() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    };

    let url = "#";

    return (
        <>
            <a href={url} className="link" onClick={handleShow}>
                Legal Disclaimer
            </a>

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                aria-label="modal legal"
                scrollable
            >
                <Modal.Header closeVariant="white" closeButton>
                    <Modal.Title>
                        <FontAwesomeIcon icon={faBalanceScale} />
                        &nbsp;Legal Disclaimer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LegalText />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default LegalDisclaimer;
