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

const musicName = document.getElementById("musicName");
const artistName = document.getElementById("artistName");

const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");


function loadSong(index){

const song = songs[index];

musicName.textContent = song.name;
artistName.textContent = song.artist;

audio.src = song.audio;

audio.load();

}



function playSong(){

audio.play()
.then(()=>{

console.log("Müzik başladı");

})
.catch(error=>{

console.log("Müzik açılamadı:",error);

});

}



function pauseSong(){

audio.pause();

}



function nextSong(){

currentSong++;

if(currentSong >= songs.length){

currentSong = 0;

}

loadSong(currentSong);

playSong();

}



function previousSong(){

currentSong--;

if(currentSong < 0){

currentSong = songs.length-1;

}

loadSong(currentSong);

playSong();

}



playBtn.onclick = ()=>{

playSong();

};


pauseBtn.onclick = ()=>{

pauseSong();

};


nextBtn.onclick = ()=>{

nextSong();

};


prevBtn.onclick = ()=>{

previousSong();

};



volume.oninput = ()=>{

audio.volume = volume.value / 100;

localStorage.setItem(
"volume",
volume.value
);

};



audio.addEventListener(
"timeupdate",
()=>{

if(audio.duration){

progress.value =
(audio.currentTime / audio.duration) * 100;

}

}
);



progress.oninput = ()=>{

audio.currentTime =
(progress.value / 100) * audio.duration;

};



audio.addEventListener(
"ended",
()=>{

nextSong();

}
);



function formatTime(time){

let minutes = Math.floor(time / 60);

let seconds = Math.floor(time % 60);

if(seconds < 10){

seconds = "0"+seconds;

}

return minutes+":"+seconds;

}



loadSong(currentSong);


let savedVolume =
localStorage.getItem("volume");


if(savedVolume){

volume.value = savedVolume;

audio.volume =
savedVolume / 100;

}


console.log("MusicWave v2 player aktif");
