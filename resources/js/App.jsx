import * as React from 'react';
import { render } from 'react-dom';

import * as API from './api.js';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';

import Stack from './components/Stack.jsx';
import NewPrompt from './components/NewPrompt.jsx';
import EditPrompt from './components/EditPrompt.jsx';
import Modal from './components/Modal.jsx';

function App() {
  const [ notes, setNotes ] = React.useState(undefined),
        [ mode, setMode ] = React.useState(''),
        [ current, setCurrent ] = React.useState('');

  const stacks = React.useMemo(() => {
    if(notes !== undefined) {
      return new Set(notes.map(n => n.stack));
    }
    else {
      return undefined;
    }
  }, [notes]);

  const currentNotes = React.useMemo(() => {
    if(notes && current) {
      return notes.filter(n => n.stack === current);
    }
    else {
      return undefined;
    }
  }, [notes, current]);

  if(stacks && !stacks.has(current)) {
    setCurrent(stacks.values().next().value);
  }

  React.useEffect(() => {
    API.notes().then(setNotes);
  }, []);

  return stacks && notes ? (
    <Container>
      <Row>
        <Col className="m-2">
          <Dropdown
            onSelect={key => { setCurrent(key); }}
          >
            <ButtonGroup>
              <Button
                size="lg"
                variant="primary"
                onClick={() => { setMode('new-note'); }}>
                +
              </Button>
              <Dropdown.Toggle
                variant="secondary"
                size="lg">
                {current}
              </Dropdown.Toggle>
            </ButtonGroup>

            <Dropdown.Menu >
              {[...stacks].map(n => (<Dropdown.Item eventKey={n}>{n}</Dropdown.Item>))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Stack
        notes={currentNotes}
        remove={id => {
          API.removeNote(id)
            .then(() => API.notes())
            .then(setNotes);
        }}
        toggle={note => {
          API.changeNote(note.id, { done: !note.done })
            .then(() => API.notes())
            .then(setNotes);
        }}/>

      {mode === 'new-note' ?
       <EditPrompt
         title="New Note"
         close={() => { setMode(''); }}
         submit={(note) => {
           API.makeNote({ ...note, done: false })
             .then(() => API.notes())
             .then(setNotes);

           setMode('');
         }}>
         <Form.Group as={Row}>
           <Form.Label column>Title</Form.Label>
           <Col sm="10">
             <Form.Control
               name="title"
               type="text"
             />
           </Col>
         </Form.Group>
         <Form.Group as={Row}>
           <Form.Label column>Text</Form.Label>
           <Col sm="10">
             <Form.Control
               name="text"
               type="text"
             />
           </Col>
         </Form.Group>
         <Form.Group as={Row}>
           <Form.Label column>Stack</Form.Label>
           <Col sm="10">
             <Form.Control
               name="stack"
               type="text"
               defaultValue={current || ""}
             />
           </Col>
         </Form.Group>
       </EditPrompt> : <></>}
    </Container>
  ) : (<></>);
}

render((<App />), document.getElementById('main'));
