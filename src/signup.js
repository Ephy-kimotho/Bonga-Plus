/* === FIREBASE IMPORTS === */
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

/* === FIREBASE CONFIGURATION === */
const firebaseConfig = {
    apiKey: "AIzaSyDf1wnEnpucsYSuUbiVikePkYExWbWhZsg",
    authDomain: "bonga-plus.firebaseapp.com",
    projectId: "bonga-plus",
    storageBucket: "bonga-plus.appspot.com",
    messagingSenderId: "451127807684",
    appId: "1:451127807684:web:55d2b58666f157c326c391"
};


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

/* === DOM ELEMENT SELECTION === */
const form = document.getElementById("register-form")
const emailEl = document.getElementById("email")
const passwordEl = document.getElementById("password")
const confirmPasswordEl = document.getElementById("confirm-password")
const icons = document.querySelectorAll(".input-div i")
const emailErrorBox = document.getElementById("email-error")
const passwordErrorBox = document.getElementById("password-error")
const confirmPasswordErrorBox = document.getElementById("confirm-password-error")



/* === EVENT LISTENERS === */
emailEl.addEventListener("input", () => hideErrorMessage(emailEl, emailErrorBox));
passwordEl.addEventListener("input", () => hideErrorMessage(passwordEl, passwordErrorBox));
confirmPasswordEl.addEventListener("input", () => hideErrorMessage(confirmPasswordEl, confirmPasswordErrorBox));
form.addEventListener("submit", authCreateAccount)


/* ==== FIREBASE AUTHENTICATION ==== */
function authCreateAccount(event) {
    event.preventDefault()
    if (validateForm()) {
        const email = emailEl.value
        const password = passwordEl.value

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                clearInputFields()
                displaySuccessMessage("Account created successfully")
                redirectToHomePage()
            })
            .catch(() => {
                clearInputFields()
                displayErrorMessage("Failed ! Kindly try again")
            })

    }
}

/* === UI FUNCTIONS ===  */
function hideErrorMessage(inputField, errorBox) {
    if (inputField === document.activeElement) {
        errorBox.textContent = "";
    }
}

function togglePasswordVisibility() {
    icons.forEach(icon => {
        icon.addEventListener("click", () => {
            const inputField = icon.previousElementSibling
            if (inputField.type === "password") {
                icon.classList.replace("fa-eye-slash", "fa-eye")
                inputField.type = "text"
            } else if (inputField.type === "text") {
                icon.classList.replace("fa-eye", "fa-eye-slash")
                inputField.type = "password"
            }
        })
    })
}
togglePasswordVisibility()

function validateForm() {
    let isValid = true;
    const regex = /^[a-z]+\d*@[a-z]+\.[a-z]{2,}$/g

    /* Clear all error messages */
    emailErrorBox.textContent = "";
    passwordErrorBox.textContent = "";
    confirmPasswordErrorBox.textContent = "";

    if (emailEl.value.trim() === "") {
        emailErrorBox.textContent = "Please fill in this field";
        isValid = false;
    } else if (!regex.test(emailEl.value)) {
        emailErrorBox.textContent = "Please enter a valid email"
        isValid = false
    }

    if (passwordEl.value.trim() === "") {
        passwordErrorBox.textContent = "Please fill in this field";
        isValid = false;
    } else if (passwordEl.value.length < 8) {
        passwordErrorBox.textContent = "Password is too short";
        isValid = false;
    }

    if (confirmPasswordEl.value.trim() === "") {
        confirmPasswordErrorBox.textContent = "Please fill in this field";
        isValid = false;
    } else if (passwordEl.value !== confirmPasswordEl.value) {
        confirmPasswordErrorBox.textContent = "Passwords don't match";
        isValid = false;
    }

    return isValid;
}

function clearInputFields() {
    emailEl.value = ""
    passwordEl.value = ""
    confirmPasswordEl.value = ""
}


function displaySuccessMessage(message) {
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.textContent = message;

    /*Append success message to the form */
    form.appendChild(successMessage);

    /* Remove the success message after a certain period of time */
    setTimeout(() => {
        successMessage.remove();
    }, 10000);

}
function displayErrorMessage(message) {
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;

    /* Append error message to the form */
    form.appendChild(errorMessage);

    /* Remove the error message after 3 seconds */
    setTimeout(() => {
        errorMessage.remove();
    }, 10000);
}


function redirectToHomePage() {
    window.location.href = "./home.html"
}
