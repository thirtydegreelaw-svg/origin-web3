window.addEventListener("scroll",()=>{

const btn=document.getElementById("topBtn");

if(window.scrollY>300){

btn.style.display="block";

}else{

btn.style.display="none";

}

});

document.getElementById("topBtn").onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// ==========================
// HAMBURGER MENU
// ==========================

const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav");

if (hamburger && nav) {

    hamburger.addEventListener("click", function () {

        nav.classList.toggle("active");

    });

}

