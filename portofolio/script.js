/* =====================================================
   ELEMENTS
===================================================== */

const body = document.body;

const navbar =
    document.querySelector(".navbar");

const themeToggle =
    document.getElementById("themeToggle");

const menuToggle =
    document.getElementById("menuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");

const scrollProgress =
    document.querySelector(".scroll-progress");

const revealElements =
    document.querySelectorAll(".reveal");

const showcaseProjects =
    document.querySelectorAll(".showcase-project");


/* =====================================================
   THEME
===================================================== */

const savedTheme =
    localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {

    body.classList.add("dark");

    themeToggle.textContent = "☀";

}


/* Toggle theme */

themeToggle.addEventListener("click", () => {

    body.classList.toggle("dark");

    const isDark =
        body.classList.contains("dark");

    themeToggle.textContent =
        isDark ? "☀" : "☾";

    localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
    );

});


/* =====================================================
   MOBILE MENU
===================================================== */

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    body.classList.toggle("no-scroll");

});


/* Close mobile menu */

document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            body.classList.remove("no-scroll");

        });

    });


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   NAVBAR SCROLL
===================================================== */

function updateNavbar() {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


/* =====================================================
   SCROLL PROGRESS
===================================================== */

function updateProgress() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        (scrollTop / documentHeight) * 100;

    scrollProgress.style.width =
        percentage + "%";

}


/* =====================================================
   PROJECT SHOWCASE
===================================================== */

const projectObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    showcaseProjects.forEach(project => {

                        project.classList.remove("visible");

                    });

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.55
        }
    );


showcaseProjects.forEach(project => {

    projectObserver.observe(project);

});


/* =====================================================
   PROJECT PARALLAX
===================================================== */

function projectParallax() {

    showcaseProjects.forEach(project => {

        const image =
            project.querySelector(".showcase-image img");

        if (!image) return;

        const rect =
            project.getBoundingClientRect();

        const viewport =
            window.innerHeight;

        const progress =
            (viewport - rect.top) /
            (viewport + rect.height);

        const movement =
            (progress - 0.5) * 35;

        if (
            rect.top < viewport &&
            rect.bottom > 0
        ) {

            image.style.transform =
                `scale(1.04) translateY(${movement}px)`;

        }

    });

}


/* =====================================================
   CURSOR
===================================================== */

const cursor =
    document.querySelector(".cursor");

const cursorDot =
    document.querySelector(".cursor-dot");


if (
    cursor &&
    cursorDot &&
    window.innerWidth > 900
) {

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left =
                mouseX + "px";

            cursorDot.style.top =
                mouseY + "px";

        }
    );


    function animateCursor() {

        cursorX +=
            (mouseX - cursorX) * 0.12;

        cursorY +=
            (mouseY - cursorY) * 0.12;

        cursor.style.left =
            cursorX + "px";

        cursor.style.top =
            cursorY + "px";

        requestAnimationFrame(
            animateCursor
        );

    }

    animateCursor();


    document
        .querySelectorAll("a, button")
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursor.style.width = "55px";
                    cursor.style.height = "55px";

                    cursor.style.background =
                        "rgba(0,113,227,.08)";

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.style.width = "35px";
                    cursor.style.height = "35px";

                    cursor.style.background =
                        "transparent";

                }
            );

        });

}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) return;

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =====================================================
   SCROLL EVENT
===================================================== */

let ticking = false;

window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            window.requestAnimationFrame(
                () => {

                    updateNavbar();

                    updateProgress();

                    projectParallax();

                    ticking = false;

                }
            );

            ticking = true;

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

updateNavbar();

updateProgress();

projectParallax();
/* =========================================
   APPLE STYLE PAGE TRANSITION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
       Tandai link sebagai BACK
       kalau menuju portfolio
    */

    document.querySelectorAll("a[href]").forEach(link => {

        link.addEventListener("click", () => {

            const href = link.getAttribute("href");

            if (!href) return;


            /*
               Kalau menuju halaman portfolio,
               gunakan arah sebaliknya
            */

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
/* =========================================
   PROJECT SCROLL REVEAL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const projects = document.querySelectorAll(
        ".showcase-project.project-reveal"
    );

    if (!projects.length) return;


    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    projects.forEach(project => {
        observer.observe(project);
    });

});