import produce from 'immer';

const reqParams = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

function fetchJson(...args) {
  return fetch(...args)
    .then(r => r.json());
}

export function notes() {
  return fetchJson('/api/notes', { ...reqParams });
}

export function changeNote(name, { text = "", done = false }) {
  return fetchJson('/api/notes', {
    ...reqParams,
    method: 'POST',
    body: JSON.stringify({ note: { [name]: { text, done } }})
  });
}

export function removeNote(name) {
  return fetchJson(`/api/notes/${name}`, { ...reqParams, method: 'DELETE' });
}

export function stacks() {
  return fetchJson('/api/stacks', { headers: { 'Accept': 'application/json' }});
}

export function changeStack(name, notes = []) {
  return fetchJson('/api/stacks', {
    ...reqParams,
    method: 'POST',
    body: JSON.stringify({ stack: { [name]: notes }})
  });
}

export function removeStack(name) {
  return fetchJson(`/api/stacks/${name}`, { ...reqParams, method: 'DELETE' });
}
