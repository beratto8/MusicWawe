// =====================================================
// MUSICWAVE JAVASCRIPT
// FULL VERSION
// =====================================================


// =====================================================
// ŞARKILAR
// =====================================================

const songs = [

    // 01
    {
        name: "Believer",
        artist: "Imagine Dragons",
        image: "images/believer.jpg",
        audio: "music/believer.mp3",
        plays: 0
    },

    // 02
    {
        name: "Shape Of You",
        artist: "Ed Sheeran",
        image: "images/shape.jpg",
        audio: "music/shape.mp3",
        plays: 0
    },

    // 03
    {
        name: "Blinding Lights",
        artist: "The Weeknd",
        image: "images/blinding.jpg",
        audio: "music/blinding.mp3",
        plays: 0
    },

    // 04
    {
        name: "Lovely",
        artist: "Billie Eilish",
        image: "images/lovely.jpg",
        audio: "music/lovely.mp3",
        plays: 0
    },

    // 05
    {
        name: "Faded",
        artist: "Alan Walker",
        image: "images/faded.jpg",
        audio: "music/faded.mp3",
        plays: 0
    },

    // 06
    {
        name: "Animals",
        artist: "Maroon 5",
        image: "images/animals.jpg",
        audio: "music/animals.mp3",
        plays: 0
    },

    // 07
    {
        name: "Moonlight",
        artist: "XXXTentacion",
        image: "images/moonlight.jpg",
        audio: "music/moonlight.mp3",
        plays: 0
    },

    // 08
    {
        name: "Beat It",
        artist: "Michael Jackson",
        image: "images/michael.jpg",
        audio: "music/michael.mp3",
        plays: 0
    },

    // 09
    {
        name: "Rockstar",
        artist: "Deha",
        image: "images/deha.jpg",
        audio: "music/deha.mp3",
        plays: 0
    }

];


// =====================================================
// ELEMENTLER
// =====================================================

const audioPlayer = document.getElementById("audioPlayer");

const songGrid = document.getElementById("songGrid");

const recentSongs = document.getElementById("recentSongs");

const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

const searchResults = document.getElementById("searchResults");

const searchGrid = document.getElementById("searchGrid");

const player = document.getElementById("player");

const openPlayer = document.getElementById("openPlayer");

const closePlayer = document.getElementById("closePlayer");

const playerImage = document.getElementById("playerImage");

const musicName = document.getElementById("musicName");

const artistName = document.getElementById("artistName");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const shuffleBtn = document.getElementById("shuffle");

const repeatBtn = document.getElementById("repeat");

const settingsPanel = document.getElementById("settingsPanel");

const closeSettings = document.getElementById("closeSettings");

const darkMode = document.getElementById("darkMode");

const lightMode = document.getElementById("lightMode");

const settingsBtn = document.getElementById("settingsBtn");

const mobileHome = document.getElementById("mobileHome");


// =====================================================
// PLAYER DEĞİŞKENLERİ
// =====================================================

let currentSong = 0;

let shuffleMode = false;

let repeatMode = false;

let counted = false;


// =====================================================
// LOCAL STORAGE
// =====================================================

let history =
    JSON.parse(localStorage.getItem("history")) || [];


let stats =
    JSON.parse(localStorage.getItem("stats")) || {
        total: 0,
        time: 0
    };


// =====================================================
// ESKİ VERİLERLE UYUMLULUK
// =====================================================

let savedPlays =
    JSON.parse(localStorage.getItem("songPlays")) || {};


// Şarkıların play sayılarını yükle

songs.forEach((song, index) => {

    if (savedPlays[index]) {

        song.plays = savedPlays[index];

    }

});


// =====================================================
// VERİ KAYDET
// =====================================================

function saveData() {

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    localStorage.setItem(
        "stats",
        JSON.stringify(stats)
    );

    const playData = {};

    songs.forEach((song, index) => {

        playData[index] = song.plays;

    });

    localStorage.setItem(
        "songPlays",
        JSON.stringify(playData)
    );

}


// =====================================================
// GÜVENLİ TEXT
// =====================================================

