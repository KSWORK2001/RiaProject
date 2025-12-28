/**
 * Global playlist for the floating music widget.
 * Replace the sample entries below with your own YouTube links.
 *
 * Each entry accepts either:
 *  - A full YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID (the ID will be extracted)
 *  - Just the video ID itself.
 */
(function registerDancetopiaTracks() {
    const sampleTracks = [
        { title: 'Neo-Soul Warmup', url: 'https://www.youtube.com/watch?v=Jo_o0J3yFPM' },
        { title: 'Latin Energy Lab', url: 'https://www.youtube.com/watch?v=x7Sh-7m46Rk' },
        { title: 'Carnival Pulse', url: 'https://www.youtube.com/watch?v=9gO8tzjazQI' },
        { title: 'Temple Sunrise', url: 'https://www.youtube.com/watch?v=_a4ny6sPEqM' },
        { title: 'Contemporary Flow', url: 'https://www.youtube.com/watch?v=BeZSvjNYc70' }
    ];

    window.DANCETOPIA_TRACKS = (window.DANCETOPIA_TRACKS || sampleTracks).map((entry) => {
        if (entry.id) return entry;

        const id = extractYouTubeId(entry.url || '');
        return {
            id,
            title: entry.title || 'Dance Mix'
        };
    }).filter((track) => !!track.id);

    function extractYouTubeId(input) {
        if (!input) return null;
        if (!input.includes('youtube') && !input.includes('youtu.be')) {
            return input;
        }

        try {
            const url = new URL(input);
            if (url.hostname === 'youtu.be') {
                return url.pathname.replace('/', '');
            }
            return url.searchParams.get('v');
        } catch {
            return input;
        }
    }
})();
