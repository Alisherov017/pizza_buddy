// register connections
const registerBtn = document.querySelector("#registerBtn");
const overlay = document.querySelector(".overlay");
const usernameInp = document.querySelector("#usernameInp");
const emailInp = document.querySelector("#emailInp");
const passwordInp = document.querySelector("#passwordInp");
const confirmInp = document.querySelector("#confirmInp");
const signUpBtn = document.querySelector("#signUp");
const form = document.querySelector(".form");

//! login
const loginForm = document.querySelector(".loginForm");
const emailLoginInp = document.querySelector("#loginEmailInp");
const passwordLoginInp = document.querySelector("#loginPasswordInp");
const loginTrigger = document.querySelector("#loginTrigger");
const modal = document.querySelectorAll(".modal");
const username = document.querySelector("#name");
const logoutBtn = document.querySelector("#logout");

//! register
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.style.display = "block";
  form.style.display = "block";
});

loginTrigger.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.style.display = "block";
  loginForm.style.display = "block";
});

overlay.addEventListener("click", closeModal);

//! close modal
function closeModal() {
  modal.forEach((item) => (item.style.display = "none"));
  overlay.style.display = "none";
  form.style.display = "none";
  loginForm.style.display = "none";
}
