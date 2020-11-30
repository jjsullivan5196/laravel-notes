export function notes() {
  return fetch('/api/notes', { headers: { 'Accept': 'application/json' }})
    .then(r => r.json());
}

export function changeNote(name, { text = "", done = false}) {
  return fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ note: { [name]: { text, done } }})
  });
}

export function removeNote(name) {
  return fetch(`/api/notes/${name}`, { method: 'DELETE' });
}

export function stacks() {
  return fetch('/api/stacks', { headers: { 'Accept': 'application/json' }})
    .then(r => r.json());
}

export function changeStack(name, notes = []) {
  return fetch('/api/stacks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stack: { [name]: notes }})
  });
}

export function removeStack(name) {
  return fetch(`/api/stacks/${name}`, { method: 'DELETE' });
}
