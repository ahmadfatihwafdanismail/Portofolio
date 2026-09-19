let currentPage = 0;

const pages = document.querySelectorAll(".page");

const music = document.getElementById("music");

const musicBtn = document.getElementById("musicBtn");
const backBtn = document.getElementById("backBtn");

function nextPage() {

    if (currentPage >= pages.length - 1) {
        return;
    }

    pages[currentPage].classList.remove("active");

    currentPage++;

    pages[currentPage].classList.add("active");

    backBtn.classList.add("show");
    music.play().catch(() => {});

}


function previousPage() {

    if (currentPage <= 0) {
        return;
    }

    pages[currentPage].classList.remove("active");

    currentPage--;

    pages[currentPage].classList.add("active");

}


function toggleMusic() {

    if (music.paused) {

        music.play();

        musicBtn.innerHTML = "♫";

    } else {

        music.pause();

        musicBtn.innerHTML = "♪";

    }

}


/* Keyboard */

document.addEventListener("keydown", function(event) {

    if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
    ) {
        nextPage();
    }

    if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
    ) {
        previousPage();
    }

});/* =========================================
   APPLE STYLE PAGE TRANSITION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("a[href]").forEach(link => {

        link.addEventListener("click", () => {

            const href = link.getAttribute("href");

            if (!href) return;

            if (
                href.includes("../index.html") ||
                href.includes("index.html#projects")
            ) {

                document.documentElement.dataset.direction = "back";

            } else {

                document.documentElement.dataset.direction = "forward";

            }

        });

    });

});