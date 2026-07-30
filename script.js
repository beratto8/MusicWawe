const songs = [

{
name:"Believer",
artist:"Imagine Dragons",
album:"Evolve",
producer:"Imagine Dragons",
image:"images/believer.jpg",
audio:"music/believer.mp3",
plays:0
},

{
name:"Shape Of You",
artist:"Ed Sheeran",
album:"÷ (Divide)",
producer:"Ed Sheeran",
image:"images/shape.jpg",
audio:"music/shape.mp3",
plays:0
},

{
name:"Blinding Lights",
artist:"The Weeknd",
album:"After Hours",
producer:"The Weeknd",
image:"images/blinding.jpg",
audio:"music/blinding.mp3",
plays:0
},

{
name:"Lovely",
artist:"Billie Eilish",
album:"dont smile at me",
producer:"Finneas",
image:"images/lovely.jpg",
audio:"music/lovely.mp3",
plays:0
},

{
name:"Faded",
artist:"Alan Walker",
album:"Different World",
producer:"Alan Walker",
image:"images/faded.jpg",
audio:"music/faded.mp3",
plays:0
},

{
name:"Animals",
artist:"Maroon 5",
album:"V",
producer:"Maroon 5",
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


let shuffleMode=false;


let repeatMode=false;



let history =
JSON.parse(
localStorage.getItem("history")
)
|| [];



let stats =
JSON.parse(
localStorage.getItem("stats")
)
|| {};




// VERİ KAYDET

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



// ŞARKI KARTI

function createCard(song,index){


return `

<div class="song-card">


<img src="${song.image}">



<h3>${song.name}</h3>



<p>${song.artist}</p>



<small>
Albüm: ${song.album}
</small>


<br>


<small>
Yapımcı: ${song.producer}
</small>



<button 
class="play-btn"
onclick="playSelected(${index})">

▶ Dinle

</button>


</div>

`;

}




// ANA ŞARKILARI BAS

function renderSongs(){


if(!songGrid)
return;


songGrid.innerHTML="";


songs.forEach((song,index)=>{


songGrid.innerHTML +=
createCard(song,index);


});


}

// ŞARKI SEÇME

function playSelected(index){

currentSong=index;

loadSong(index);

playSong();

addHistory(index);

openMusicPlayer();

}



// PLAYER'A ŞARKI YÜKLEME

function loadSong(index){


let song=songs[index];


musicName.textContent =
song.name;


artistName.textContent =
song.artist;



playerImage.src =
song.image;



audio.src =
song.audio;


audio.load();


}




// PLAYER AÇ

function openMusicPlayer(){


player.style.display="flex";


player.classList.remove("closed");


const openPlayer =
document.getElementById("openPlayer");


if(openPlayer){

openPlayer.style.display="none";

}


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

.catch(error=>{


console.log(
"Müzik oynatılamadı",
error
);


});


}




// DURDUR

function pauseSong(){


audio.pause();


}




// SONRAKİ

function nextSong(){



if(shuffleMode){


let random;


do{

random =
Math.floor(
Math.random()*songs.length
);


}

while(random===currentSong);



currentSong=random;


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

currentSong =
songs.length-1;

}



loadSong(currentSong);


playSong();


}






// PLAYER BUTONLARI


playBtn.onclick=()=>{


openMusicPlayer();

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






// KAPAT / AÇ


const closePlayer =
document.getElementById(
"closePlayer"
);


const openPlayer =
document.getElementById(
"openPlayer"
);



closePlayer.onclick=()=>{


player.classList.add(
"closed"
);



openPlayer.style.display =
"block";


};




openPlayer.onclick=()=>{


player.classList.remove(
"closed"
);



openPlayer.style.display =
"none";


};






// SES


volume.oninput=()=>{


audio.volume =
volume.value / 100;


localStorage.setItem(
"volume",
volume.value
);


};



let savedVolume =
localStorage.getItem(
"volume"
);



if(savedVolume){


volume.value =
savedVolume;


audio.volume =
savedVolume / 100;


  }

// GEÇMİŞ / SON DİNLENEN


function addHistory(index){


history.unshift(index);



history =
[...new Set(history)];



// sadece son 3

history =
history.slice(0,3);



saveData();



renderRecent();


}





function renderRecent(){


if(!recentSongs)
return;



recentSongs.innerHTML="";



history.forEach(index=>{


recentSongs.innerHTML +=
createCard(
songs[index],
index
);


});


}






// İLK 10 SİSTEMİ


function renderTop(){


if(!topSongs)
return;



let sorted =
[...songs].sort(
(a,b)=>
b.plays-a.plays
);



topSongs.innerHTML="";



sorted.slice(0,10)
.forEach((song,index)=>{


let songIndex =
songs.indexOf(song);



topSongs.innerHTML +=
`
<div class="playlist-item">


<span>
${String(index+1).padStart(2,"0")}
</span>


<p>

${song.name}

<br>

<small>

${song.artist}

</small>

</p>



<button onclick="playSelected(${songIndex})">

▶

</button>



</div>

`;



});


}







// DINLENME SAYACI


let counted=false;



audio.addEventListener(
"play",
()=>{


counted=false;


});





audio.addEventListener(
"timeupdate",
()=>{


if(!audio.duration)
return;



let percent =
(audio.currentTime /
audio.duration)*100;



if(percent>=50 && !counted){


songs[currentSong].plays++;



stats.totalSongs =
(stats.totalSongs || 0)+1;



stats.totalTime =
(stats.totalTime || 0)
+
Math.floor(audio.currentTime);



saveData();



renderTop();



if(typeof updateStats==="function"){

updateStats();

}



counted=true;


}



});









// ARAMA SİSTEMİ


const searchInput =
document.getElementById(
"searchInput"
);


const searchBtn =
document.getElementById(
"searchBtn"
);



const searchResults =
document.getElementById(
"searchResults"
);



const songsSection =
document.getElementById(
"songsSection"
);



const topSection =
document.getElementById(
"topSection"
);



const heroSection =
document.getElementById(
"heroSection"
);





function searchSongs(){



let value =
searchInput.value
.toLowerCase()
.trim();



if(value==="")
return;




// ana sayfayı gizle


if(heroSection)
heroSection.style.display="none";


if(songsSection)
songsSection.style.display="none";


if(topSection)
topSection.style.display="none";



searchResults.style.display="block";



searchGrid.innerHTML="";



let results =
songs.filter(song=>



song.name
.toLowerCase()
.includes(value)



||



song.artist
.toLowerCase()
.includes(value)



);




if(results.length===0){



searchGrid.innerHTML=

`

<div class="no-result">

Bu şarkı şu an bulunamadı.

</div>

`;



return;


}





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







// ANA SAYFA


function goHome(){



searchInput.value="";



if(searchResults)
searchResults.style.display="none";



if(heroSection)
heroSection.style.display="flex";



if(songsSection)
songsSection.style.display="block";



if(topSection)
topSection.style.display="block";



renderSongs();

renderTop();

renderRecent();


}




// LOGO VE GERİ BUTONU


const homeLogo =
document.getElementById(
"homeLogo"
);


const backHome =
document.getElementById(
"backHome"
);



if(homeLogo){

homeLogo.onclick=goHome;

}



if(backHome){

backHome.onclick=goHome;

}

// SHUFFLE

const shuffleBtn =
document.getElementById("shuffle");


if(shuffleBtn){


shuffleBtn.onclick=()=>{


shuffleMode=!shuffleMode;



shuffleBtn.classList.toggle(
"active",
shuffleMode
);



// repeat açıksa kapat

if(shuffleMode){


repeatMode=false;


const repeatBtn =
document.getElementById("repeat");


if(repeatBtn){

repeatBtn.classList.remove(
"active"
);

}


}



};

}




// REPEAT


const repeatBtn =
document.getElementById("repeat");



if(repeatBtn){


repeatBtn.onclick=()=>{


repeatMode=!repeatMode;



repeatBtn.classList.toggle(
"active",
repeatMode
);



// shuffle açıksa kapat


if(repeatMode){


shuffleMode=false;



if(shuffleBtn){


shuffleBtn.classList.remove(
"active"
);


}


}



};


}






// ŞARKI BİTİNCE



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







// SÜRE GÖSTERGESİ


audio.addEventListener(
"timeupdate",
()=>{


if(audio.duration){


progress.value =
(audio.currentTime /
audio.duration)*100;



const current =
document.getElementById(
"currentTime"
);



const duration =
document.getElementById(
"duration"
);



if(current){

current.textContent =
formatTime(
audio.currentTime
);

}



if(duration){

duration.textContent =
formatTime(
audio.duration
);

}



}


});






progress.oninput=()=>{


if(audio.duration){


audio.currentTime =
(progress.value/100)
*
audio.duration;


}


};







function formatTime(time){


if(isNaN(time))
return "0:00";



let min =
Math.floor(time/60);



let sec =
Math.floor(time%60);



if(sec<10){

sec="0"+sec;

}



return min+":"+sec;


}








// TEMA SİSTEMİ


const darkMode =
document.getElementById(
"darkMode"
);



if(darkMode){



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


}







const lightMode =
document.getElementById(
"lightMode"
);



if(lightMode){


lightMode.onclick=()=>{


document.body.classList.add(
"light"
);



if(darkMode){

darkMode.checked=false;

}



localStorage.setItem(
"theme",
"light"
);



};


}








// KAYITLI TEMA


if(
localStorage.getItem("theme")
==="light"
){


document.body.classList.add(
"light"
);



if(darkMode){

darkMode.checked=false;

}


}








// KLAVYE KONTROLLERİ



document.addEventListener(
"keydown",
(e)=>{


if(e.code==="Space"){


e.preventDefault();



if(audio.paused){

playSong();

}

else{

pauseSong();

}



}



if(e.code==="ArrowRight"){


nextSong();


}



if(e.code==="ArrowLeft"){


previousSong();


}



});








// BAŞLANGIÇ


renderSongs();


renderTop();


renderRecent();



// player başlangıçta kapalı

player.style.display="none";



loadSong(0);



console.log(
"MusicWave sistem aktif"
);

