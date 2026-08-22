// ======================================
// MUSICWAVE JAVASCRIPT
// ======================================


// ======================================
// ŞARKILAR
// ======================================

const songs = [

    {
        name: "Believer",
        artist: "Imagine Dragons",
        image: "images/believer.jpg",
        audio: "music/believer.mp3",
        plays: 0
    },

    {
        name: "Shape Of You",
        artist: "Ed Sheeran",
        image: "images/shape.jpg",
        audio: "music/shape.mp3",
        plays: 0
    },

    {
        name: "Blinding Lights",
        artist: "The Weeknd",
        image: "images/blinding.jpg",
        audio: "music/blinding.mp3",
        plays: 0
    },

    {
        name: "Lovely",
        artist: "Billie Eilish",
        image: "images/lovely.jpg",
        audio: "music/lovely.mp3",
        plays: 0
    },

    {
        name: "Faded",
        artist: "Alan Walker",
        image: "images/faded.jpg",
        audio: "music/faded.mp3",
        plays: 0
    },

    {
        name: "Animals",
        artist: "Maroon 5",
        image: "images/animals.jpg",
        audio: "music/animals.mp3",
        plays: 0
    },

    // ======================================
    // YENİ ŞARKILAR
    // ======================================

    {
        name: "Moonlight",
        artist: "XXXTENTACION",
        image: "images/moonlight.jpg",
        audio: "music/moonlight.mp3",
        plays: 0
    },

    {
        name: "Beat It",
        artist: "Michael Jackson",
        image: "images/michael.jpg",
        audio: "music/michael.mp3",
        plays: 0
    },

    {
        name: "Rockstar",
        artist: "Deha Inc.",
        image: "images/deha.jpg",
        audio: "music/deha.mp3",
        plays: 0
    }

];


// ======================================
// ELEMENTLER
// ======================================

const audioPlayer =
    document.getElementById("audioPlayer");

const songGrid =
    document.getElementById("songGrid");

const recentSongs =
    document.getElementById("recentSongs");

const searchInput =
    document.getElementById("searchInput");

const searchBtn =
    document.getElementById("searchBtn");

const searchResults =
    document.getElementById("searchResults");

const searchGrid =
    document.getElementById("searchGrid");

const player =
    document.getElementById("player");

const openPlayer =
    document.getElementById("openPlayer");

const closePlayer =
    document.getElementById("closePlayer");

const playerImage =
    document.getElementById("playerImage");

const musicName =
    document.getElementById("musicName");

const artistName =
    document.getElementById("artistName");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const shuffleBtn =
    document.getElementById("shuffle");

const repeatBtn =
    document.getElementById("repeat");


// ======================================
// DEĞİŞKENLER
// ======================================

let currentSong = 0;

let history =
    JSON.parse(localStorage.getItem("history")) || [];

let stats =
    JSON.parse(localStorage.getItem("stats")) || {
        total: 0,
        time: 0
    };

let shuffleMode = false;

let repeatMode = false;

let counted = false;


// ======================================
// VERİ KAYDET
// ======================================

function saveData() {

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    localStorage.setItem(
        "stats",
        JSON.stringify(stats)
    );

}


// ======================================
// ŞARKI KARTI
// ======================================

