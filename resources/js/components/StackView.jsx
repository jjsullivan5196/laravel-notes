import * as React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

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
      <Col xs={5} onClick={() => { onClick(name); }}>
        <Card className="mb-3">
          <Card.Header>
            <span>{ done ? "DONE" : "TODO" }</span>
          </Card.Header>
          <Card.Body>
            <h5 className="card-title">{name}</h5>
            <ul className="card-text">
              {bullets}
            </ul>
          </Card.Body>
        </Card>
      </Col>
    );
  })
  
  return (<Row>{cards}</Row>);
}
