import React from "react";
import {Toast} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import {hideToast} from "../configuration/redux/common-actions";

export default ({}) => {
    const dispatch = useDispatch();
    const toast = useSelector((state) => state.toast);

    const onClose = () => {
        dispatch(hideToast());
    }

    return (
        <div style={{position:'fixed', top: 20, right: 20}}>
            <Toast onClose={onClose} show={toast.show} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">{toast.header}</strong>
                </Toast.Header>
                <Toast.Body>{toast.body}</Toast.Body>
            </Toast>
        </div>
    );
}