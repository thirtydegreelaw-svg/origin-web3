// ==========================================
// ORIGIN WEB3 - ALL NEWS
// ==========================================

console.log("All News Loaded");

const newsGrid = document.getElementById("all-news");

async function loadAllNews() {

    if (!newsGrid) return;

    newsGrid.innerHTML = `
        <div class="loading">
            Loading News...
        </div>
    `;

    try {

        const { data, error } = await client
            .from("news")
            .select("*")
            .order("publish_date", { ascending: false });

        if (error) throw error;

        if (!data || data.length === 0) {

            newsGrid.innerHTML = `
                <div class="news-empty">
                    No News Available.
                </div>
            `;

            return;

        }

        newsGrid.innerHTML = "";

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

            newsGrid.innerHTML += `

            <article class="news-card">

                <img src="${image}" alt="${news.title}">

                <div class="news-content">

                    <span class="news-category">
                        ${news.category}
                    </span>

                    <h3>${news.title}</h3>

                    <p class="news-description">

    ${news.short_description}

</p>

                    <div class="news-footer">

    <div class="news-date">

        ${date}

    </div>

    <a href="article.html?slug=${news.slug}" class="news-read">

        Read More →

    </a>

</div>

                </div>

            </article>

            `;

        });

    }

    catch(err){

        console.error(err);

        newsGrid.innerHTML=`
            <div class="news-error">

                Failed to load News.

            </div>
        `;

    }

}

loadAllNews();