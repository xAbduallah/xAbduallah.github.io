const home = document.getElementById("home");
const homeMsg = document.querySelector("#home #homeMsg");
const loginForum = document.getElementById("login");
const registerForum = document.getElementById("register");
const navLoginBtn = document.getElementById("navLoginBtn");
const navRegisterBtn = document.getElementById("navRegisterBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const registerBtn = document.querySelector("#register #registerBtn");
const allInputs = document.querySelectorAll("input.form-control");
const loginMsg = document.querySelector("#loginMsg");
const registerMsg = document.querySelector("#registerMsg");

//Inputs elements
const regName = document.querySelector("#register #regName");
const regEmail = document.querySelector("#register #regEmail");
const regPassword = document.querySelector("#register #regPassword");

const loginRemember = document.querySelector("#login #remember");
const loginEmail = document.querySelector("#login #loginEmail");
const loginPassword = document.querySelector("#login #loginPassword");

//Regex
const regPatterns = {
    regName: /^[a-zA-Z0-9]{4,20}$/,
    regEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    loginEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    regPassword: /^.{6,20}$/,
    loginPassword: /^.{6,20}$/,
};

//Storage
var currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
    currentUser = { name: "", email: "", password: "", remember: false };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
}
var usersList = JSON.parse(localStorage.getItem("usersList"));
if (!usersList) {
    usersList = [];
    localStorage.setItem("usersList", JSON.stringify(usersList));
}

//Auto login
if (currentUser.remember) {
    if (IsRegistered(currentUser.email, currentUser.password)) {
        HideElement(loginForum);
        ShowElement(home);
        homeMsg.innerHTML = `Hi ${currentUser.name}, Welcome back.`;
    }
}

//Events...
for (var i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('blur', function () {
        ValidateInputs(this);
    });
}
navRegisterBtn.addEventListener('click', function (e) {
    ShowElement(registerForum);
    HideElement(loginForum);
});
navLoginBtn.addEventListener('click', function (e) {
    ShowElement(loginForum);
    HideElement(registerForum);
});
registerBtn.addEventListener('click', function (e) {
    if (!ValidateInputs(regName)) {
        ShowMsg(registerMsg, "The name must be between 4 and 20 characters long.", "text-danger");
        return false;
    }
    if (!ValidateInputs(regEmail)) {
        ShowMsg(registerMsg, "Please enter a valid email address.", "text-danger");
        return false;
    }
    if (!ValidateInputs(regPassword)) {
        ShowMsg(registerMsg, "Password must be between 6 and 20 characters.", "text-danger");
        return false;
    }
    if (IsRegistered(regEmail.value)) {
        ShowMsg(registerMsg, `Your email (${regEmail.value}) is already exist.`, "text-danger");
        return false;
    }

    usersList.push({
        name: regName.value,
        email: regEmail.value,
        password: regPassword.value,
        remember: false
    });
    UpdateDB();

    let countdown = 1.5;
    const updateCountdown = () => {
        ShowMsg(registerMsg, `Your account has registered successfully.<br>Redirect in ${countdown.toFixed(1)}s`, "text-success");
        countdown -= 0.1;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            ShowMsg(registerMsg, ``, "text-success");
            ClearInputs([regName, regEmail, regPassword]);
            ShowElement(loginForum);
            HideElement(registerForum);
        }
    };
    const countdownInterval = setInterval(updateCountdown, 100);
});
loginBtn.addEventListener('click', function (e) {
    if (!ValidateInputs(loginEmail)) {
        ShowMsg(loginMsg, "Please enter a valid email address.", "text-danger");
        return false;
    }
    if (!ValidateInputs(loginPassword)) {
        ShowMsg(loginMsg, "Password must be between 6 and 20 characters.", "text-danger");
        return false;
    }
    currentUser = IsRegistered(loginEmail.value, loginPassword.value);
    if (!currentUser) {
        ShowMsg(loginMsg, `Your login data is invalid.`, "text-danger");
        return false;
    }
    currentUser.remember = loginRemember.checked;    
    UpdateDB();
    let countdown = 1.5;
    const updateCountdown = () => {
        ShowMsg(loginMsg, `You have successfully logged in.<br>Redirect in ${countdown.toFixed(1)}s`, "text-success");
        countdown -= 0.125;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            ShowMsg(loginMsg, ``, "text-success");
            HideElement(loginForum);
            ShowElement(home);
            ClearInputs([loginEmail, loginPassword]);
            loginRemember.checked = false;
            homeMsg.innerHTML = `Hi ${currentUser.name}, Welcome back.`;
        }
    };
    const countdownInterval = setInterval(updateCountdown, 100);
});
logoutBtn.addEventListener('click', function (e) {
    currentUser = { name: "", email: "", password: "", remember: false };
    UpdateDB();
    ShowElement(loginForum);
    HideElement(home);
});

//Global functions...
function ShowElement(element) {
    element.classList.add("d-block");
    element.classList.remove("d-none");
}
function HideElement(element) {
    element.classList.add("d-none");
    element.classList.remove("d-block");
}
function ValidateInputs(element, print) {
    var isValid = regPatterns[element.id].test(element.value);
    element.classList.remove('is-valid', 'is-invalid');
    if (element.value.length > 0 || print) {
        element.classList.add(isValid ? 'is-valid' : 'is-invalid');

    }
    return isValid;
}
function UpdateDB() {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("usersList", JSON.stringify(usersList));
}
function IsRegistered(email, password) {
    for (var i = 0; i < usersList.length; i++) {
        if (usersList[i].email === email) {
            if (password && password.length > 0 && password != usersList[i].password)
                return false;

            return usersList[i];
        }
    }
    return false;
}
function ShowMsg(msgTag, msg, color) {
    msgTag.innerHTML = msg;
    msgTag.classList.remove('text-danger', 'text-success');
    msgTag.classList.add(color);
}
function ClearInputs(elements) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].value = "";
        elements[i].classList.remove('is-valid', 'is-invalid');
    }
}
