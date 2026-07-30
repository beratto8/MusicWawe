const songs = [

{
name:"Believer",
artist:"Imagine Dragons",
image:"images/believer.jpg",
audio:"music/believer.mp3",
plays:0
},

{
name:"Shape Of You",
artist:"Ed Sheeran",
image:"images/shape.jpg",
audio:"music/shape.mp3",
plays:0
},

{
name:"Blinding Lights",
artist:"The Weeknd",
image:"images/blinding.jpg",
audio:"music/blinding.mp3",
plays:0
},

{
name:"Lovely",
artist:"Billie Eilish",
image:"images/lovely.jpg",
audio:"music/lovely.mp3",
plays:0
},

{
name:"Faded",
artist:"Alan Walker",
image:"images/faded.jpg",
audio:"music/faded.mp3",
plays:0
},

{
name:"Animals",
artist:"Maroon 5",
image:"images/animals.jpg",
audio:"music/animals.mp3",
plays:0
}

];





// HTML ELEMANLARI


const audio =
document.getElementById("audioPlayer");


const songGrid =
document.getElementById("songGrid");


const topSongs =
document.getElementById("topSongs");


const recentSongs =
document.getElementById("recentSongs");


const searchGrid =
document.getElementById("searchGrid");



const player =
document.getElementById("player");



const playerImage =
document.getElementById("playerImage");


const musicName =
document.getElementById("musicName");


const artistName =
document.getElementById("artistName");


const playBtn =
document.getElementById("play");


const pauseBtn =
document.getElementById("pause");


const nextBtn =
document.getElementById("next");


const prevBtn =
document.getElementById("prev");


const progress =
document.getElementById("progress");


const volume =
document.getElementById("volume");



let currentSong = 0;


let shuffle = false;


let repeat = false;



let history =
JSON.parse(localStorage.getItem("history")) || [];



let stats =
JSON.parse(localStorage.getItem("stats")) || {};




function saveData(){

localStorage.setItem(
"history",
JSON.stringify(history)
);


localStorage.setItem(
"stats",
JSON.stringify(stats)
);

}

// ŞARKI KARTI OLUŞTURMA

function createCard(song,index){


return `

<div class="song-card">


<img src="${song.image}">


<h3>${song.name}</h3>


<p>${song.artist}</p>



<button class="play-btn" onclick="playSelected(${index})">

▶ Dinle

</button>



</div>

`;

}




// TÜM ŞARKILARI GÖSTER

function renderSongs(){


songGrid.innerHTML="";


songs.forEach((song,index)=>{


songGrid.innerHTML +=
createCard(song,index);


});


}





// ŞARKI ÇALMA

function playSelected(index){


currentSong=index;


loadSong(index);


playSong();


addHistory(index);


}





// PLAYER'A ŞARKI YÜKLEME

function loadSong(index){


let song=songs[index];


musicName.textContent=
song.name;


artistName.textContent=
song.artist;


playerImage.src=
song.image;


audio.src=
song.audio;


audio.load();


}





// OYNAT

function playSong(){


audio.play()
.then(()=>{


console.log(
"Çalıyor:",
songs[currentSong].name
);


})
.catch(()=>{


console.log(
"Müzik dosyası bulunamadı"
);


});


}




// DURDUR

function pauseSong(){

audio.pause();

}





// SONRAKİ

function nextSong(){


if(shuffle){


currentSong =
Math.floor(
Math.random()*songs.length
);


}

else{


currentSong++;


if(currentSong>=songs.length){

currentSong=0;

}


}



loadSong(currentSong);

playSong();

addHistory(currentSong);


}





// ÖNCEKİ

function previousSong(){


currentSong--;


if(currentSong<0){

currentSong=songs.length-1;

}


loadSong(currentSong);

playSong();


}







// GEÇMİŞ KAYDI


function addHistory(index){


history.unshift(index);



history =
[...new Set(history)];



history =
history.slice(0,10);



saveData();


renderRecent();


}





// SON DİNLENENLER


function renderRecent(){


recentSongs.innerHTML="";



history.forEach(index=>{


recentSongs.innerHTML +=
createCard(
songs[index],
index
);


});


}







// EN ÇOK DİNLENENLER


function renderTop(){


let sorted =
[...songs].sort(
(a,b)=>b.plays-a.plays
);



topSongs.innerHTML="";



sorted.slice(0,10)
.forEach(song=>{


let index =
songs.indexOf(song);


topSongs.innerHTML +=
createCard(
song,
index
);


});


}

// DİNLENME SAYACI

let counted = false;


audio.addEventListener(
"timeupdate",
()=>{


if(!audio.duration) return;



// Şarkının %50'si dinlenirse say

let percent =
(audio.currentTime / audio.duration) * 100;



if(percent >= 50 && !counted){


songs[currentSong].plays++;


stats.totalSongs =
(stats.totalSongs || 0) + 1;



stats.totalTime =
(stats.totalTime || 0) +
Math.floor(audio.currentTime);



saveData();


renderTop();


updateStats();



counted=true;


}


});





audio.addEventListener(
"play",
()=>{


counted=false;


});








// PLAYER BUTONLARI



playBtn.onclick=()=>{


playSong();


};



pauseBtn.onclick=()=>{


pauseSong();


};




nextBtn.onclick=()=>{


nextSong();


};




prevBtn.onclick=()=>{


previousSong();


};








// SÜRE GÖSTERGESİ



audio.addEventListener(
"timeupdate",
()=>{


if(audio.duration){


progress.value =
(audio.currentTime /
audio.duration)*100;



document.getElementById(
"currentTime"
).textContent =
formatTime(
audio.currentTime
);



document.getElementById(
"duration"
).textContent =
formatTime(
audio.duration
);



}



});







