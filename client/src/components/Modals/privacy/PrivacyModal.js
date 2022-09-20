import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import PrivacyText from "./PrivacyText";
// import "../modals.scss"

function Privacy() {
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
                Privacy
            </a>

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                aria-label="modal privacy"
                scrollable
            >
                <Modal.Header closeVariant="white" closeButton>
                    <Modal.Title>
                        <FontAwesomeIcon icon={faUserShield} />
                        &nbsp;Privacy
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PrivacyText />
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
export default Privacy;
