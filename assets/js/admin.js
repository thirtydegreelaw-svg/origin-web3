// ==========================================
// ORIGIN WEB3 CMS DASHBOARD
// ==========================================

const addNews = document.getElementById("addNews");
const manageNews = document.getElementById("manageNews");
const messages = document.getElementById("messages");
const logout = document.getElementById("logout");

// Add News
if (addNews) {

    addNews.addEventListener("click", () => {

        window.location.href = "add-news.html";

    });

}

// Manage News
if (manageNews) {

    manageNews.addEventListener("click", () => {

        window.location.href = "manage-news.html";

    });

}

// Contact Messages
if (messages) {

    messages.addEventListener("click", () => {

        window.location.href = "messages.html";

    });

}

// Logout
if (logout) {

    logout.addEventListener("click", async () => {

        await client.auth.signOut();

        window.location.href = "login.html";

    });

}