progress.oninput=()=>{


audio.currentTime =
(progress.value/100) *
audio.duration;


};








function formatTime(time){


if(isNaN(time))
return "0:00";



let min =
Math.floor(time/60);



let sec =
Math.floor(time%60);



if(sec<10)

sec="0"+sec;



return min+":"+sec;


}








// SES



volume.oninput=()=>{


audio.volume =
volume.value/100;



localStorage.setItem(
"volume",
volume.value
);


};




let savedVolume =
localStorage.getItem("volume");



if(savedVolume){


volume.value =
savedVolume;



audio.volume =
savedVolume/100;


}








// SHUFFLE


document.getElementById(
"shuffle"
).onclick=()=>{


shuffle=!shuffle;



document.getElementById(
"shuffle"
).classList.toggle(
"active",
shuffle
);



if(shuffle){

repeat=false;


document.getElementById(
"repeat"
).classList.remove(
"active"
);


}


};







// REPEAT


document.getElementById(
"repeat"
).onclick=()=>{


repeat=!repeat;



document.getElementById(
"repeat"
).classList.toggle(
"active",
repeat
);



if(repeat){


shuffle=false;



document.getElementById(
"shuffle"
).classList.remove(
"active"
);



}



};








// ŞARKI BİTİNCE



audio.addEventListener(
"ended",
()=>{


if(repeat){


audio.currentTime=0;


playSong();


}

else{


nextSong();


}


});









// İSTATİSTİKLER



function updateStats(){



document.getElementById(
"totalSongs"
).textContent =
stats.totalSongs || 0;



let minutes =
Math.floor(
(stats.totalTime||0)/60
);



document.getElementById(
"totalTime"
).textContent =
minutes+" dk";



let most =
[...songs].sort(
(a,b)=>b.plays-a.plays
)[0];



document.getElementById(
"mostPlayed"
).textContent =
most.name;


}

  // ARAMA SİSTEMİ


const searchInput =
document.getElementById("searchInput");


const searchBtn =
document.getElementById("searchBtn");


const searchResults =
document.getElementById("searchResults");


const songsSection =
document.getElementById("songsSection");


const topSection =
document.getElementById("topSection");


const heroSection =
document.getElementById("heroSection");



function searchSongs(){


let value =
searchInput.value
.toLowerCase()
.trim();



if(value==="") return;




songsSection.style.display="none";

topSection.style.display="none";

heroSection.style.display="none";

searchResults.style.display="block";



searchGrid.innerHTML="";



let results =
songs.filter(song=>

song.name.toLowerCase()
.includes(value)

||

song.artist.toLowerCase()
.includes(value)

);




if(results.length===0){


document.getElementById(
"noResults"
).style.display="block";


return;


}



document.getElementById(
"noResults"
).style.display="none";



results.forEach(song=>{


let index =
songs.indexOf(song);



searchGrid.innerHTML +=
createCard(song,index);



});



}




searchBtn.onclick=()=>{


searchSongs();


};



searchInput.addEventListener(
"keyup",
(e)=>{


if(e.key==="Enter"){

searchSongs();

}


});







// ANA SAYFAYA DÖN



function goHome(){


searchInput.value="";


searchResults.style.display="none";


songsSection.style.display="block";

topSection.style.display="block";

heroSection.style.display="flex";


renderSongs();


renderTop();


}



document.getElementById(
"backHome"
).onclick=goHome;



document.getElementById(
"homeLogo"
).onclick=goHome;


document.getElementById(
"homeBtn"
).onclick=goHome;







// PLAYER AÇ KAPA



const closePlayer =
document.getElementById("closePlayer");


const openPlayer =
document.getElementById("openPlayer");



closePlayer.onclick=()=>{


player.classList.add(
"closed"
);


};



openPlayer.onclick=()=>{


player.classList.remove(
"closed"
);


};







// AYARLAR



const settingsPanel =
document.getElementById(
"settingsPanel"
);



document.getElementById(
"settingsBtn"
).onclick=()=>{


settingsPanel.classList.add(
"show"
);


};



document.getElementById(
"closeSettings"
).onclick=()=>{


settingsPanel.classList.remove(
"show"
);


};







// DARK MODE



const darkMode =
document.getElementById(
"darkMode"
);



darkMode.onchange=()=>{


if(darkMode.checked){


document.body.classList.remove(
"light"
);


localStorage.setItem(
"theme",
"dark"
);


}

else{


document.body.classList.add(
"light"
);


localStorage.setItem(
"theme",
"light"
);


}



};







document.getElementById(
"lightMode"
).onclick=()=>{


darkMode.checked=false;


document.body.classList.add(
"light"
);


localStorage.setItem(
"theme",
"light"
);


};







// KAYITLI TEMA



if(
localStorage.getItem("theme")
==="light"
){


document.body.classList.add(
"light"
);


darkMode.checked=false;


}









// KLAVYE KONTROLLERİ



document.addEventListener(
"keydown",
(e)=>{


if(e.code==="Space"){


e.preventDefault();


if(audio.paused)

playSong();

else

pauseSong();



}



if(e.code==="ArrowRight"){


nextSong();


}



if(e.code==="ArrowLeft"){


previousSong();


}



if(e.code==="ArrowUp"){


audio.volume =
Math.min(
1,
audio.volume+0.1
);


}



if(e.code==="ArrowDown"){


audio.volume =
Math.max(
0,
audio.volume-0.1
);


}



});









// BAŞLANGIÇ



renderSongs();


renderTop();


renderRecent();


updateStats();



loadSong(0);





console.log(
"MusicWave yeni sistem aktif"
);
