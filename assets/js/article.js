// ==========================================
// ORIGIN WEB3 - ARTICLE PAGE (PART 1)
// ==========================================

const articleContainer = document.getElementById("articleContainer");

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

// Reading Time
function getReadingTime(content) {

    const text = content.replace(/<[^>]*>/g, "");

    const words = text.trim().split(/\s+/).length;

    return Math.max(1, Math.ceil(words / 200));

}

// Format Date
function formatDate(dateString) {

    return new Date(dateString).toLocaleDateString("en-GB", {

        day: "2-digit",

        month: "long",

        year: "numeric"

    });

}

// Load Article
async function loadArticle() {

    if (!slug) {

        articleContainer.innerHTML = `
            <h2>Article Not Found</h2>
        `;

        return;

    }

    try {

        const { data, error } = await client
            .from("news")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error) throw error;

        const image =
            data.image && data.image.trim() !== ""
                ? data.image
                : "assets/images/news-placeholder.webp";

        const readingTime = getReadingTime(data.content);

        articleContainer.innerHTML = `

        <article class="article-card">

            <div class="article-meta">

                <span class="article-category">

                    ${data.category}

                </span>

                <span class="article-date">

                    📅 ${formatDate(data.publish_date)}

                </span>

                <span class="article-read">

                    ⏱ ${readingTime} min read

                </span>

            </div>

            <h1 class="article-title">

                ${data.title}

            </h1>

            <img
                class="article-image"
                src="${image}"
                alt="${data.title}"
            >

            <div class="article-body">

                ${data.content}

            </div>

            <div id="relatedArticles"></div>

            <div id="articleNavigation"></div>

            <div id="shareButtons"></div>

        </article>

        `;

        document.title = `${data.title} | Origin Web3`;

        // अगले Part में यहीं Functions आएँगे

        await loadRelated(data);

        await loadNavigation(data);

        loadShare(data);

    }

    catch (err) {

        console.error(err);

        articleContainer.innerHTML = `

            <div class="news-error">

                <h2>Unable to load article.</h2>

                <br>

                <a href="news.html" class="back-btn">

                    ← Back to News

                </a>

            </div>

        `;

    }

}

loadArticle();

// ==========================================
// RELATED ARTICLES
// ==========================================

async function loadRelated(currentArticle){

    const container = document.getElementById("relatedArticles");

    if(!container) return;

    const { data, error } = await client
        .from("news")
        .select("*")
        .eq("category", currentArticle.category)
        .neq("id", currentArticle.id)
        .order("publish_date",{ascending:false})
        .limit(3);

    if(error || !data || data.length===0){

        container.innerHTML="";

        return;

    }

    let html=`

    <div class="related-news">

        <h2>Related Articles</h2>

    `;

    data.forEach(news=>{

        const image=news.image && news.image.trim()!==""
        ?news.image
        :"assets/images/news-placeholder.webp";

        html+=`

        <a href="article.html?slug=${news.slug}" class="related-item">

            <img src="${image}" alt="${news.title}">

            <div class="related-info">

                <span class="related-category">

                    ${news.category}

                </span>

                <h3>

                    ${news.title}

                </h3>

                <div class="related-date">

                    📅 ${formatDate(news.publish_date)}

                </div>

                <p>

                    ${news.short_description || ""}

                </p>

            </div>

        </a>

        `;

    });

    html+="</div>";

    container.innerHTML=html;

}

// ==========================================
// PREVIOUS / NEXT ARTICLE
// ==========================================

async function loadNavigation(currentArticle){

    const container = document.getElementById("articleNavigation");

    if(!container) return;

    const { data, error } = await client
        .from("news")
        .select("id,title,slug,publish_date,image,short_description")
        .order("publish_date",{ascending:false});

    if(error || !data) return;

    const currentIndex = data.findIndex(
        item => item.id === currentArticle.id
    );

    let html = `<div class="article-navigation">`;

    //  ArticPreviousle
    if(currentIndex < data.length - 1){

        const previous = data[currentIndex + 1];

        const previousImage = previous.image && previous.image.trim() !== ""
    ? previous.image
    : "assets/images/news-placeholder.webp";

html += `
<a href="article.html?slug=${previous.slug}" class="nav-card">

    <img src="${previousImage}" class="nav-image">

    <div class="nav-content">

        <small>⬅ Previous Article</small>

        <h3>${previous.title}</h3>

        <div class="nav-date">

            📅 ${formatDate(previous.publish_date)}

        </div>

        <p class="nav-description">

            ${previous.short_description || ""}

        </p>

    </div>

</a>
`;
    }else{

        html += `<div></div>`;

    }

    // Next Article
    if(currentIndex > 0){

        const next = data[currentIndex - 1];

        const nextImage = next.image && next.image.trim() !== ""
    ? next.image
    : "assets/images/news-placeholder.webp";

html += `
<a href="article.html?slug=${next.slug}" class="nav-card next-card">

    <img src="${nextImage}" class="nav-image">

    <div class="nav-content">

        <small>Next Article ➜</small>

        <h3>${next.title}</h3>

        <div class="nav-date">

    📅 ${formatDate(next.publish_date)}

</div>

<p class="nav-description">

    ${next.short_description || ""}

</p>

    </div>

</a>
`;

    }

    html += `</div>`;

    container.innerHTML = html;

}

// ==========================================
// SHARE BUTTONS
// ==========================================

function loadShare(article){

    const container = document.getElementById("shareButtons");

    if(!container) return;

    const url = window.location.href;

    const title = encodeURIComponent(article.title);

    const shareUrl = encodeURIComponent(url);

    container.innerHTML = `

    <div class="share-section">

        <h2>Share this Article</h2>

        <div class="share-buttons">

            <a
                href="https://wa.me/?text=${title}%20${shareUrl}"
                target="_blank"
                class="share-btn whatsapp">

                🟢 WhatsApp

            </a>

            <a
                href="https://t.me/share/url?url=${shareUrl}&text=${title}"
                target="_blank"
                class="share-btn telegram">

                ✈ Telegram

            </a>

            <a
                href="https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}"
                target="_blank"
                class="share-btn twitter">

                ✖ X

            </a>

            <a
                href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}"
                target="_blank"
                class="share-btn facebook">

                📘 Facebook

            </a>

            <button
                class="share-btn copy"
                onclick="copyArticleLink()">

                📋 Copy Link

            </button>

        </div>

    </div>

    `;

}
function copyArticleLink(){

    navigator.clipboard.writeText(window.location.href);

    alert("Article link copied.");

}