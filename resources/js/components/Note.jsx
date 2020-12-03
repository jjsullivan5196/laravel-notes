import * as React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function Note({ note, toggle, remove }) {
  const done = note.done;
  
  return (
    <Col xs={5}>
      <Card className="mb-3">
        <Card.Header>
          <Button
            style={{ display: 'inline-block' }}
            variant={done ? 'primary' : 'secondary'}
            onClick={toggle}>
            <span>{ done ? "DONE" : "TODO" }</span>
          </Button>
          <button className="close" aria-label="Close" onClick={remove}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <h5>{note.title}</h5>
          </Card.Title>
          <Card.Text>
            <p>{note.text}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
