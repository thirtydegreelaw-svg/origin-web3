// ==========================================
// ORIGIN WEB3 CMS - EDIT NEWS
// ==========================================

const form = document.getElementById("editForm");
const message = document.getElementById("message");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {

    alert("News ID not found.");

    window.location.href = "manage-news.html";

}

// Load News
async function loadNews() {

    const { data, error } = await client
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {

        console.error(error);

        alert("Unable to load article.");

        return;

    }

    document.getElementById("title").value = data.title || "";
    document.getElementById("slug").value = data.slug || "";
    document.getElementById("category").value = data.category || "";
    document.getElementById("short_description").value = data.short_description || "";
    document.getElementById("content").value = data.content || "";
    document.getElementById("image").value = data.image || "";
    document.getElementById("featured").checked = data.featured || false;

}

loadNews();


// Save Changes

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    message.style.color = "#fff";
    message.textContent = "Saving...";

    const { error } = await client
        .from("news")
        .update({

            title: document.getElementById("title").value.trim(),

            slug: document.getElementById("slug").value.trim(),

            category: document.getElementById("category").value,

            short_description: document.getElementById("short_description").value.trim(),

            content: document.getElementById("content").value.trim(),

            image: document.getElementById("image").value.trim(),

            featured: document.getElementById("featured").checked

        })

        .eq("id", id);

    if (error) {

        console.error(error);

        message.style.color = "#ff4d4d";
        message.textContent = error.message;

        return;

    }

    message.style.color = "#00ff88";
    message.textContent = "✅ News Updated Successfully";

});