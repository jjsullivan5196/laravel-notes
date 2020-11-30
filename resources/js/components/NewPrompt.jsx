import * as React from 'react';
import Modal from './Modal.jsx';

export default function NewPrompt({ title, submit, close }) {
  const input = React.useRef(null);
  
  return (
    <Modal
      title={title}
      confirmText={"OK"}
      onClose={close}
      onSubmit={() => { submit(input.current.value); }}>
      <input type="text" ref={input} />
    </Modal>
  );
}