function escapeHTML(text) {

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =====================================================
// ŞARKI KARTI
// =====================================================

function createSongCard(song, index) {

    return `

        <div class="song-card">

            <div class="trend-badge">
                MUSIC
            </div>

            <img
                src="${song.image}"
                alt="${escapeHTML(song.name)}"
                loading="lazy"
            >

            <h3>
                ${escapeHTML(song.name)}
            </h3>

            <p>
                ${escapeHTML(song.artist)}
            </p>

            <button
                class="play-btn"
                onclick="playSelected(${index})"
            >
                ▶ Dinle
            </button>

        </div>

    `;

}


// =====================================================
// TREND ŞARKILARI
// =====================================================

function renderSongs() {

    if (!songGrid) return;

    songGrid.innerHTML = "";

    songs.forEach((song, index) => {

        songGrid.innerHTML +=
            createSongCard(song, index);

    });

}


// =====================================================
// ŞARKI SEÇ
// =====================================================

function playSelected(index) {

    if (!songs[index]) return;

    currentSong = index;

    counted = false;

    loadSong(index);

    showPlayer();

    playSong();

    addHistory(index);

}


// =====================================================
// ŞARKI YÜKLE
// =====================================================

function loadSong(index) {

    const song = songs[index];

    if (!song) return;

    musicName.textContent =
        song.name;

    artistName.textContent =
        song.artist;

    playerImage.src =
        song.image;

    playerImage.onerror = function () {

        this.onerror = null;

        this.src = "images/default.jpg";

    };

    audioPlayer.src =
        song.audio;

    audioPlayer.load();

}


// =====================================================
// PLAYER GÖSTER
// =====================================================

function showPlayer() {

    if (!player) return;

    player.style.display = "flex";

    player.classList.remove("closed");

    if (closePlayer) {

        closePlayer.style.display = "block";

    }

    if (openPlayer) {

        openPlayer.style.display = "none";

    }

}


// =====================================================
// PLAYER GİZLE
// =====================================================

function hidePlayer() {

    if (!player) return;

    player.classList.add("closed");

    if (closePlayer) {

        closePlayer.style.display = "none";

    }

    if (openPlayer) {

        openPlayer.style.display = "block";

    }

}


// =====================================================
// PLAYER AÇ
// =====================================================

function openPlayerPanel() {

    if (!player) return;

    player.classList.remove("closed");

    if (openPlayer) {

        openPlayer.style.display = "none";

    }

    if (closePlayer) {

        closePlayer.style.display = "block";

    }

}


// =====================================================
// MÜZİK ÇAL
// =====================================================

function playSong() {

    if (!audioPlayer.src) {

        loadSong(currentSong);

    }

    showPlayer();

    const playPromise =
        audioPlayer.play();

    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                updatePlayButton();

                console.log(
                    "Çalıyor:",
                    songs[currentSong].name
                );

            })
            .catch(error => {

                console.log(
                    "Müzik başlatılamadı:",
                    error
                );

            });

    }

}


// =====================================================
// MÜZİK DURDUR
// =====================================================

function pauseSong() {

    audioPlayer.pause();

    updatePlayButton();

}


// =====================================================
// PLAY / PAUSE
// =====================================================

function togglePlay() {

    if (audioPlayer.paused) {

        playSong();

    } else {

        pauseSong();

    }

}


// =====================================================
// PLAY BUTONU GÖRÜNÜMÜ
// =====================================================

function updatePlayButton() {

    const playBtn =
        document.getElementById("play");

    const pauseBtn =
        document.getElementById("pause");

    if (!playBtn || !pauseBtn) return;

    if (audioPlayer.paused) {

        playBtn.style.display = "inline-flex";

        pauseBtn.style.display = "none";

    } else {

        playBtn.style.display = "none";

        pauseBtn.style.display = "inline-flex";

    }

}


// =====================================================
// SONRAKİ ŞARKI
// =====================================================

function nextSong() {

    if (songs.length === 0) return;

    if (shuffleMode) {

        let nextIndex;

        do {

            nextIndex =
                Math.floor(
                    Math.random() * songs.length
                );

        } while (
            songs.length > 1 &&
            nextIndex === currentSong
        );

        currentSong = nextIndex;

    } else {

        currentSong++;

        if (currentSong >= songs.length) {

            currentSong = 0;

        }

    }

    counted = false;

    loadSong(currentSong);

    showPlayer();

    playSong();

    addHistory(currentSong);

}


// =====================================================
// ÖNCEKİ ŞARKI
// =====================================================

function previousSong() {

    if (songs.length === 0) return;

    currentSong--;

    if (currentSong < 0) {

        currentSong =
            songs.length - 1;

    }

    counted = false;

    loadSong(currentSong);

    showPlayer();

    playSong();

    addHistory(currentSong);

}


// =====================================================
// PLAY BUTTON
// =====================================================

const playButton =
    document.getElementById("play");

if (playButton) {

    playButton.onclick = () => {

        togglePlay();

    };

}


// =====================================================
// PAUSE BUTTON
// =====================================================

const pauseButton =
    document.getElementById("pause");

if (pauseButton) {

    pauseButton.onclick = () => {

        pauseSong();

    };

}


// =====================================================
// NEXT BUTTON
// =====================================================

const nextButton =
    document.getElementById("next");

if (nextButton) {

    nextButton.onclick = () => {

        nextSong();

    };

}


// =====================================================
// PREVIOUS BUTTON
// =====================================================

const previousButton =
    document.getElementById("prev");

if (previousButton) {

    previousButton.onclick = () => {

        previousSong();

    };

}


// =====================================================
// PLAYER KAPAT
// =====================================================

if (closePlayer) {

    closePlayer.onclick = () => {

        hidePlayer();

    };

}


// =====================================================
// PLAYER AÇ
// =====================================================

if (openPlayer) {

    openPlayer.onclick = () => {

        openPlayerPanel();

    };

}


// =====================================================
// GEÇMİŞE EKLE
// =====================================================

function addHistory(index) {

    if (!songs[index]) return;

    history =
        history.filter(
            item => item !== index
        );

    history.unshift(index);

    history =
        history.slice(0, 6);

    saveData();

    renderRecent();

}


