import * as React from 'react';
import Row from 'react-bootstrap/Row';

import Note from './Note.jsx';

export default function Stack({ notes, toggle, remove }) {
  return (
    <Row>
      {notes.map(n => { return (
        <Note
          note={n}
          toggle={() => { toggle(n); }}
          remove={() => { remove(n.id); }}
          key={n.id}/>
      )})}
    </Row>
  );
}
