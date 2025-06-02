const form = document.getElementById("form");
const firstname_input = document.getElementById("firstname-input");
const lastname_input = document.getElementById("lastname-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  let errors = [];

  if (firstname_input) {
    errors = getSignupFormErrors(
      firstname_input.value,
      lastname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );
  } else {
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  }
});

function getSignupFormErrors(
  firstname,
  lastname,
  email,
  password,
  repeatPassword
) {
  let errors = [];

  if (firstname === "" || firstname == null) {
    errors.push("Zadej své jméno");
    firstname_input.parentElement.classList.add("incorrect");
  }
  if (lastname === "" || lastname == null) {
    errors.push("Zadej své příjmení");
    lastname_input.parentElement.classList.add("incorrect");
  }
  if (email === "" || email == null) {
    errors.push("Zadej svůj email");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Zadej své heslo");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Heslo musí mít alespoň 8 znaků");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password !== repeatPassword) {
    errors.push("Hesla se neshodují.");
    password_input.parentElement.classList.add("incorrect");
    repeat_password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === "" || email == null) {
    errors.push("Zadej svůj email");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password === "" || password == null) {
    errors.push("Zadej své heslo.");
    password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

const allInputs = [
  firstname_input,
  lastname_input,
  email_input,
  password_input,
  repeat_password_input,
].filter((input) => input != null);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});

// Mobile Menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButton = document.querySelector(".hamburger-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  hamburgerButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = mobileMenu.querySelectorAll("a");
  const indicator = mobileMenu.querySelector(".mobile-indicator");

  let activeIndex = 0;

  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // zabrání zavření hned
    mobileMenu.classList.toggle("active");

    moveIndicator(activeIndex);
  });

  document.addEventListener("click", function (event) {
    if (
      !mobileMenu.contains(event.target) &&
      !hamburgerBtn.contains(event.target)
    ) {
      mobileMenu.classList.remove("active");
    }
  });

  function moveIndicator(index) {
    const link = mobileLinks[index];
    if (link) {
      indicator.style.top = link.offsetTop + "px";
      indicator.style.width = link.offsetWidth + "px";
    }
  }

  mobileLinks.forEach((link, index) => {
    link.addEventListener("mouseenter", () => {
      moveIndicator(index);
    });

    link.addEventListener("mouseleave", () => {
      moveIndicator(activeIndex);
    });

    link.addEventListener("click", () => {
      activeIndex = index;
      moveIndicator(index);
    });
  });
});
