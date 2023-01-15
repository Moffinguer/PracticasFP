//Check if the user was already registered
export function saved() {
  return localStorage.getItem("id") != null;
}
