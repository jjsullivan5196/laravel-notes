import * as React from 'react';
import Row from 'react-bootstrap/Row';

export default function StackView({ notes, onClick, peek = 2 }) {
  const stacks = {};

  notes.forEach(n => {
    const stack = stacks[n.stack] || (stacks[n.stack] = []);
    stack.push(n);
  });

  const cards = Object.entries(stacks).map(([name, notes]) => {
    const bullets = [];
    const done = notes.every(n => n.done);
    const len = Math.min(notes.length, peek);

    for(let i = 0; i < len; i++) {
      bullets.push(<li>{notes[i].text}</li>);
    }

    if(notes.length > peek) {
      bullets.push(<li>...</li>);
    }

    return (
      <div className="col-5" onClick={() => { onClick(name); }}>
        <div className="card mb-3">
          <div className="card-header">
            <span>{ done ? "DONE" : "TODO" }</span>
          </div>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <ul className="card-text">
              {bullets}
            </ul>
          </div>
        </div>
      </div>
    );
  })
  
  return (<Row>{cards}</Row>);
}
