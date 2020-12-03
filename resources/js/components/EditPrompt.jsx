import * as React from 'react';
import Modal from './Modal.jsx';
import Form from 'react-bootstrap/Form';

export default function EditPrompt({ title, submit, close, children }) {
  const form = React.useRef(undefined);
  return (
    <Modal
      title={title}
      confirmText={"OK"}
      onClose={close}
      onSubmit={() => {
        const data = Object.fromEntries(new FormData(form.current));
        submit(data);
      }}>
      <Form ref={form}>
        {children}
      </Form>
    </Modal>
  );
}