function createSongCard(song, index) {

    return `

        <div class="song-card">

            <img src="${song.image}">

            <h3>
                ${song.name}
            </h3>

            <p>
                ${song.artist}
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


// ======================================
// TREND ŞARKILARI YÜKLE
// ======================================

function renderSongs() {

    if (!songGrid)
        return;

    songGrid.innerHTML = "";

    songs.forEach((song, index) => {

        songGrid.innerHTML +=
            createSongCard(song, index);

    });

}


// ======================================
// ŞARKI SEÇ
// ======================================

function playSelected(index) {

    if (!songs[index])
        return;

    currentSong = index;

    loadSong(index);

    player.style.display = "flex";

    player.classList.remove("closed");

    if (openPlayer) {

        openPlayer.classList.remove("show");
        openPlayer.style.display = "none";

    }

    if (closePlayer) {

        closePlayer.style.display = "block";

    }

    playSong();

    addHistory(index);

}


// ======================================
// ŞARKI YÜKLE
// ======================================

function loadSong(index) {

    const song = songs[index];

    if (!song)
        return;

    musicName.textContent =
        song.name;

    artistName.textContent =
        song.artist;

    playerImage.src =
        song.image;

    audioPlayer.src =
        song.audio;

    audioPlayer.load();

    counted = false;

}


// ======================================
// ÇAL
// ======================================

function playSong() {

    if (!songs[currentSong])
        return;

    audioPlayer.play()
        .then(() => {

            console.log(
                "Çalıyor:",
                songs[currentSong].name
            );

        })
        .catch((error) => {

            console.log(
                "Dosya bulunamadı veya oynatılamadı:",
                songs[currentSong].audio
            );

            console.log(error);

        });

}


// ======================================
// DURDUR
// ======================================

function pauseSong() {

    audioPlayer.pause();

}


// ======================================
// SONRAKİ ŞARKI
// ======================================

function nextSong() {

    if (songs.length === 0)
        return;

    if (shuffleMode) {

        currentSong =
            Math.floor(
                Math.random() * songs.length
            );

    }
    else {

        currentSong++;

        if (currentSong >= songs.length) {

            currentSong = 0;

        }

    }

    loadSong(currentSong);

    playSong();

    addHistory(currentSong);

}


// ======================================
// ÖNCEKİ ŞARKI
// ======================================

function previousSong() {

    if (songs.length === 0)
        return;

    currentSong--;

    if (currentSong < 0) {

        currentSong =
            songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

    addHistory(currentSong);

}


// ======================================
// PLAYER BUTONLARI
// ======================================

document
    .getElementById("play")
    .onclick = () => {

        playSong();

    };


document
    .getElementById("pause")
    .onclick = () => {

        pauseSong();

    };


document
    .getElementById("next")
    .onclick = () => {

        nextSong();

    };


document
    .getElementById("prev")
    .onclick = () => {

        previousSong();

    };


// ======================================
// SON DİNLENENLERE EKLE
// ======================================

function addHistory(index) {

    if (!songs[index])
        return;

    history.unshift(index);

    history = [
        ...new Set(history)
    ];

    history = history.slice(0, 3);

    saveData();

    renderRecent();

}


// ======================================
// SON DİNLENENLERİ GÖSTER
// ======================================

function renderRecent() {

    if (!recentSongs)
        return;

    recentSongs.innerHTML = "";

    history.forEach(index => {

        if (!songs[index])
            return;

        recentSongs.innerHTML +=
            createSongCard(
                songs[index],
                index
            );

    });

}


// ======================================
// İLK 10
// ======================================

function renderTop() {

    const topSongs =
        document.getElementById("topSongs");

    if (!topSongs)
        return;

    topSongs.innerHTML = "";

    let sorted =
        [...songs].sort(
            (a, b) => b.plays - a.plays
        );

    sorted
        .slice(0, 10)
        .forEach((song, index) => {

            let realIndex =
                songs.indexOf(song);

            topSongs.innerHTML += `

                <div class="playlist-item">

                    <span>
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                    <p>
                        ${song.name}
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


// ======================================
// DİNLENME SAYACI
// ======================================

audioPlayer.addEventListener(
    "timeupdate",
    () => {

        if (!audioPlayer.duration)
            return;

        let percent =
            (
                audioPlayer.currentTime /
                audioPlayer.duration
            ) * 100;

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

            saveData();

            renderTop();

            updateStats();

            counted = true;

        }

    }
);


// ======================================
// PLAY EVENT
// ======================================

audioPlayer.addEventListener(
    "play",
    () => {

        player.style.display = "flex";

        player.classList.remove("closed");

        counted = false;

    }
);


// ======================================
// İSTATİSTİKLER
// ======================================

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


    let best =
        [...songs].sort(
            (a, b) => b.plays - a.plays
        )[0];


    if (
        best &&
        mostPlayed
    ) {

        if (best.plays > 0) {

            mostPlayed.textContent =
                best.name;

        }
        else {

            mostPlayed.textContent =
                "Yok";

        }

    }

}


// ======================================
// ARAMA
// ======================================

