// ==========================================
// ORIGIN WEB3 CMS - MANAGE NEWS
// ==========================================

const table = document.getElementById("newsTable");

async function loadNews() {

    table.innerHTML = `
        <tr>
            <td colspan="5">Loading...</td>
        </tr>
    `;

    const { data, error } = await client
        .from("news")
        .select("*")
        .order("publish_date", { ascending: false });

    if (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    Unable to load news.
                </td>
            </tr>
        `;

        return;

    }

    if (!data || data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    No News Found.
                </td>
            </tr>
        `;

        return;

    }

    table.innerHTML = "";

    data.forEach(news => {

        const image = news.image
            ? news.image
            : "assets/images/news-placeholder.webp";

        const date = new Date(news.publish_date)
            .toLocaleDateString("en-GB");

        table.innerHTML += `

        <tr>

            <td>

                <img src="${image}" alt="">

            </td>

            <td>

                ${news.title}

            </td>

            <td>

                ${news.category ?? "-"}

            </td>

            <td>

                ${date}

            </td>

            <td>

                <button
class="edit-btn"
onclick="location.href='edit-news.html?id=${news.id}'">

✏ Edit

</button>

                <button class="delete-btn" data-id="${news.id}">
                    🗑 Delete
                </button>

            </td>

        </tr>

        `;

    });

}

loadNews();

// ==========================================
// DELETE NEWS
// ==========================================

document.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("delete-btn")) return;

    const id = e.target.dataset.id;

    const confirmDelete = confirm(
        "Are you sure you want to delete this news?"
    );

    if (!confirmDelete) return;

    const { error } = await client
        .from("news")
        .delete()
        .eq("id", id);

    if (error) {

        alert(error.message);

        return;

    }

    alert("✅ News Deleted Successfully");

    loadNews();

});