// =====================================================
// SON DİNLENENLER
// =====================================================

function renderRecent() {

    if (!recentSongs) return;

    recentSongs.innerHTML = "";

    if (history.length === 0) {

        recentSongs.innerHTML = `

            <div class="empty-card">

                Henüz müzik dinlemedin 🎧

            </div>

        `;

        return;

    }

    history.forEach(index => {

        if (songs[index]) {

            recentSongs.innerHTML +=
                createSongCard(
                    songs[index],
                    index
                );

        }

    });

}


// =====================================================
// TOP 10
// =====================================================

function renderTop() {

    const topSongs =
        document.getElementById("topSongs");

    if (!topSongs) return;

    topSongs.innerHTML = "";

    const sorted =
        [...songs]
            .sort(
                (a, b) =>
                    b.plays - a.plays
            )
            .slice(0, 10);

    sorted.forEach((song, index) => {

        const realIndex =
            songs.indexOf(song);

        topSongs.innerHTML += `

            <div class="playlist-item">

                <span>
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <p>
                    ${escapeHTML(song.name)}
                </p>

                <button
                    onclick="playSelected(${realIndex})"
                >
                    ▶
                </button>

            </div>

        `;

    });

}


// =====================================================
// İSTATİSTİK SAYACI
// =====================================================

audioPlayer.addEventListener(
    "timeupdate",
    () => {

        if (!audioPlayer.duration) return;

        const percent =
            (
                audioPlayer.currentTime /
                audioPlayer.duration
            ) * 100;


        // Şarkının %50'si dinlendiyse
        // 1 dinleme olarak say

        if (
            percent >= 50 &&
            !counted
        ) {

            songs[currentSong].plays++;

            stats.total++;

            stats.time +=
                Math.floor(
                    audioPlayer.duration
                );

            counted = true;

            saveData();

            renderTop();

            updateStats();

        }

    }
);


// =====================================================
// PLAY EVENT
// =====================================================

audioPlayer.addEventListener(
    "play",
    () => {

        showPlayer();

        updatePlayButton();

    }
);


// =====================================================
// PAUSE EVENT
// =====================================================

audioPlayer.addEventListener(
    "pause",
    () => {

        updatePlayButton();

    }
);


// =====================================================
// PLAYING EVENT
// =====================================================

audioPlayer.addEventListener(
    "playing",
    () => {

        showPlayer();

        updatePlayButton();

    }
);


// =====================================================
// ŞARKI BİTİNCE
// =====================================================

audioPlayer.addEventListener(
    "ended",
    () => {

        updatePlayButton();

        if (repeatMode) {

            counted = false;

            audioPlayer.currentTime = 0;

            playSong();

            return;

        }

        nextSong();

    }
);


// =====================================================
// İSTATİSTİKLER
// =====================================================

function updateStats() {

    const totalSongs =
        document.getElementById("totalSongs");

    const totalTime =
        document.getElementById("totalTime");

    const mostPlayed =
        document.getElementById("mostPlayed");


    if (totalSongs) {

        totalSongs.textContent =
            stats.total;

    }


    if (totalTime) {

        totalTime.textContent =
            Math.floor(
                stats.time / 60
            );

    }


    const best =
        [...songs]
            .sort(
                (a, b) =>
                    b.plays - a.plays
            )[0];


    if (
        best &&
        mostPlayed
    ) {

        mostPlayed.textContent =
            best.plays > 0
                ? best.name
                : "Yok";

    }

}


// =====================================================
// ARAMA
// =====================================================

function searchSongs() {

    if (!searchInput) return;

    const value =
        searchInput.value
            .toLowerCase()
            .trim();


    if (value === "") {

        goHome();

        return;

    }


    if (searchResults) {

        searchResults.style.display =
            "block";

    }


    const sections = [
        "heroSection",
        "songsSection",
        "statsSection",
        "recentSection",
        "topSection"
    ];


    sections.forEach(id => {

        const section =
            document.getElementById(id);

        if (section) {

            section.style.display =
                "none";

        }

    });


    if (searchGrid) {

        searchGrid.innerHTML = "";

    }


    const results =
        songs.filter(song => {

            return (

                song.name
                    .toLowerCase()
                    .includes(value)

                ||

                song.artist
                    .toLowerCase()
                    .includes(value)

            );

        });


    const noResults =
        document.getElementById(
            "noResults"
        );


    if (results.length === 0) {

        if (noResults) {

            noResults.style.display =
                "block";

        }

        return;

    }


    if (noResults) {

        noResults.style.display =
            "none";

    }


    results.forEach(song => {

        const index =
            songs.indexOf(song);

        if (searchGrid) {

            searchGrid.innerHTML +=
                createSongCard(
                    song,
                    index
                );

        }

    });

}


// =====================================================
// SEARCH BUTTON
// =====================================================

if (searchBtn) {

    searchBtn.onclick = () => {

        searchSongs();

    };

}


// =====================================================
// ENTER İLE ARAMA
// =====================================================

if (searchInput) {

    searchInput.addEventListener(
        "