function searchSongs() {

    let value =
        searchInput.value
            .toLowerCase()
            .trim();


    if (value === "") {

        goHome();

        return;

    }


    searchResults.style.display =
        "block";


    document
        .getElementById("heroSection")
        .style.display = "none";


    document
        .getElementById("songsSection")
        .style.display = "none";


    document
        .getElementById("statsSection")
        .style.display = "none";


    document
        .getElementById("recentSection")
        .style.display = "none";


    document
        .getElementById("topSection")
        .style.display = "none";


    searchGrid.innerHTML = "";


    let results =
        songs.filter(song =>

            song.name
                .toLowerCase()
                .includes(value)

            ||

            song.artist
                .toLowerCase()
                .includes(value)

        );


    if (results.length === 0) {

        searchGrid.innerHTML = "";

        document
            .getElementById("noResults")
            .style.display = "block";

        return;

    }


    document
        .getElementById("noResults")
        .style.display = "none";


    results.forEach(song => {

        let index =
            songs.indexOf(song);

        searchGrid.innerHTML +=
            createSongCard(
                song,
                index
            );

    });

}


// ======================================
// ARAMA BUTONU
// ======================================

searchBtn.onclick = () => {

    searchSongs();

};


// ======================================
// ENTER İLE ARAMA
// ======================================

searchInput.addEventListener(
    "keyup",
    (e) => {

        if (e.key === "Enter") {

            searchSongs();

        }

    }
);


// ======================================
// ANA SAYFA
// ======================================

function goHome() {

    searchInput.value = "";

    searchResults.style.display =
        "none";


    document
        .getElementById("heroSection")
        .style.display = "flex";


    document
        .getElementById("songsSection")
        .style.display = "block";


    document
        .getElementById("statsSection")
        .style.display = "block";


    document
        .getElementById("recentSection")
        .style.display = "block";


    document
        .getElementById("topSection")
        .style.display = "block";


    renderSongs();

    renderRecent();

    renderTop();

}


// ======================================
// LOGO ANA SAYFA
// ======================================

document
    .getElementById("homeLogo")
    .onclick = goHome;


// ======================================
// SIDEBAR HOME
// ======================================

document
    .getElementById("homeBtn")
    .onclick = goHome;


// ======================================
// PLAYER AÇ / KAPA
// ======================================

closePlayer.onclick = () => {

    player.classList.add("closed");

    closePlayer.style.display =
        "none";

    openPlayer.style.display =
        "block";

};


openPlayer.onclick = () => {

    player.classList.remove("closed");

    openPlayer.style.display =
        "none";

    closePlayer.style.display =
        "block";

};


// ======================================
// ZAMAN FORMAT
// ======================================

function formatTime(time) {

    if (isNaN(time))
        return "0:00";


    let min =
        Math.floor(time / 60);


    let sec =
        Math.floor(time % 60);


    if (sec < 10)
        sec = "0" + sec;


    return min + ":" + sec;

}


// ======================================
// ŞARKI SÜRESİ
// ======================================

audioPlayer.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(
                audioPlayer.duration
            );

    }
);


// ======================================
// İLERLEME
// ======================================

audioPlayer.addEventListener(
    "timeupdate",
    () => {

        if (audioPlayer.duration) {

            let percent =
                (
                    audioPlayer.currentTime /
                    audioPlayer.duration
                ) * 100;


            progress.value =
                percent;


            currentTime.textContent =
                formatTime(
                    audioPlayer.currentTime
                );


            duration.textContent =
                formatTime(
                    audioPlayer.duration
                );

        }

    }
);


// ======================================
// PROGRESS BAR
// ======================================

progress.oninput = () => {

    if (!audioPlayer.duration)
        return;

    audioPlayer.currentTime =
        (progress.value / 100) *
        audioPlayer.duration;

};


// ======================================
// SHUFFLE
// ======================================

shuffleBtn.onclick = () => {

    shuffleMode =
        !shuffleMode;

    shuffleBtn.classList.toggle(
        "active"
    );

};


// ======================================
// REPEAT
// ======================================

repeatBtn.onclick = () => {

    repeatMode =
        !repeatMode;

    repeatBtn.classList.toggle(
        "active"
    );

};


// ======================================
// ŞARKI BİTİNCE
// ======================================

audioPlayer.addEventListener(
    "ended",
    () => {

        if (repeatMode) {

            loadSong(currentSong);

            playSong();

            return;

        }


        if (shuffleMode) {

            let nextIndex;

            do {

                nextIndex =
                    Math.floor(
                        Math.random() *
                        songs.length
                    );

            }
            while (
                songs.length > 1 &&
                nextIndex === currentSong
            );

            currentSong =
                nextIndex;

        }
        else {

            currentSong++;

            if (
                currentSong >=
                songs.length
            ) {

                currentSong = 0;

            }

        }


        loadSong(currentSong);

        playSong();

        addHistory(currentSong);

    }
);


