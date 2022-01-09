export const NOT_WORDLE_COOKIE_NAME = "not-wordle-game-id";

export function setNotWordleCookie(value) {
  const date = new Date();
  date.setTime(date.getTime() + 1000 * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  document.cookie = NOT_WORDLE_COOKIE_NAME + "=" + value + expires + "; path=/";
}
export function getNotWordleCookie() {
  const nameEQ = NOT_WORDLE_COOKIE_NAME + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return "";
}
