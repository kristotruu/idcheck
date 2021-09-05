import {Col, Row} from "react-bootstrap";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {MdContentCopy} from "react-icons/md";
import React from "react";
import {useDispatch} from "react-redux";
import {showToast} from "../configuration/redux/common-actions";

export default ({idCode}) => {
    const dispatch = useDispatch();

    const onCopy = (code) => {
        dispatch(showToast("Copied", `Identification code ${code} has been copied`));
    }
    return (
        <Row key={idCode.code} className="generated">
            <Col md={6}>{idCode.code} </Col>
            {idCode.gender && <Col md={2}>
                <span className="badge">{idCode.gender === 1 ? 'MALE' : 'FEMALE'}</span>
            </Col>
            }
            <Col md={2}>
                <span className="badge badge-dark">{idCode.date.format('YYYY-MM-DD')}</span>
            </Col>
            <Col md={2} className="d-flex justify-content-end align-items-center">
                <CopyToClipboard text={idCode.code} onCopy={onCopy} >
                    <MdContentCopy/>
                </CopyToClipboard></Col>
        </Row>
    )
}