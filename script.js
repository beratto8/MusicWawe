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



const audio = document.getElementById("audioPlayer");
const songGrid = document.getElementById("songGrid");
const recentSongs = document.getElementById("recentSongs");
const topSongs = document.getElementById("topSongs");

const player = document.getElementById("player");
const openPlayer = document.getElementById("openPlayer");
const closePlayer = document.getElementById("closePlayer");

const playerImage = document.getElementById("playerImage");
const musicName = document.getElementById("musicName");
const artistName = document.getElementById("artistName");

const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");

let currentSong = 0;
let counted = false;
let shuffleMode = false;
let repeatMode = false;


let history =
JSON.parse(localStorage.getItem("history")) || [];


let stats =
JSON.parse(localStorage.getItem("stats")) ||
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





function renderSongs(){

songGrid.innerHTML="";

songs.forEach((song,index)=>{

songGrid.innerHTML +=
createCard(song,index);

});

}







function playSelected(index){

currentSong=index;

loadSong(index);

player.style.display="flex";

player.classList.remove("closed");

playSong();

addHistory(index);

}





function loadSong(index){

let song=songs[index];

musicName.textContent=song.name;

artistName.textContent=song.artist;

playerImage.src=song.image;

audio.src=song.audio;

audio.load();

}







function playSong(){

audio.play().catch(()=>{

console.log("Müzik dosyası yok");

});

}





function pauseSong(){

audio.pause();

}







function nextSong(){


if(shuffleMode){

currentSong =
Math.floor(Math.random()*songs.length);

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







function addHistory(index){

history.unshift(index);

history=[...new Set(history)];

history=history.slice(0,3);

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







function renderTop(){

topSongs.innerHTML="";


let sorted=[...songs].sort(
(a,b)=>b.plays-a.plays
);



sorted.forEach((song,index)=>{

let realIndex=songs.indexOf(song);


topSongs.innerHTML +=`

<div class="playlist-item">

<span>
${String(index+1).padStart(2,"0")}
</span>


<p>
${song.name}
</p>


<button onclick="playSelected(${realIndex})">
▶
</button>


</div>

`;

});

}






audio.addEventListener(
"timeupdate",
()=>{


if(!audio.duration)return;


progress.value =
(audio.currentTime/audio.duration)*100;



document.getElementById("currentTime").textContent =
formatTime(audio.currentTime);


document.getElementById("duration").textContent =
formatTime(audio.duration);



let percent =
(audio.currentTime/audio.duration)*100;



if(percent>=50 && !counted){

songs[currentSong].plays++;

stats.total++;

stats.time += Math.floor(audio.currentTime);

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








playBtn.onclick=playSong;

pauseBtn.onclick=pauseSong;

nextBtn.onclick=nextSong;

prevBtn.onclick=previousSong;







progress.oninput=()=>{

audio.currentTime =
(progress.value/100)*audio.duration;

};






function formatTime(time){

if(isNaN(time))
return "0:00";


let m=Math.floor(time/60);

let s=Math.floor(time%60);


if(s<10)s="0"+s;


return m+":"+s;

}






document.getElementById("shuffle").onclick=()=>{

shuffleMode=!shuffleMode;

};



document.getElementById("repeat").onclick=()=>{

repeatMode=!repeatMode;

};




audio.addEventListener(
"ended",
()=>{


if(repeatMode){

audio.currentTime=0;

playSong();

}

else{

nextSong();

}

});







// ARAMA


const searchInput =
document.getElementById("searchInput");

const searchBtn =
document.getElementById("searchBtn");

const searchResults =
document.getElementById("searchResults");

const searchGrid =
document.getElementById("searchGrid");




function searchSongs(){

let value =
searchInput.value.toLowerCase().trim();


if(value==="")return;


document.querySelectorAll("main section")
.forEach(x=>x.style.display="none");


searchResults.style.display="block";


searchGrid.innerHTML="";


songs.filter(song=>

song.name.toLowerCase().includes(value)
||
song.artist.toLowerCase().includes(value)

)
.forEach(song=>{


let index=songs.indexOf(song);


searchGrid.innerHTML +=
createCard(song,index);


});


}



searchBtn.onclick=searchSongs;







function updateStats(){

document.getElementById("totalSongs").textContent =
stats.total;


document.getElementById("totalTime").textContent =
Math.floor(stats.time/60);


let best =
[...songs].sort(
(a,b)=>b.plays-a.plays
)[0];


document.getElementById("mostPlayed").textContent =
best.name;

}








// PLAYER KAPAT AÇ


closePlayer.onclick=()=>{

player.classList.add("closed");

openPlayer.style.display="block";

};



openPlayer.onclick=()=>{

player.classList.remove("closed");

openPlayer.style.display="none";

};








// BAŞLAT


renderSongs();

renderRecent();

renderTop();

updateStats();

console.log("MusicWave aktif");
