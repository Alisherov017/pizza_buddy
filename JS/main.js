const cartBtn = document.querySelector("#cartBtn");

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

//! add product
const addBtn = document.querySelector(".add");
const addProductBtn = document.querySelector("#addProductBtn");
const addForm = document.querySelector(".addProduct");
const container = document.querySelector(".cards-container");
const newModal = document.querySelector(".new");
const imgInp = document.getElementById("imgInp");
const titleInp = document.getElementById("titleInp");
const priceInp = document.getElementById("priceInp");

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

// cartBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   overlay.style.display = "block";
//   addForm.style.display = "block";
// });

overlay.addEventListener("click", closeModal);

addForm.addEventListener("click", function (event) {
  event.stopPropagation();
});

//! close modal
function closeModal() {
  modal.forEach((item) => (item.style.display = "none"));
  overlay.style.display = "none";
  form.style.display = "none";
  loginForm.style.display = "none";
  addForm.style.display = "none";
}

//! function registartion
async function registration() {
  if (passwordInp.value.length < 8) {
    console.error("Password must be more than 8 characters!");
    return;
  }

  if (passwordInp.value !== confirmInp.value) {
    console.error("Password and its confirmation don't match!");
    return;
  }

  let users = await getUsers();

  if (users.some((item) => item.email === emailInp.value)) {
    alert("This email is already taken!");
    return;
  }

  let data = {
    username: usernameInp.value,
    email: emailInp.value,
    password: passwordInp.value,
  };

  console.log(data);

  try {
    await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }

  form.reset();
  closeModal();
}

//! function login

async function getUsers() {
  const data = await getQuery("users");
  console.log(data);
  return data;
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await login();
  closeModal();
});

async function login() {
  if (!emailLoginInp.value.trim() || !passwordLoginInp.value.trim()) {
    alert("Some inputs are empty!");
    return;
  }

  let users = await getUsers();

  const foundUser = users.find((user) => user.email === emailLoginInp.value);

  if (!foundUser) {
    alert("User not found!");
    return;
  }

  if (foundUser.password !== passwordLoginInp.value) {
    alert("Wrong password!");
    return;
  }

  localStorage.setItem(
    "user",
    JSON.stringify({ username: foundUser.username, email: foundUser.email })
  );
  getName();
  checkIsAdmin();
  render();
  loginForm.reset();
}

// //! check admin

//! check admin

function checkIsAdmin() {
  const email = JSON.parse(localStorage.getItem("user"))?.email;
  if (email !== "admin@gmail.com") {
    addBtn.style.display = "none";
    return false;
  } else {
    addBtn.style.display = "block";
    return true;
  }
}
checkIsAdmin();

//! function add products to db

addBtn.addEventListener("click", () => {
  addForm.style.display = "block";
  overlay.style.display = "block";
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

//! function get products from db
addProductBtn.addEventListener("click", async () => {
  if (!imgInp.value || !titleInp.value || !priceInp.value) {
    alert("Some inputs are empty!");
    return;
  }
  const newProduct = {
    image: imgInp.value,
    title: titleInp.value,
    price: priceInp.value,
  };

  try {
    const response = await fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    console.log(response);
    imgInp.value = "";
    titleInp.value = "";
    priceInp.value = "";
    closeModal();
    render(newProduct);
  } catch (error) {}
});

//! function render

let search = "";
let category = "";
let page = 1;
const limit = 2;

async function render() {
  let API = category
    ? `${PRODUCTS_API}?q=${search}&category=${category}&_page=${page}&_limit=${limit}`
    : `${PRODUCTS_API}?q=${search}&_page=${page}&_limit=${limit}`;
  const res = await fetch(API);
  const data = await res.json();

  container.innerHTML = "";

  data.forEach((product) => {
    container.innerHTML += `
        <div class="producCard">
      <div class="card" style="width: 18rem;">
        <img  src=${product.image} class="card-img-top" alt="Product image">
        <div class="card-body">
          <h2 class="card-title">${product.title}</h2>
          <h5 class="card-price">${product.price}$</h5>
          <span class="card-category">${product.category}</span>
          <p class="card-text">${product.description}</p>
          ${
            checkIsAdmin()
              ? ` <div class="buttons">
                <button id=${product.id} class="edit-btn">Edit</button>
                <button id=${product.id} class="delete-btn">Delete</button>
              </div>`
              : ""
          }
        </div>
      </div>
      </div>
      `;
  });
}

render();
