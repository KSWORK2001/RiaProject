// Navigation
function goToDance(danceType) {
    window.location.href = `dance-forms/${danceType}.html`;
}

/* ---------------- MAGNETIC HOVER ---------------- */
document.querySelectorAll(".magnetic").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        card.style.transform = `
      rotateX(${(-y / 20)}deg)
      rotateY(${(x / 20)}deg)
      translateZ(12px)
    `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0)";
    });
});

/* ---------------- SCROLL REVEAL ---------------- */
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".dance-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    observer.observe(card);
});

const logo = document.querySelector(".dance-logo");

logo.addEventListener("mousemove", (e) => {
    const rect = logo.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    logo.style.transform = `
    rotateX(${(-y / 20)}deg)
    rotateY(${(x / 20)}deg)
    scale(1.05)
  `;
});

logo.addEventListener("mouseleave", () => {
    logo.style.transform = "rotateX(0) rotateY(0) scale(1)";
});

const heroTitle = document.querySelector(".hero-title");

heroTitle.addEventListener("mousemove", (e) => {
    const rect = heroTitle.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    heroTitle.style.transform = `
    rotateX(${(-y / 40)}deg)
    rotateY(${(x / 40)}deg)
  `;
});

heroTitle.addEventListener("mouseleave", () => {
    heroTitle.style.transform = "rotateX(0) rotateY(0)";
});

const videos = document.querySelectorAll(".video-bg video");
const cards = document.querySelectorAll(".dance-card");

function stopAllVideos() {
    videos.forEach((video) => {
        video.classList.remove("active");
        video.pause();
        video.currentTime = 0;
    });
}

cards.forEach((card) => {
    const videoKey = card.dataset.video;
    const video = document.getElementById(`video-${videoKey}`);

    if (!video) return;

    card.addEventListener("mouseenter", () => {
        stopAllVideos();
        video.classList.add("active");
        video.play();
    });

    card.addEventListener("mouseleave", () => {
        video.classList.remove("active");
        video.pause();
        video.currentTime = 0;
    });
});
