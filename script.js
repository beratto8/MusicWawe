/* ==========================================
   MUSICWAVE SCRIPT.JS
========================================== */


const songs = [

{
name:"Believer",
artist:"Imagine Dragons",
image:"https://picsum.photos/300/300?1",
audio:"music/believer.mp3"
},

{
name:"Shape Of You",
artist:"Ed Sheeran",
image:"https://picsum.photos/300/300?2",
audio:"music/shape.mp3"
},

{
name:"Blinding Lights",
artist:"The Weeknd",
image:"https://picsum.photos/300/300?3",
audio:"music/blinding.mp3"
},

{
name:"Lovely",
artist:"Billie Eilish",
image:"https://picsum.photos/300/300?4",
audio:"music/lovely.mp3"
},

{
name:"Faded",
artist:"Alan Walker",
image:"https://picsum.photos/300/300?5",
audio:"music/faded.mp3"
},

{
name:"Animals",
artist:"Maroon 5",
image:"https://picsum.photos/300/300?6",
audio:"music/animals.mp3"
}

];



let currentSong = 0;



const audio = document.getElementById("audioPlayer");

const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const musicName = document.getElementById("musicName");
const artistName = document.getElementById("artistName");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");




// ŞARKI YÜKLEME

function loadSong(index){

let song = songs[index];


musicName.innerHTML = song.name;

artistName.innerHTML = song.artist;

audio.src = song.audio;


}




// OYNAT

function playSong(){

audio.play().catch(()=>{

console.log("Müzik dosyası bulunamadı");

});

}



// DURDUR

function pauseSong(){

audio.pause();

}




// SONRAKİ ŞARKI

function nextSong(){

currentSong++;


if(currentSong >= songs.length){

currentSong = 0;

}


loadSong(currentSong);

playSong();


}




// ÖNCEKİ ŞARKI

function previousSong(){

currentSong--;


if(currentSong < 0){

currentSong = songs.length - 1;

}


loadSong(currentSong);

playSong();


}




// BUTONLAR

playBtn.addEventListener("click",()=>{

playSong();

});


pauseBtn.addEventListener("click",()=>{

pauseSong();

});


nextBtn.addEventListener("click",()=>{

nextSong();

});


prevBtn.addEventListener("click",()=>{

previousSong();

});






// SES AYARI

volume.addEventListener("input",()=>{

audio.volume = volume.value / 100;

});






// İLERLEME ÇUBUĞU

audio.addEventListener("timeupdate",()=>{


if(audio.duration){

progress.value =
(audio.currentTime / audio.duration) * 100;

}


});




progress.addEventListener("input",()=>{


audio.currentTime =
(progress.value / 100) * audio.duration;


});







// ŞARKI BİTİNCE OTOMATİK GEÇİŞ

audio.addEventListener("ended",()=>{

nextSong();

});







// ARAMA SİSTEMİ


searchBtn.addEventListener("click",()=>{


let value = searchInput.value.toLowerCase();



let result = songs.find(song =>

song.name.toLowerCase().includes(value)

);




if(result){


currentSong = songs.indexOf(result);


loadSong(currentSong);


playSong();


}

else{


alert("Şarkı bulunamadı!");

}


});







// KARTLARA TIKLAMA


const cards = document.querySelectorAll(".song-card");



cards.forEach((card,index)=>{


card.addEventListener("click",()=>{


currentSong = index;


loadSong(currentSong);


playSong();


});


});







// ÇALMA LİSTESİ


const playlistButtons = document.querySelectorAll(".playlist-item button");



playlistButtons.forEach((button,index)=>{


button.addEventListener("click",()=>{


currentSong = index;


loadSong(currentSong);


playSong();


});


});







// BAŞLANGIÇ

loadSong(currentSong);



console.log("MusicWave hazır!");
