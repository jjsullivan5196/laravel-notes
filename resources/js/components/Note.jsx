import * as React from 'react';

export default function Note({ note, toggle, remove }) {
  const done = note.done !== "0";
  
  return (
    <div className="col-5">
      <div className="note card">
        <div className="card-header">
          <button style={{ display: 'inline-block' }} className={`btn ${ done ? 'btn-primary' : 'btn-secondary'}`} onClick={toggle}>
            <span>{ done ? "DONE" : "TODO" }</span>
          </button>
          <button type="button" className="close" aria-label="Close" onClick={remove}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.text}</p>
        </div>
      </div>
    </div>
  );
}
