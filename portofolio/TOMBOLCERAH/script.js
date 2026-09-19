const music = document.getElementById("music");
const musicText = document.getElementById("musicText");


function toggleMusic() {

    if (music.paused) {

        music.play()
            .then(() => {

                musicText.innerText = "Pause Music";

            })
            .catch(() => {

                alert("Musik belum bisa diputar. Pastikan file music.mp3 ada di folder project.");

            });

    } else {

        music.pause();

        musicText.innerText = "Play Music";

    }

}


function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {

        page.classList.remove("active");

    });


    document.getElementById(pageId).classList.add("active");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
/* =========================================
   HORIZONTAL PAGE TRANSITION
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