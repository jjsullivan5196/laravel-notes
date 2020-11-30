import * as React from 'react';

export default function Modal({ title, onSubmit, onClose, confirmText, children }) {
  return (
    <div className="modal" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onSubmit}>{confirmText}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
