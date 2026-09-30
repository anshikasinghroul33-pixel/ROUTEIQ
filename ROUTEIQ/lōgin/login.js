/* ============================================
   ROUTEIQ LOGIN JAVASCRIPT
   ============================================ */


/* ============================================
   ELEMENTS
   ============================================ */

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const passwordToggle =
    document.getElementById("passwordToggle");

const eyeOpen =
    document.getElementById("eyeOpen");

const eyeClosed =
    document.getElementById("eyeClosed");

const demoLogin =
    document.getElementById("demoLogin");

const forgotPassword =
    document.getElementById("forgotPassword");

const signInButton =
    document.getElementById("signInButton");

const themeButtons =
    document.querySelectorAll(".theme-button");


/* ============================================
   PASSWORD SHOW / HIDE
   ============================================ */

passwordToggle.addEventListener("click", () => {

    const isPassword =
        passwordInput.type === "password";

    passwordInput.type =
        isPassword ? "text" : "password";

    eyeOpen.classList.toggle(
        "hidden",
        !isPassword
    );

    eyeClosed.classList.toggle(
        "hidden",
        isPassword
    );

    passwordToggle.setAttribute(
        "aria-label",
        isPassword
            ? "Hide password"
            : "Show password"
    );
});


/* ============================================
   EMAIL VALIDATION
   ============================================ */

function validateEmail() {

    const email =
        emailInput.value.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {

        emailError.textContent =
            "Please enter your work email.";

        emailInput.classList.add("invalid");

        return false;
    }

    if (!emailPattern.test(email)) {

        emailError.textContent =
            "Please enter a valid email address.";

        return false;
    }

    emailError.textContent = "";

    return true;
}


/* ============================================
   PASSWORD VALIDATION
   ============================================ */

function validatePassword() {

    const password =
        passwordInput.value;

    if (!password) {

        passwordError.textContent =
            "Please enter your password.";

        return false;
    }

    if (password.length < 6) {

        passwordError.textContent =
            "Password must contain at least 6 characters.";

        return false;
    }

    passwordError.textContent = "";

    return true;
}


/* ============================================
   LIVE VALIDATION
   ============================================ */

emailInput.addEventListener(
    "blur",
    validateEmail
);

passwordInput.addEventListener(
    "blur",
    validatePassword
);


/* ============================================
   LOGIN
   ============================================ */

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const validEmail =
        validateEmail();

    const validPassword =
        validatePassword();

    if (!validEmail || !validPassword) {
        return;
    }


    /* BUTTON LOADING STATE */

    const originalHTML =
        signInButton.innerHTML;

    signInButton.disabled = true;

    signInButton.innerHTML = `
        <span>Signing in...</span>
    `;


    /* ========================================
       DEMO LOGIN → DASHBOARD
       ======================================== */

    setTimeout(() => {

        window.location.href =
            "../dashboard.html";

    }, 700);
});


/* ============================================
   DEMO LOGIN
   ============================================ */

demoLogin.addEventListener("click", () => {

    emailInput.value =
        "demo@routeiq.com";

    passwordInput.value =
        "routeiqdemo";

    emailError.textContent = "";
    passwordError.textContent = "";


    /* Small visual feedback */

    demoLogin.style.transform =
        "scale(0.98)";

    setTimeout(() => {

        demoLogin.style.transform =
            "";

        loginForm.requestSubmit();

    }, 150);

});


/* ============================================
   FORGOT PASSWORD
   ============================================ */

forgotPassword.addEventListener("click", (event) => {

    event.preventDefault();

    alert(
        "Password recovery will be connected to the backend later."
    );

});


/* ============================================
   DARK / LIGHT MODE
   ============================================ */

function setTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    } else {

        document.body.classList.remove(
            "dark-mode"
        );

    }


    themeButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.theme === theme
        );

    });


    localStorage.setItem(
        "routeiq-theme",
        theme
    );
}


/* ============================================
   BUTTON EVENTS
   ============================================ */

themeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            setTheme(
                button.dataset.theme
            );

        }
    );

});


/* ============================================
   LOAD SAVED THEME
   ============================================ */

const savedTheme =
    localStorage.getItem(
        "routeiq-theme"
    );

if (savedTheme) {

    setTheme(savedTheme);

} else {

    setTheme("light");

}