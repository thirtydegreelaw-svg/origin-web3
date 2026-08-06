// ==========================================
// ORIGIN WEB3 CMS LOGIN
// ==========================================

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    message.style.color = "#ffffff";
    message.textContent = "Signing in...";

    const { error } = await client.auth.signInWithPassword({

        email,
        password

    });

    if (error) {

        message.style.color = "#ff4d4d";
        message.textContent = error.message;
        return;

    }

    message.style.color = "#00ff88";
    message.textContent = "Login Successful...";

    setTimeout(() => {

        window.location.href = "dashboard.html";

    },1000);

});