// ==========================================
// ORIGIN WEB3 CMS - ADD NEWS
// ==========================================

const form = document.getElementById("newsForm");
const message = document.getElementById("message");

// Auto Slug Generator
document.getElementById("title").addEventListener("input", function () {

    document.getElementById("slug").value = this.value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

});

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    message.style.color = "#ffffff";
    message.textContent = "Uploading image...";

    const title = document.getElementById("title").value.trim();
    const slug = document.getElementById("slug").value.trim();
    const category = document.getElementById("category").value;
    const short_description = document.getElementById("short_description").value.trim();
    const content = document.getElementById("content").value.trim();

    const imageFile = document.getElementById("image").files[0];

    let image = "";

    // Upload Image
    if (imageFile) {

        const fileName = Date.now() + "-" + imageFile.name;

        const { error: uploadError } = await client.storage
            .from("news-images")
            .upload(fileName, imageFile);

        if (uploadError) {

            console.error(uploadError);

            message.style.color = "#ff4d4d";
            message.textContent = uploadError.message;

            return;
        }

        const { data } = client.storage
            .from("news-images")
            .getPublicUrl(fileName);

        image = data.publicUrl;
    }

    message.textContent = "Publishing News...";

    const { error } = await client
        .from("news")
        .insert([{

            title,
            slug,
            category,
            short_description,
            content,
            image,
            publish_date: new Date().toISOString(),
            featured: false

        }]);

    if (error) {

        console.error(error);

        message.style.color = "#ff4d4d";
        message.textContent = error.message;

        return;

    }

    message.style.color = "#00ff88";
    message.textContent = "✅ News Published Successfully";

    form.reset();

});