import * as React from 'react';
import { render } from 'react-dom';

import * as API from './api.js';

import Stack from './components/Stack.jsx';
import NewPrompt from './components/NewPrompt.jsx';
import EditPrompt from './components/EditPrompt.jsx';

function App() {
  const [ stacks, setStacks ] = React.useState(undefined),
        [ notes, setNotes ] = React.useState(undefined),
        [ mode, setMode ] = React.useState(''),
        [ current, setCurrent ] = React.useState('');

  React.useEffect(() => {
    API.notes().then(setNotes);
    API.stacks().then(stacks => {
      setCurrent(Object.keys(stacks)[0]);
      setStacks(stacks);
    });
  }, []);

  return stacks && notes ? (
    <>
      <div className="container">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => { setMode('new-note'); }}>Add Note</button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => { setMode('new-stack'); }}>Create Stack</button>

        <select
          onChange={ev => { setCurrent(ev.target.value); }}>
          {Object.keys(stacks).map(n => (<option value={n}>{n}</option>))}
        </select>

        <Stack
          stack={stacks[current]}
          notes={notes}
          remove={name => {
            const onStack = new Set(stacks[current]);
            onStack.delete(name);

            API.changeStack(current, Array.from(onStack)).then(setStacks)
              .then(() => API.removeNote(name)).then(setNotes);
          }}
          toggle={name => {
            const note = notes[name];
            API.changeNote(name, { ...note, done: !note.done }).then(setNotes);
          }}/>

        {mode === 'new-stack' ?
         <NewPrompt
           title="New Stack"
           close={() => { setMode(''); }}
           submit={name => {
             API.changeStack(name).then(setStacks);
             setMode('');
           }}/> : <></>}
        {mode === 'new-note' ?
         <EditPrompt
           title="New Note"
           close={() => { setMode(''); }}
           submit={(name, text) => {
             API.changeNote(name, { text }).then(setNotes)
               .then(() => API.changeStack(current, [ ...stacks[current], name ] )).then(setStacks);
             setMode('');
           }}/> : <></>}
      </div>
    </>
  ) : (<></>);
}

render((<App />), document.getElementById('main'));
