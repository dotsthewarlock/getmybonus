/*
  Minimal progressive enhancement only.
  No bonus workflow or application business logic is implemented at this stage.
*/
const year = document.querySelector('#year');

if (year) {
  year.textContent = new Date().getFullYear();
}
