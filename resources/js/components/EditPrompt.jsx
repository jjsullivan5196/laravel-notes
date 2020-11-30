import * as React from 'react';
import Modal from './Modal.jsx';

export default function EditPrompt({ title, submit, close }) {
  const name = React.useRef(null);
  const msg = React.useRef(null);
  
  return (
    <Modal
      title={title}
      confirmText={"OK"}
      onClose={close}
      onSubmit={() => { submit(name.current.value, msg.current.value); }}>
      <input type="text" ref={name} placeholder="Name" />
      <input type="text" ref={msg} placeholder="Message" />
    </Modal>
  );
}
