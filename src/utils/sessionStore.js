export function setSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify({ value }));
}

export function getSession(key) {
  try {
    const dataStr = sessionStorage.getItem(key);
    if (!dataStr) return null;
    const { value } = JSON.parse(dataStr);
    return value || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
export function removeSession(key) {
  sessionStorage.removeItem(key);
}

export default {
  get: getSession,
  set: setSession,
  remove: removeSession,
};
