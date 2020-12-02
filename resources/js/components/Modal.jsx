import * as React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function __Modal({ title, onSubmit, onClose, confirmText, children }) {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSubmit}>{confirmText}</Button>
      </Modal.Footer>
    </Modal>
  );
}
