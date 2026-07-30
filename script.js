// =========================
// MUSICWAVE SCRIPT
// PART 1
// =========================



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








// ELEMANLAR


const audio =
document.getElementById("audioPlayer");



const songGrid =
document.getElementById("songGrid");



const recentSongs =
document.getElementById("recentSongs");



const topSongs =
document.getElementById("topSongs");



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





let currentSong = 0;



let shuffleMode=false;


let repeatMode=false;



let counted=false;





// KAYITLAR


let history =
JSON.parse(
localStorage.getItem("history")
)
||
[];




let stats =
JSON.parse(
localStorage.getItem("stats")
)
||
{

total:0,

time:0

};






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

// =========================
// ŞARKI KARTLARI
// =========================



function createCard(song,index){


return `

<div class="song-card">


<img src="${song.image}">



<h3>

${song.name}

</h3>



<p>

${song.artist}

</p>



<button class="play-btn" onclick="playSelected(${index})">

▶ Dinle

</button>



</div>

`;

}







function renderSongs(){


songGrid.innerHTML="";


songs.forEach((song,index)=>{


songGrid.innerHTML +=
createCard(song,index);


});


}








// =========================
// ŞARKI BAŞLATMA
// =========================



function playSelected(index){


currentSong=index;


loadSong(index);


player.style.display="flex";


player.classList.remove("closed");



document
.getElementById("openPlayer")
.classList.remove("show");



playSong();


addHistory(index);


}








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
"Ses dosyası bulunamadı"
);


});


}







function pauseSong(){


audio.pause();


}








// =========================
// NEXT PREVIOUS
// =========================



function nextSong(){


if(shuffleMode){


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






function previousSong(){


currentSong--;


if(currentSong<0){

currentSong=songs.length-1;

}



loadSong(currentSong);


playSong();


}







// =========================
// SON DİNLENENLER
// =========================



function addHistory(index){


history.unshift(index);



history =
[...new Set(history)];



history =
history.slice(0,3);



saveData();


renderRecent();


}







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








// =========================
// İLK 10
// =========================



function renderTop(){


topSongs.innerHTML="";



let sorted =
[...songs]
.sort(
(a,b)=>
b.plays-a.plays
);



sorted.forEach((song,i)=>{


let index =
songs.indexOf(song);



topSongs.innerHTML += `


<div class="playlist-item">


<span>

${String(i+1).padStart(2,"0")}

</span>



<p>

${song.name}

</p>



<button onclick="playSelected(${index})">

▶

</button>



</div>


`;



});



}

// =========================
// DİNLENME SAYACI
// =========================


audio.addEventListener(
"timeupdate",
()=>{


if(!audio.duration) return;



let percent =
(audio.currentTime / audio.duration) * 100;



if(percent >= 50 && !counted){


songs[currentSong].plays++;



stats.total++;



stats.time +=
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







// =========================
// PLAYER BUTONLARI
// =========================



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








// =========================
// SÜRE
// =========================


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
formatTime(audio.currentTime);



document.getElementById(
"duration"
).textContent =
formatTime(audio.duration);



}



});





progress.oninput=()=>{


audio.currentTime =
(progress.value/100)
*
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








// =========================
// RASTGELE
// =========================



document
.getElementById("shuffle")
.onclick=()=>{


shuffleMode =
!shuffleMode;



document
.getElementById("shuffle")
.classList

  // =========================
// ANA SAYFAYA DÖN
// =========================



function goHome(){


searchInput.value="";



searchResults.style.display="none";



document
.getElementById("heroSection")
.style.display="flex";



document
.getElementById("songsSection")
.style.display="block";



document
.getElementById("statsSection")
.style.display="block";



document
.getElementById("recentSection")
.style.display="block";



document
.getElementById("topSection")
.style.display="block";



renderSongs();

renderRecent();

renderTop();


}





document
.getElementById("homeLogo")
.onclick=goHome;



document
.getElementById("homeBtn")
.onclick=goHome;







// =========================
// PLAYER AÇ KAPA
// =========================



const closePlayer =
document.getElementById("closePlayer");



const openPlayer =
document.getElementById("openPlayer");




closePlayer.onclick=()=>{


player.classList.add("closed");



openPlayer.classList.add("show");


};





openPlayer.onclick=()=>{


player.classList.remove("closed");



openPlayer.classList.remove("show");


};









// =========================
// AYARLAR
// =========================



const settingsPanel =
document.getElementById("settingsPanel");



document
.getElementById("settingsBtn")
.onclick=()=>{


settingsPanel.classList.add("show");


};





document
.getElementById("closeSettings")
.onclick=()=>{


settingsPanel.classList.remove("show");


};







// =========================
// DARK LIGHT
// =========================



const darkMode =
document.getElementById("darkMode");



darkMode.onchange=()=>{


if(darkMode.checked){


document.body.classList.remove("light");


localStorage.setItem(
"theme",
"dark"
);



}

else{


document.body.classList.add("light");


localStorage.setItem(
"theme",
"light"
);


}



};







document
.getElementById("lightMode")
.onclick=()=>{


darkMode.checked=false;


document.body.classList.add("light");


localStorage.setItem(
"theme",
"light"
);


};








let savedTheme =
localStorage.getItem("theme");



if(savedTheme==="light"){


document.body.classList.add("light");


darkMode.checked=false;


}








// =========================
// İSTATİSTİKLER
// =========================



function updateStats(){


document
.getElementById("totalSongs")
.textContent =
stats.total;



document
.getElementById("totalTime")
.textContent =
Math.floor(
stats.time/60
);



let best =
[...songs]
.sort(
(a,b)=>
b.plays-a.plays
)[0];



if(best){


document
.getElementById("mostPlayed")
.textContent =
best.name;


}



}







// =========================
// BAŞLANGIÇ
// =========================



renderSongs();


renderRecent();


renderTop();


updateStats();





console.log(
"MusicWave hazır"
);
