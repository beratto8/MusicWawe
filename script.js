const songs = [

{
name:"Believer",
artist:"Imagine Dragons",
image:"images/believer.jpg",
audio:"music/believer.mp3",
lyrics:"First things first..."
},

{
name:"Shape Of You",
artist:"Ed Sheeran",
image:"images/shape.jpg",
audio:"music/shape.mp3",
lyrics:"The club isn't the best place..."
},

{
name:"Blinding Lights",
artist:"The Weeknd",
image:"images/blinding.jpg",
audio:"music/blinding.mp3",
lyrics:"I said, ooh..."
},

{
name:"Lovely",
artist:"Billie Eilish",
image:"images/lovely.jpg",
audio:"music/lovely.mp3",
lyrics:"Isn't it lovely..."
},

{
name:"Faded",
artist:"Alan Walker",
image:"images/faded.jpg",
audio:"music/faded.mp3",
lyrics:"Where are you now..."
},

{
name:"Animals",
artist:"Maroon 5",
image:"images/animals.jpg",
audio:"music/animals.mp3",
lyrics:"Baby I'm preying on you tonight..."
}

];



let currentSong = 0;

let isShuffle = false;

let isRepeat = false;



const audio =
document.getElementById("audioPlayer");


const songGrid =
document.getElementById("songGrid");


const player =
document.getElementById("player");


const playerImage =
document.getElementById("playerImage");


const musicName =
document.getElementById("musicName");


const artistName =
document.getElementById("artistName");


const play =
document.getElementById("play");


const pause =
document.getElementById("pause");


const next =
document.getElementById("next");


const prev =
document.getElementById("prev");


const progress =
document.getElementById("progress");


const volume =
document.getElementById("volume");


const currentTime =
document.getElementById("currentTime");


const duration =
document.getElementById("duration");



const searchInput =
document.getElementById("searchInput");


const searchBtn =
document.getElementById("searchBtn");



const shuffle =
document.getElementById("shuffle");


const repeat =
document.getElementById("repeat");



const closePlayer =
document.getElementById("closePlayer");


const openPlayer =
document.getElementById("openPlayer");





// ŞARKI KARTLARINI OLUŞTUR


function createSongs(list){


songGrid.innerHTML="";


list.forEach((song,index)=>{


let card=document.createElement("div");


card.className="song-card";


card.innerHTML=`

<img src="${song.image}">


<h3>${song.name}</h3>


<p>${song.artist}</p>


<button class="play-btn">

▶ Dinle

</button>

`;



card.querySelector(".play-btn")
.onclick=()=>{

loadSong(index);

playSong();

};


songGrid.appendChild(card);



});


}



createSongs(songs);





// ŞARKI YÜKLE


function loadSong(index){


currentSong=index;


let song=songs[index];


musicName.textContent=song.name;


artistName.textContent=song.artist;


playerImage.src=song.image;


audio.src=song.audio;


player.style.display="flex";


}





// OYNAT


function playSong(){


audio.play();


}





// DURDUR


function pauseSong(){


audio.pause();


}





play.onclick=()=>{


playSong();


};



pause.onclick=()=>{


pauseSong();


};





// NEXT


next.onclick=()=>{


if(isShuffle){


currentSong=Math.floor(
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


};





// PREVIOUS


prev.onclick=()=>{


currentSong--;


if(currentSong<0){

currentSong=songs.length-1;

}


loadSong(currentSong);


playSong();


};





// SES


volume.oninput=()=>{


audio.volume=
volume.value/100;


};





// SÜRE


audio.addEventListener(
"timeupdate",
()=>{


if(audio.duration){


progress.value=
(audio.currentTime/audio.duration)*100;



currentTime.textContent=
formatTime(audio.currentTime);


duration.textContent=
formatTime(audio.duration);


}


});





progress.oninput=()=>{


audio.currentTime=
progress.value/100*audio.duration;


};





// BİTİNCE


audio.onended=()=>{


if(isRepeat){


playSong();


}

else{


next.click();


}


};





// SHUFFLE


shuffle.onclick=()=>{


isShuffle=!isShuffle;


shuffle.style.color=
isShuffle ? "cyan":"white";


};





// REPEAT


repeat.onclick=()=>{


isRepeat=!isRepeat;


repeat.style.color=
isRepeat ? "cyan":"white";


};





// PLAYER KAPAT


closePlayer.onclick=()=>{


player.style.transform=
"translateY(90%)";


};





openPlayer.onclick=()=>{


player.style.transform=
"translateY(0)";


};





// ARAMA


function searchSongs(){


let value=
searchInput.value.toLowerCase();



let filtered=
songs.filter(song=>{


return (

song.name.toLowerCase()
.includes(value)

||

song.artist.toLowerCase()
.includes(value)

);


});



createSongs(filtered);


}





searchBtn.onclick=searchSongs;



searchInput.onkeyup=(e)=>{


if(e.key==="Enter"){


searchSongs();


}


};





function formatTime(time){


if(isNaN(time)) return "0:00";


let min=
Math.floor(time/60);


let sec=
Math.floor(time%60);



if(sec<10){

sec="0"+sec;

}


return min+":"+sec;


}



console.log("MusicWave v3 aktif");
