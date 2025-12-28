(() => {
    if (window.__dancetopiaMusicPlayerInitialized) return;
    window.__dancetopiaMusicPlayerInitialized = true;

    const STORAGE_KEY = 'dancetopia-music-state';
    const DEFAULT_TRACKS = Array.isArray(window.DANCETOPIA_TRACKS) && window.DANCETOPIA_TRACKS.length
        ? window.DANCETOPIA_TRACKS
        : [
            { id: '5qap5aO4i9A', title: 'Lofi Hip Hop · Chillhop Radio' },
            { id: 'DWcJFNfaw9c', title: 'Chillstep Breeze · Liquid Drift' },
            { id: '7NOSDKb0HlU', title: 'Groovy Afro · Dance Marathon' },
            { id: '2OR0OCr6uRE', title: 'Latin Vibes · Endless Social' },
            { id: 'ktvTqknDobU', title: 'Thunder · Electro Momentum' }
        ];

    if (!DEFAULT_TRACKS.length) return;

    const persistedState = readPersistedState();
    let currentIndex = resolveInitialIndex(persistedState?.trackId);
    let desiredState = {
        isPlaying: false, // Always start paused
        volume: persistedState?.volume ?? 60,
        position: 0 // Always start from beginning
    };

    let player;
    let isPlayerReady = false;
    let saveInterval;
    let widget;
    let elements = {};
    let historyStack = [];
    let autoplayCheckTimer = null;

    buildWidget();
    injectYouTubeAPI();
    setupInteractionFallback();

    function buildWidget() {
        widget = document.createElement('div');
        widget.className = 'music-widget';
        widget.setAttribute('role', 'complementary');
        widget.setAttribute('aria-label', 'Global dance radio player');
        widget.innerHTML = `
            <button class="music-pill-icon" type="button" aria-label="Open dance radio">
                <span>♫</span>
                <span class="music-status-dot"></span>
            </button>
            <div class="music-panel">
                <div class="music-track-meta">
                    <p class="music-label">Now Playing</p>
                    <p class="music-title">Loading grooves…</p>
                </div>
                <div class="music-controls">
                    <button class="mw-btn mw-rewind" type="button" aria-label="Previous vibe">⏮</button>
                    <button class="mw-btn mw-play" type="button" aria-label="Play or pause mix">▶</button>
                    <button class="mw-btn mw-forward" type="button" aria-label="Next vibe">⏭</button>
                </div>
                <div class="music-volume">
                    <span class="music-volume-icon">🔊</span>
                    <input class="music-volume-slider" type="range" min="0" max="100" value="${desiredState.volume}" aria-label="Volume" />
                </div>
            </div>
            <div id="musicPlayerFrame" class="music-iframe-holder" aria-hidden="true"></div>
        `;

        document.body.appendChild(widget);

        elements = {
            title: widget.querySelector('.music-title'),
            play: widget.querySelector('.mw-play'),
            rewind: widget.querySelector('.mw-rewind'),
            forward: widget.querySelector('.mw-forward'),
            volume: widget.querySelector('.music-volume-slider'),
            statusDot: widget.querySelector('.music-status-dot'),
            toggle: widget.querySelector('.music-pill-icon')
        };

        elements.title.textContent = DEFAULT_TRACKS[currentIndex].title;
        updatePlayButton(false);
        updateVolumeIcon(desiredState.volume);

        widget.addEventListener('mouseenter', () => widget.classList.add('music-widget--hover'));
        widget.addEventListener('mouseleave', () => widget.classList.remove('music-widget--hover'));

        elements.toggle.addEventListener('click', (event) => {
            const prefersHover = window.matchMedia('(hover:hover)').matches;
            if (!prefersHover) {
                event.stopPropagation();
                widget.classList.toggle('music-widget--open');
            }
        });

        document.addEventListener('click', (event) => {
            if (!widget.contains(event.target)) {
                widget.classList.remove('music-widget--open');
            }
        });

        elements.play.addEventListener('click', togglePlayback);
        elements.rewind.addEventListener('click', playPreviousOrRestart);
        elements.forward.addEventListener('click', () => playRandomTrack(true));
        elements.volume.addEventListener('input', handleVolumeChange);
    }

    function injectYouTubeAPI() {
        if (window.YT && window.YT.Player) {
            initializePlayer();
            return;
        }

        const previous = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
            if (typeof previous === 'function') previous();
            initializePlayer();
        };

        if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.head.appendChild(tag);
        }
    }

    function initializePlayer() {
        player = new YT.Player('musicPlayerFrame', {
            height: '0',
            width: '0',
            videoId: DEFAULT_TRACKS[currentIndex].id,
            playerVars: {
                autoplay: 0,
                controls: 0,
                loop: 0,
                modestbranding: 1,
                rel: 0
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
                onError: onPlayerError
            }
        });
    }

    function onPlayerReady() {
        isPlayerReady = true;
        player.setVolume(desiredState.volume);
        
        // Always start paused - user must click to play
        loadCurrentTrack(desiredState.position, false);

        saveInterval = window.setInterval(persistState, 5000);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) persistState();
        });
        window.addEventListener('beforeunload', persistState);
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            updatePlayButton(true);
            widget.dataset.autoplay = 'allowed';
            clearAutoplayCheck();
        } else if (event.data === YT.PlayerState.PAUSED) {
            updatePlayButton(false);
        } else if (event.data === YT.PlayerState.ENDED) {
            playRandomTrack(true);
        }
    }

    function onPlayerError() {
        playRandomTrack(true);
    }

    function loadCurrentTrack(startSeconds = 0, shouldPlay = true) {
        if (!player) return;

        const track = DEFAULT_TRACKS[currentIndex];
        elements.title.textContent = track.title;

        player.loadVideoById({
            videoId: track.id,
            startSeconds
        });

        desiredState.position = startSeconds;
        desiredState.isPlaying = shouldPlay;

        if (shouldPlay) {
            attemptPlay();
        } else {
            player.pauseVideo();
        }
    }

    function playRandomTrack(autoTriggered = false) {
        if (!isPlayerReady) return;

        const nextIndex = pickRandomIndex(currentIndex);
        historyStack.push(currentIndex);
        currentIndex = nextIndex;
        loadCurrentTrack(0, autoTriggered ? true : desiredState.isPlaying);
    }

    function playPreviousOrRestart() {
        if (!isPlayerReady) return;
        if (historyStack.length > 0) {
            currentIndex = historyStack.pop();
            loadCurrentTrack(0, desiredState.isPlaying);
            return;
        }

        player.seekTo(0, true);
        if (!desiredState.isPlaying) {
            player.pauseVideo();
        }
    }

    function togglePlayback() {
        if (!isPlayerReady) return;

        const playing = player.getPlayerState() === YT.PlayerState.PLAYING;
        if (playing) {
            player.pauseVideo();
            desiredState.isPlaying = false;
        } else {
            desiredState.isPlaying = true;
            attemptPlay(true);
        }
    }

    function attemptPlay(triggeredByUser = false) {
        if (!player) return;
        try {
            player.playVideo();
            widget.dataset.autoplay = '';
            scheduleAutoplayCheck();
        } catch (error) {
            if (!triggeredByUser) {
                widget.dataset.autoplay = 'blocked';
            }
        }
    }

    function handleVolumeChange(event) {
        const value = Number(event.target.value);
        desiredState.volume = value;
        updateVolumeIcon(value);
        if (player) {
            player.setVolume(value);
        }
        persistState();
    }

    function updateVolumeIcon(value) {
        const icon = widget.querySelector('.music-volume-icon');
        if (value === 0) {
            icon.textContent = '🔇';
        } else if (value < 40) {
            icon.textContent = '🔉';
        } else {
            icon.textContent = '🔊';
        }
    }

    function updatePlayButton(isPlaying) {
        elements.play.textContent = isPlaying ? '⏸' : '▶';
        widget.dataset.playing = isPlaying ? 'true' : 'false';
    }

    function pickRandomIndex(excludeIndex) {
        if (DEFAULT_TRACKS.length === 1) return 0;
        let index = excludeIndex;
        while (index === excludeIndex) {
            index = Math.floor(Math.random() * DEFAULT_TRACKS.length);
        }
        return index;
    }

    function resolveInitialIndex(trackId) {
        if (!trackId) {
            return Math.floor(Math.random() * DEFAULT_TRACKS.length);
        }
        const idx = DEFAULT_TRACKS.findIndex((track) => track.id === trackId);
        return idx >= 0 ? idx : 0;
    }

    function readPersistedState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            return null;
        }
    }

    function persistState() {
        if (!player || !isPlayerReady) return;
        try {
            const payload = {
                trackId: DEFAULT_TRACKS[currentIndex].id,
                position: Math.floor(player.getCurrentTime()),
                volume: desiredState.volume,
                isPlaying: player.getPlayerState() === YT.PlayerState.PLAYING
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (error) {
            // no-op
        }
    }

    function setupInteractionFallback() {
        // Remove auto-kickoff - user must explicitly click play button
    }

    function scheduleAutoplayCheck() {
        clearAutoplayCheck();
        autoplayCheckTimer = window.setTimeout(() => {
            if (!player) return;
            const playing = player.getPlayerState() === YT.PlayerState.PLAYING;
            if (!playing) {
                widget.dataset.autoplay = 'blocked';
            }
        }, 1200);
    }

    function clearAutoplayCheck() {
        if (autoplayCheckTimer) {
            window.clearTimeout(autoplayCheckTimer);
            autoplayCheckTimer = null;
        }
    }
})();
