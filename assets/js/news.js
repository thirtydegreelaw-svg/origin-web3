// ==========================================
// ORIGIN WEB3 - HOMEPAGE NEWS
// ==========================================

console.log("News Module Loaded");

const newsContainer = document.getElementById("news-container");

async function loadNews() {
    if (!newsContainer) {
        console.error("News container not found!");
        return;
    }

    newsContainer.innerHTML = `
        <div class="loading">
            Loading latest news...
        </div>
    `;

    try {
        const { data, error } = await client
            .from("news")
            .select("*")
            .order("publish_date", { ascending: false })
            .limit(4);

        if (error) {
            console.error("Supabase error:", error);
            throw error;
        }

        console.log("Data:", data);
        console.log("Error:", error);

        if (!data || data.length === 0) {
            newsContainer.innerHTML = `
                <div class="news-empty">
                    No news available.
                </div>
            `;
            return;
        }

        // Clear container
        newsContainer.innerHTML = "";

        // Build HTML for each news item
        data.forEach(news => {
            const image = news.image && news.image.trim() !== ""
                ? news.image
                : "assets/images/news-placeholder.webp";

            const date = new Date(news.publish_date).toLocaleDateString(
                "en-GB",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

            const featured = news.featured
                ? `<span class="news-featured">Featured</span>`
                : "";

            const description = news.short_description 
                ? news.short_description 
                : "No description available.";

            newsContainer.innerHTML += `
<article class="news-card">

    <img src="${image}" alt="${news.title}" loading="lazy">

    <div class="news-content">

        ${featured}

        <h3>${news.title}</h3>

        <div class="news-date">

            📅 ${date}

        </div>

        <p class="news-description">

            ${description}

        </p>

        <a href="article.html?slug=${news.slug}" class="news-read">

            Read More →

        </a>

    </div>

</article>
`;
        });

    } catch (err) {
        console.error("Error loading news:", err);
        newsContainer.innerHTML = `
            <div class="news-error">
                ⚠️ Unable to load latest news. Please try again later.
            </div>
        `;
    }
}

// Load news when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadNews);
} else {
    loadNews();
}