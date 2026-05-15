window.onload = function () {
    displayPasswords();
};

// Show or hide password
function togglePassword() {
    let passwordField = document.getElementById("password");

    if (passwordField.type === "password") {
        passwordField.type = "text";
    } else {
        passwordField.type = "password";
    }
}


function checkStrength() {
    let password = document.getElementById("password").value;
    let strengthText = document.getElementById("strengthText");

    if (password.length < 6) {
        strengthText.innerHTML = "Password Strength: Weak";
        strengthText.style.color = "red";
    }
    else if (password.length < 10) {
        strengthText.innerHTML = "Password Strength: Medium";
        strengthText.style.color = "orange";
    }
    else {
        strengthText.innerHTML = "Password Strength: Strong";
        strengthText.style.color = "green";
    }
}

// Generate random password
function generatePassword() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
    let password = "";

    for (let i = 0; i < 12; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    document.getElementById("password").value = password;
    checkStrength();
}

// Save password
function savePassword() {
    let website = document.getElementById("website").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (website === "" || username === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

    passwords.push({
        website: website,
        username: username,
        password: password
    });

    localStorage.setItem("passwords", JSON.stringify(passwords));

    alert("Password Saved Successfully!");

    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    displayPasswords();
}

// Display saved passwords
function displayPasswords() {
    let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

    let passwordList = document.getElementById("passwordList");

    passwordList.innerHTML = "";

    passwords.forEach(function(item) {
        let row = `
            <tr>
                <td>${item.website}</td>
                <td>${item.username}</td>
                <td>${item.password}</td>
            </tr>
        `;

        passwordList.innerHTML += row;
    });
}

// Search password
function searchPassword() {
    let input = document.getElementById("search").value.toLowerCase();

    let rows = document.querySelectorAll("#passwordList tr");

    rows.forEach(function(row) {
        let website = row.cells[0].innerText.toLowerCase();

        if (website.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
