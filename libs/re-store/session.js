function readSession(name) {
  try {
    return JSON.parse(sessionStorage[name]);
  } catch {
    // Ignore parse errors.
  } finally {
    // Restore deletes session stored data.
    delete sessionStorage[name];
  }
  return undefined;
}

function storeSession(name, data) {
  sessionStorage[name] = JSON.stringify(data);
}

function sessionRestore(name, restoreDefault) {
  return typeof restoreDefault == typeof Object()
    ? { ...restoreDefault, ...readSession(name) }
    : readSession(name) ?? restoreDefault;
}

export { storeSession, sessionRestore };
