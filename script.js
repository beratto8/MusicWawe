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



const musicName =
document.getElementById("musicName");


const artistName =
document.getElementById("artistName");


const playerImage =
document.getElementById("playerImage");



let currentSong = 0;


let shuffleMode = false;


let repeatMode = false;



let history =
JSON.parse(localStorage.getItem("history")) || [];



let stats =
JSON.parse(localStorage.getItem("musicStats")) || {};





function saveData(){

localStorage.setItem(
"history",
JSON.stringify(history)
);


localStorage.setItem(
"musicStats",
JSON.stringify(stats)
);

}




// KART OLUŞTUR


function createCard(song,index){

return `

<div class="song-card">


<img src="${song.image}">


<h3>${song.name}</h3>


<p>${song.artist}</p>


<button class="play-btn"
onclick="playSelected(${index})">

▶ Dinle

</button>


</div>

`;

}




// ANA LİSTE


function renderSongs(){

songGrid.innerHTML="";


songs.forEach((song,index)=>{

songGrid.innerHTML +=
createCard(song,index);

});


}





// OYNATMA


function playSelected(index){

currentSong=index;

loadSong(index);

playSong();

addHistory(index);

player.style.display="flex";

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

audio.play()
.catch(()=>{

console.log("Dosya bulunamadı");

});

}





function pauseSong(){

audio.pause();

}

// =========================
// PLAYER KONTROLLERİ
// =========================


document.getElementById("play").onclick=()=>{

playSong();

};



document.getElementById("pause").onclick=()=>{

pauseSong();

};





document.getElementById("next").onclick=()=>{


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


};






document.getElementById("prev").onclick=()=>{


currentSong--;


if(currentSong<0){

currentSong=songs.length-1;

}


loadSong(currentSong);

playSong();


};







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
// DİNLEME SAYACI
// =========================


let counted=false;



audio.addEventListener(
"timeupdate",
()=>{


if(!audio.duration)
return;



let percent =
(audio.currentTime/audio.duration)*100;



if(percent>=50 && !counted){



songs[currentSong].plays++;



stats.total =
(stats.total||0)+1;



saveData();



renderTop();



counted=true;


}


});





audio.addEventListener(
"play",
()=>{


counted=false;


});









// =========================
// İLK 10
// =========================


function renderTop(){


topSongs.innerHTML="";



let sorted =
[...songs].sort(
(a,b)=>b.plays-a.plays
);




sorted.slice(0,10)
.forEach((song,index)=>{


let realIndex =
songs.indexOf(song);



topSongs.innerHTML += `


<div class="playlist-item">


<span>
${String(index+1).padStart(2,"0")}
</span>


<p>
${song.name}
<br>
<small>${song.artist}</small>
</p>


<button onclick="playSelected(${realIndex})">

▶

</button>


</div>


`;


});


}







// =========================
// ARAMA
// =========================


const searchInput =
document.getElementById("searchInput");


document.getElementById("searchBtn")
.onclick=searchSongs;




function searchSongs(){


let value =
searchInput.value
.toLowerCase()
.trim();



if(value==="")
return;



document.getElementById("songsSection")
.style.display="none";



document.getElementById("recentSection")
.style.display="none";



document.getElementById("topSection")
.style.display="none";



document.getElementById("heroSection")
.style.display="none";



document.getElementById("searchResults")
.style.display="block";




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


document.getElementById("noResults")
.style.display="block";


return;


}



document.getElementById("noResults")
.style.display="none";





results.forEach(song=>{


let index=songs.indexOf(song);


searchGrid.innerHTML +=
createCard(song,index);



});


}





searchInput.addEventListener(
"keydown",
(e)=>{


if(e.key==="Enter"){

searchSongs();

}


});

// =========================
// ANA SAYFAYA DÖNÜŞ
// =========================


function goHome(){


searchInput.value="";



document.getElementById("searchResults")
.style.display="none";



document.getElementById("songsSection")
.style.display="block";



document.getElementById("recentSection")
.style.display="block";



document.getElementById("topSection")
.style.display="block";



document.getElementById("heroSection")
.style.display="flex";


}



document.getElementById("homeLogo")
.onclick=goHome;


document.getElementById("homeBtn")
.onclick=goHome;








// =========================
// LOGOYA BASINCA YENİLE
// =========================


document.getElementById("homeLogo")
.addEventListener(
"dblclick",
()=>{

location.reload();

});







// =========================
// SHUFFLE
// =========================


document.getElementById("shuffle")
.onclick=()=>{


shuffleMode=!shuffleMode;



document.getElementById("shuffle")
.classList.toggle(
"active",
shuffleMode
);



if(shuffleMode){

repeatMode=false;


document.getElementById("repeat")
.classList.remove("active");

}


};








// =========================
// REPEAT
// =========================


document.getElementById("repeat")
.onclick=()=>{


repeatMode=!repeatMode;



document.getElementById("repeat")
.classList.toggle(
"active",
repeatMode
);



if(repeatMode){


shuffleMode=false;


document.getElementById("shuffle")
.classList.remove("active");


}



};








// ŞARKI BİTİNCE


audio.addEventListener(
"ended",
()=>{


if(repeatMode){


audio.currentTime=0;

playSong();


}

else{


document.getElementById("next")
.click();


}



});









// =========================
// PLAYER AÇ KAPA
// =========================



document.getElementById("closePlayer")
.onclick=()=>{


player.classList.add("closed");



document.getElementById("openPlayer")
.style.display="block";


};






document.getElementById("openPlayer")
.onclick=()=>{


player.classList.remove("closed");



document.getElementById("openPlayer")
.style.display="none";


};








// =========================
// AYARLAR
// =========================



const settingsPanel =
document.getElementById("settingsPanel");



document.getElementById("settingsBtn")
.onclick=()=>{


settingsPanel.classList.add("show");


};





document.getElementById("closeSettings")
.onclick=()=>{


settingsPanel.classList.remove("show");


};







// =========================
// DARK / LIGHT MODE
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






document.getElementById("lightMode")
.onclick=()=>{


darkMode.checked=false;


document.body.classList.add("light");


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


document.body.classList.add("light");


darkMode.checked=false;


  }

// =========================
// PROFİL PANELİ
// =========================


const profilePanel =
document.getElementById("profilePanel");



document.getElementById("profileImage")
.onclick=()=>{


profilePanel.classList.add("active");


};





document.getElementById("closeProfile")
.onclick=()=>{


profilePanel.classList.remove("active");


};








// =========================
// MOBİL MENÜ
// =========================



document.getElementById("mobileHome")
.onclick=()=>{


goHome();


};





document.getElementById("mobileSearch")
.onclick=()=>{


searchInput.focus();


};






document.getElementById("mobileProfile")
.onclick=()=>{


profilePanel.classList.add("active");


};








// =========================
// PROGRESS BAR
// =========================



const progress =
document.getElementById("progress");



audio.addEventListener(
"timeupdate",
()=>{


if(audio.duration){



progress.value =
(audio.currentTime/audio.duration)*100;



document.getElementById("currentTime")
.textContent =
formatTime(audio.currentTime);



document.getElementById("duration")
.textContent =
formatTime(audio.duration);



}


});





progress.oninput=()=>{


audio.currentTime =
(progress.value/100)*audio.duration;


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
// BAŞLANGIÇ
// =========================



renderSongs();


renderTop();


renderRecent();



loadSong(0);




console.log(
"MusicWave aktif"
);
