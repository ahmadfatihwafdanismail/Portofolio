/* =========================
   SLIDE NAVIGATION
========================= */

const slides = document.querySelector(".slides");
const slideElements = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");


function goToSlide(index) {

    slideElements[index].scrollIntoView({
        behavior: "smooth"
    });
}


/* =========================
   ACTIVE DOT
========================= */

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const index =
                    [...slideElements]
                    .indexOf(entry.target);

                dots.forEach(dot => {
                    dot.classList.remove("active");
                });

                if (dots[index]) {
                    dots[index]
                        .classList.add("active");
                }
            }

        });

    },
    {
        threshold: 0.6
    }
);


slideElements.forEach(slide => {
    observer.observe(slide);
});


/* =========================
   BACK
========================= */

function goBack() {

    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
}


/* =========================
   MUSIC
========================= */

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

let playing = false;


function toggleMusic() {

    if (!playing) {

        music.play()
        .then(() => {

            playing = true;

            musicButton.innerHTML =
                "Ⅱ";

            musicButton.style
                .color = "#e0baff";

        })
        .catch(() => {

            alert(
                "Musiknya belum ditemukan 😭\n\nPastikan file bernama musik.mp3 ada di folder yang sama dengan index.html."
            );

        });

    } else {

        music.pause();

        playing = false;

        musicButton.innerHTML =
            "♪";
    }
}


/* =========================
   CHOICE MESSAGE
========================= */

function showMessage(type) {

    const message =
        document.getElementById(
            "choiceMessage"
        );

    if (type === "star") {

        message.innerHTML =
            "⭐ bahkan bintang kecil pun tetap punya cahaya.";

        createParticles("⭐");

    }

    if (type === "flower") {

        message.innerHTML =
            "♡ some people make ordinary days feel softer.";

        createParticles("♡");

    }

    if (type === "moon") {

        message.innerHTML =
            "◐ malam mungkin gelap, tapi nggak pernah benar-benar kosong.";

        createParticles("✦");

    }
}


/* =========================
   HEART EXPLOSION
========================= */

function heartExplosion() {

    createParticles("♡");

    const button =
        document.querySelector(
            ".pill-button"
        );

    button.innerText =
        "hehe, ketahuan ♡";

    setTimeout(() => {

        button.innerText =
            "tap me ♡";

    }, 1800);
}


/* =========================
   PARTICLES
========================= */

function createParticles(symbol) {

    for (let i = 0; i < 12; i++) {

        const particle =
            document.createElement("span");

        particle.innerText =
            symbol;

        particle.style.position =
            "fixed";

        particle.style.left =
            "50%";

        particle.style.top =
            "50%";

        particle.style.zIndex =
            "9999";

        particle.style.pointerEvents =
            "none";

        particle.style.color =
            "#d0a2ff";

        particle.style.fontSize =
            (12 + Math.random() * 18)
            + "px";

        document.body.appendChild(
            particle
        );

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            60 +
            Math.random() * 180;

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;

        particle.animate(

            [
                {
                    transform:
                        "translate(-50%,-50%) scale(0)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(1.2)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    1000,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }

        );

        setTimeout(() => {

            particle.remove();

        }, 1000);
    }
}


/* =========================
   POPUP
========================= */

const popup =
    document.getElementById("popup");

const popupIcon =
    document.getElementById("popupIcon");

const popupTitle =
    document.getElementById("popupTitle");

const popupText =
    document.getElementById("popupText");


function openPopup(
    icon,
    title,
    text
) {

    popupIcon.innerHTML =
        icon;

    popupTitle.innerText =
        title;

    popupText.innerText =
        text;

    popup.classList.add("show");
}


function closePopup(event) {

    if (
        !event ||
        event.target === popup ||
        event.target.classList.contains("close")
    ) {

        popup.classList.remove(
            "show"
        );
    }
}


/* =========================
   PHOTO CLICK
========================= */

const photo =
    document.querySelector(".polaroid");

photo.addEventListener(
    "click",
    () => {

        openPopup(
            "📷",
            "A little memory",
            "Satu foto kecil, satu momen kecil, dan mungkin satu cerita yang nggak kecil."
        );

    }
);


/* =========================
   ESC
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            popup.classList.remove(
                "show"
            );

        }

    }
);
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