import * as React from 'react';
import { render } from 'react-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Form from 'react-bootstrap/Form';

import Stack from './components/Stack.jsx';
import StackView from './components/StackView.jsx';
import EditPrompt from './components/EditPrompt.jsx';

import * as API from './api.js';

function App() {
  const [ notes, setNotes ] = React.useState(undefined),
        [ mode, setMode ] = React.useState(undefined),
        [ current, setCurrent ] = React.useState(undefined);

  const stacks = React.useMemo(
    () => notes && new Set(notes.map(n => n.stack)),
    [notes]
  );

  const currentNotes = React.useMemo(
    () => notes && current ? notes.filter(n => n.stack === current) : undefined,
    [notes, current]
  );

  React.useEffect(() => {
    API.notes().then(setNotes);
  }, []);

  return stacks && notes ? (
    <Container>
      <Row>
        <Col className="mt-3 mb-3 ml-1">
          <Dropdown
            onSelect={key => { setCurrent(key); }}
          >
            <ButtonGroup>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>
                    <span style={{ fontSize: "20px" }}>Make a note</span>
                  </Tooltip>}
              >
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => { setMode('new-note'); }}>
                  +
                </Button>
              </OverlayTrigger>
              {stacks.has(current) ?
               <Button
                 size="lg"
                 variant="info"
                 onClick={() => { setCurrent(undefined); }}
               >Stacks</Button> : <></>}
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

      {stacks.has(current) ?
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
         }}/> :
       <StackView
         notes={notes}
         onClick={name => { setCurrent(name); }}
       />}

      {mode === 'new-note' ?
       <EditPrompt
         title="New Note"
         close={() => { setMode(undefined); }}
         submit={(note) => {
           API.makeNote({ ...note, done: false })
             .then(() => API.notes())
             .then(setNotes);

           setMode(undefined);
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
