import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const Backdrop = (props) => {
    const backDropOnClick = () => {
        props.onClose();
    };
    return <div className={styles['backdrop']} onClick={backDropOnClick} />;
};

const ModalOverlay = (props) => {
    return (
        <div className={styles['modal']}>
            <div className={styles['content']}>{props.children}</div>
        </div>
    );
};

const portalOverlay = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalOverlay)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalOverlay)}
        </React.Fragment>
    );
};

export default Modal;
