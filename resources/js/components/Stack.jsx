import * as React from 'react';

import Note from './Note.jsx';

export default function Stack({ stack, notes, toggle, remove }) {
  return (
    <div className="stack row">
      {stack.map(name => (<Note
                            note={notes[name]}
                            title={name}
                            toggle={() => { toggle(name); }}
                            remove={() => { remove(name); }}
                            key={name}/>))}
    </div>
  );
}
