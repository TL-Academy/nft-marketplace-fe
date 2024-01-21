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

const Modal = (props) => {
    return (
        <>
            <Backdrop onClose={props.onClose} />
            <ModalOverlay>{props.children}</ModalOverlay>
        </>
    );
};

export default Modal;