// ======================================
// AYARLAR
// ======================================

const settingsPanel =
    document.getElementById(
        "settingsPanel"
    );

const closeSettings =
    document.getElementById(
        "closeSettings"
    );

const darkMode =
    document.getElementById(
        "darkMode"
    );

const lightMode =
    document.getElementById(
        "lightMode"
    );

const settingsBtn =
    document.getElementById(
        "settingsBtn"
    );


// ======================================
// AYARLAR BUTONU
// ======================================

if (settingsBtn) {

    settingsBtn.onclick = () => {

        settingsPanel.classList.add(
            "show"
        );

    };

}


// ======================================
// AYARLAR KAPAT
// ======================================

if (closeSettings) {

    closeSettings.onclick = () => {

        settingsPanel.classList.remove(
            "show"
        );

    };

}


// ======================================
// DARK MODE
// ======================================

if (darkMode) {

    darkMode.onchange = () => {

        if (darkMode.checked) {

            document.body.classList.remove(
                "light"
            );

            localStorage.setItem(
                "theme",
                "dark"
            );

        }
        else {

            document.body.classList.add(
                "light"
            );

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    };

}


// ======================================
// LIGHT MODE BUTONU
// ======================================

if (lightMode) {

    lightMode.onclick = () => {

        document.body.classList.add(
            "light"
        );

        if (darkMode) {

            darkMode.checked =
                false;

        }

        localStorage.setItem(
            "theme",
            "light"
        );

    };

}


// ======================================
// KAYITLI TEMA
// ======================================

let savedTheme =
    localStorage.getItem(
        "theme"
    );


if (savedTheme === "light") {

    document.body.classList.add(
        "light"
    );

    if (darkMo

        // =====================================================
// EXTRA PLAYER SYSTEM
// =====================================================


// PLAY / PAUSE GÖRÜNÜMÜ

const mainPlay =
    document.getElementById("play");

const mainPause =
    document.getElementById("pause");

const playingStatus =
    document.getElementById("playingStatus");


audioPlayer.addEventListener(
    "play",
    () => {

        player.classList.add("playing");

        if (mainPlay)
            mainPlay.style.display = "none";

        if (mainPause)
            mainPause.style.display = "block";

        if (playingStatus)
            playingStatus.textContent =
                "● Şu an çalıyor";

        updatePlayingCard();

    }
);


audioPlayer.addEventListener(
    "pause",
    () => {

        player.classList.remove("playing");

        if (mainPlay)
            mainPlay.style.display = "flex";

        if (mainPause)
            mainPause.style.display = "none";

        if (playingStatus)
            playingStatus.textContent =
                "Duraklatıldı";

        updatePlayingCard();

    }
);


// =====================================================
// PLAYER AÇ / KAPA
// =====================================================

if (closePlayer) {

    closePlayer.onclick = () => {

        player.classList.add("closed");

        closePlayer.style.display =
            "none";

        openPlayer.style.display =
            "flex";

    };

}


if (openPlayer) {

    openPlayer.onclick = () => {

        player.classList.remove("closed");

        openPlayer.style.display =
            "none";

        closePlayer.style.display =
            "flex";

    };

}


// =====================================================
// SES
// =====================================================

const volumeSlider =
    document.getElementById("volume");

const muteBtn =
    document.getElementById("muteBtn");


let previousVolume = 1;


if (volumeSlider) {

    const savedVolume =
        localStorage.getItem("volume");

    if (savedVolume !== null) {

        audioPlayer.volume =
            Number(savedVolume);

        volumeSlider.value =
            savedVolume;

    }


    volumeSlider.oninput = () => {

        audioPlayer.volume =
            Number(volumeSlider.value);

        previousVolume =
            audioPlayer.volume;

        localStorage.setItem(
            "volume",
            audioPlayer.volume
        );

        updateVolumeIcon();

    };

}


function updateVolumeIcon() {

    if (!muteBtn)
        return;

    if (
        audioPlayer.muted ||
        audioPlayer.volume === 0
    ) {

        muteBtn.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';

    }
    else if (
        audioPlayer.volume < .5
    ) {

        muteBtn.innerHTML =
            '<i class="fa-solid fa-volume-low"></i>';

    }
    else {

        muteBtn.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';

    }

}


if (muteBtn) {

    muteBtn.onclick = () => {

        if (audioPlayer.muted) {

            audioPlayer.muted = false;

            audioPlayer.volume =
                previousVolume || 1;

            if (volumeSlider)
                volumeSlider.value =
                    audioPlayer.volume;

        }
        else {

            previousVolume =
                audioPlayer.volume || 1;

            audioPlayer.muted = true;

            if (volumeSlider)
                volumeSlider.value = 0;

        }

        updateVolumeIcon();

    };

}


// =====================================================
// FAVORİ SİSTEMİ
// =====================================================

const favoriteBtn =
    document.getElementById(
        "favoriteBtn"
    );


let favorites =
    JSON.parse(
        localStorage.getItem(
            "favorites"
        )
    ) || [];


function updateFavoriteButton() {

    if (!favoriteBtn)
        return;

    if (
        favorites.includes(
            currentSong
        )
    ) {

        favoriteBtn.classList.add(
            "active"
        );

        favoriteBtn.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

    }
    else {

        favoriteBtn.classList.remove(
            "active"
        );

        favoriteBtn.innerHTML =
            '<i class="fa-regular fa-heart"></i>';

    }

}


if (favoriteBtn) {

    favoriteBtn.onclick = () => {

        if (
            favorites.includes(
                currentSong
            )
        ) {

            favorites =
                favorites.filter(
                    index =>
                        index !== currentSong
                );

        }
        else {

            favorites.push(
                currentSong
            );

        }


        localStorage.setItem(
            "favorites",
            JSON.stringify(
                favorites
            )
        );


        updateFavoriteButton();

    };

}


// =====================================================
// ÇALAN ŞARKI KARTINI İŞARETLE
// =====================================================

function updatePlayingCard() {

    document
        .querySelectorAll(".song-card")
        .forEach(card => {

            card.classList.remove(
                "playing"
            );

        });


    const cards =
        document.querySelectorAll(
            ".song-card"
        );


    cards.forEach(card => {

        const button =
            card.querySelector(
                ".play-btn"
            );


        if (!button)
            return;


        const onclick =
            button.getAttribute(
                "onclick"
            );


        if (
            onclick &&
            onclick.includes(
                `playSelected(${currentSong})`
            )
        ) {

            card.classList.add(
                "playing"
            );

        }

    });

}


// =====================================================
// ŞARKI DEĞİŞİNCE FAVORİYİ GÜNCELLE
// =====================================================

const originalLoadSong =
    loadSong;


loadSong = function(index) {

    originalLoadSong(index);

    updateFavoriteButton();

    setTimeout(
        updatePlayingCard,
        50
    );

};


// =====================================================
// ŞARKI KARTLARINI YENİDEN OLUŞTURDUKTAN
// SONRA ÇALAN ŞARKIYI GÖSTER
// =====================================================

const originalRenderSongs =
    renderSongs;


renderSongs = function() {

    originalRenderSongs();

    setTimeout(
        updatePlayingCard,
        50
    );

};


const originalRenderRecent =
    renderRecent;


renderRecent = function() {

    originalRenderRecent();

    setTimeout(
        updatePlayingCard,
        50
    );

};


const originalSearchSongs =
    searchSongs;


searchSongs = function() {

    originalSearchSongs();

    setTimeout(
        updatePlayingCard,
        50
    );

};


// =====================================================
// SAYFA AÇILIŞI
// =====================================================

setTimeout(() => {

    updateFavoriteButton();

    updateVolumeIcon();

}, 100);


// =====================================================
// PLAYER KISAYOLLARI
// =====================================================

document.addEventListener(
    "keydown",
    (e) => {

        // CTRL + M = MUTE

        if (
            e.ctrlKey &&
            e.key.toLowerCase() === "m"
        ) {

            e.preventDefault();

            if (muteBtn)
                muteBtn.click();

        }


        // CTRL + RIGHT = NEXT

        if (
            e.ctrlKey &&
            e.key === "ArrowRight"
        ) {

            e.preventDefault();

            nextSong();

        }


        // CTRL + LEFT = PREVIOUS

        if (
            e.ctrlKey &&
            e.key === "ArrowLeft"
        ) {

            e.preventDefault();

            previousSong();

        }

    }
);
