(function () {
    const video = document.getElementById('video-events');
    if (!video) return;

    const play = () => {
        const p = video.play();
        if (p && typeof p.catch === 'function') {
            p.catch(() => {
                // Autoplay may be blocked; ignore.
            });
        }
    };

    if (video.readyState >= 2) {
        play();
    } else {
        video.addEventListener('canplay', play, { once: true });
    }
})();
