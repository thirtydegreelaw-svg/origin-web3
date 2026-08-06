// ==========================================
// ORIGIN WEB3 - MAIN SCRIPT
// ==========================================

// ==========================
// SCROLL TO TOP
// ==========================

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

// ==========================
// MOBILE HAMBURGER MENU
// ==========================

const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

console.log(hamburger);
console.log(navbar);

if(hamburger && navbar){

    hamburger.onclick = function(){

        console.log("Hamburger Clicked");

        document.querySelector("nav").classList.toggle("active");
    }

}

// ==========================
// CLOSE MENU AFTER CLICK
// ==========================

const navLinks = document.querySelectorAll("#navbar a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navbar) {

            navbar.classList.remove("active");

        }

    });

});

// ==========================
// STICKY HEADER SHADOW
// ==========================

const header = document.querySelector(".header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}

// ======================================
// ROUND ROBIN REFERRAL SYSTEM
// ======================================

const referralLinks = [

"https://origindefi.io/#/invite?code=0xc5daF38Fa16B795dC99B12cBbB1f1Bc7E85A2ad6",

"https://origindefi.io/#/invite?code=0x70f353641A18ea6877d5b96502896f0680e9a146",

"https://origindefi.io/#/invite?code=0xe9A27Ce1c2910b0aA4571aA1Bbd14a13089213f0",

"https://origindefi.io/#/invite?code=0x8736b6C7f097021E661D8d1882AF4054400E0C99",

"https://origindefi.io/#/invite?code=0xD0A25330EBEb8283E7509739BdfB8a7e8102fF35",

];

// पिछला Index LocalStorage से पढ़ो
let currentIndex = parseInt(localStorage.getItem("referralIndex")) || 0;

const exploreBtns = document.querySelectorAll("#exploreBtnNavbar, #exploreBtnRoadmap");

exploreBtns.forEach(function(exploreBtn){

    exploreBtn.addEventListener("click", function(e){

        e.preventDefault();

        window.open(referralLinks[currentIndex], "_blank");

        currentIndex++;

        if(currentIndex >= referralLinks.length){
            currentIndex = 0;
        }

        localStorage.setItem("referralIndex", currentIndex);

    });

});

    // Save
    localStorage.setItem("referralIndex", currentIndex);

;