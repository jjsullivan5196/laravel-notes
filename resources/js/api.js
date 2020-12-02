const reqParams = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export function notes() {
  return fetch('/api/notes', { ...reqParams }).then(r => r.json());
}

export function makeNote(note) {
  return fetch('/api/notes', {
    ...reqParams,
    method: 'POST',
    body: JSON.stringify({ note })
  });
}

export function changeNote(id, note) {
  return fetch(`/api/notes/${id}`, {
    ...reqParams,
    method: 'PUT',
    body: JSON.stringify({ note })
  });
}

export function removeNote(id) {
  return fetch(`/api/notes/${id}`, { ...reqParams, method: 'DELETE' });
}
