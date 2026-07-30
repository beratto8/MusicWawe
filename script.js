// ======================================
// MUSICWAVE JAVASCRIPT V2
// PART 1
// ======================================


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



// ELEMENTLER


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



let currentSong = 0;


let history =
JSON.parse(localStorage.getItem("history")) || [];


let stats =
JSON.parse(localStorage.getItem("stats")) || {

total:0,
time:0

};



let shuffleMode = false;


let repeatMode = false;


let counted = false;



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

// ======================================
// PART 2
// ŞARKI KARTLARI + PLAYER YÜKLEME
// ======================================



function createSongCard(song,index){


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





// TREND ŞARKILARI YÜKLE


function renderSongs(){


songGrid.innerHTML="";



songs.forEach((song,index)=>{


songGrid.innerHTML +=

createSongCard(song,index);



});


}








// ŞARKI SEÇME


function playSelected(index){


currentSong=index;



loadSong(index);



player.style.display="flex";



player.classList.remove("closed");



openPlayer.classList.remove("show");



playSong();



addHistory(index);



}








// PLAYER'A ŞARKI YÜKLEME


function loadSong(index){


const song=songs[index];



musicName.textContent=

song.name;



artistName.textContent=

song.artist;



playerImage.src=

song.image;



audioPlayer.src=

song.audio;



audioPlayer.load();



}








// ÇAL


function playSong(){


audioPlayer.play()

.then(()=>{


console.log(
"Çalıyor:",
songs[currentSong].name
);



})

.catch(()=>{


console.log(
"Dosya bulunamadı"
);



});


}








// DURDUR


function pauseSong(){


audioPlayer.pause();



}







// SONRAKİ ŞARKI


function nextSong(){



currentSong++;



if(currentSong >= songs.length){


currentSong=0;


}



loadSong(currentSong);


playSong();


addHistory(currentSong);



}







// ÖNCEKİ ŞARKI


function previousSong(){



currentSong--;



if(currentSong < 0){


currentSong=songs.length-1;


}



loadSong(currentSong);


playSong();



}








// PLAYER BUTONLARI


document
.getElementById("play")
.onclick=()=>{


playSong();


};



document
.getElementById("pause")
.onclick=()=>{


pauseSong();


};



document
.getElementById("next")
.onclick=()=>{


nextSong();


};



document
.getElementById("prev")
.onclick=()=>{


previousSong();


};

// ======================================
// PART 3
// SON DİNLENENLER + İSTATİSTİKLER
// ======================================



// SON DİNLENEN EKLEME


function addHistory(index){


history.unshift(index);



history=[...new Set(history)];



history=history.slice(0,3);



saveData();



renderRecent();



}








// SON DİNLENENLERİ GÖSTER


function renderRecent(){


if(!recentSongs)
return;



recentSongs.innerHTML="";



history.forEach(index=>{


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



function renderTop(){


const topSongs =
document.getElementById("topSongs");



if(!topSongs)
return;



topSongs.innerHTML="";



let sorted=[...songs].sort(

(a,b)=>b.plays-a.plays

);





sorted.forEach((song,index)=>{


let realIndex =
songs.indexOf(song);



topSongs.innerHTML += `


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








// ======================================
// DİNLENME SAYACI
// ======================================



audioPlayer.addEventListener(
"timeupdate",
()=>{



if(!audioPlayer.duration)
return;



let percent =

(audioPlayer.currentTime /
audioPlayer.duration)*100;





if(percent >= 50 && !counted){



songs[currentSong].plays++;



stats.total++;



stats.time +=

Math.floor(audioPlayer.duration);



saveData();



renderTop();



updateStats();



counted=true;



}



}

);








audioPlayer.addEventListener(
"play",
()=>{


counted=false;



}

);









// ======================================
// İSTATİSTİKLERİ YAZDIR
// ======================================


function updateStats(){


const totalSongs =
document.getElementById("totalSongs");


const totalTime =
document.getElementById("totalTime");


const mostPlayed =
document.getElementById("mostPlayed");





if(totalSongs)

totalSongs.textContent =
stats.total;





if(totalTime)

totalTime.textContent =

Math.floor(stats.time/60);







let best =
[...songs].sort(

(a,b)=>b.plays-a.plays

)[0];





if(best && mostPlayed)

mostPlayed.textContent =
best.name;



}

// ======================================
// PART 4
// ARAMA + ANA SAYFA + PLAYER PANEL
// ======================================





// ======================================
// ARAMA SİSTEMİ
// ======================================



function searchSongs(){



let value =

searchInput.value
.toLowerCase()
.trim();




if(value===""){


goHome();


return;


}




searchResults.style.display="block";



document
.getElementById("heroSection")
.style.display="none";



document
.getElementById("songsSection")
.style.display="none";



document
.getElementById("statsSection")
.style.display="none";



document
.getElementById("recentSection")
.style.display="none";



document
.getElementById("topSection")
.style.display="none";





searchGrid.innerHTML="";





let results = songs.filter(song=>


song.name
.toLowerCase()
.includes(value)

||

song.artist
.toLowerCase()
.includes(value)


);







if(results.length===0){



searchGrid.innerHTML="";



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

createSongCard(song,index);



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









// ======================================
// ANA SAYFAYA DÖN
// ======================================



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









// ======================================
// PLAYER AÇ KAPA
// ======================================



closePlayer.onclick=()=>{



player.classList.add("closed");



openPlayer.classList.add("show");



};







openPlayer.onclick=()=>{



player.classList.remove("closed");



openPlayer.classList.remove("show");



};

// ======================================
// PART 5
// PLAYER SÜRE + SHUFFLE + REPEAT
// ======================================



const progress =
document.getElementById("progress");


const currentTime =
document.getElementById("currentTime");


const duration =
document.getElementById("duration");






// ZAMAN FORMAT


function formatTime(time){


if(isNaN(time))

return "0:00";



let min =
Math.floor(time/60);



let sec =
Math.floor(time%60);



if(sec < 10)

sec="0"+sec;



return min+":"+sec;



}









// ŞARKI SÜRESİ


audioPlayer.addEventListener(
"loadedmetadata",
()=>{


duration.textContent =

formatTime(
audioPlayer.duration
);



});








// İLERLEME


audioPlayer.addEventListener(
"timeupdate",
()=>{


if(audioPlayer.duration){



let percent =

(audioPlayer.currentTime /
audioPlayer.duration)*100;




progress.value=percent;



currentTime.textContent =

formatTime(
audioPlayer.currentTime
);



duration.textContent =

formatTime(
audioPlayer.duration
);



}



});








// ÇUBUKTAN SEÇME


progress.oninput=()=>{


audioPlayer.currentTime =

(progress.value/100)
*
audioPlayer.duration;



};








// ======================================
// SHUFFLE
// ======================================



const shuffleBtn =
document.getElementById("shuffle");



shuffleBtn.onclick=()=>{


shuffleMode = !shuffleMode;



shuffleBtn.classList.toggle(
"active"
);



};









// ======================================
// REPEAT
// ======================================



const repeatBtn =
document.getElementById("repeat");



repeatBtn.onclick=()=>{


repeatMode=!repeatMode;



repeatBtn.classList.toggle(
"active"
);



};









// ŞARKI BİTİNCE


audioPlayer.addEventListener(
"ended",
()=>{



if(repeatMode){



loadSong(currentSong);



playSong();



return;


}







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

// ======================================
// PART 6
// AYARLAR + DARK LIGHT MODE
// ======================================



const settingsPanel =
document.getElementById("settingsPanel");


const closeSettings =
document.getElementById("closeSettings");



const darkMode =
document.getElementById("darkMode");



const lightMode =
document.getElementById("lightMode");








// AYARLAR BUTONU
// HTML'de settingsBtn yoksa hata vermesin


const settingsBtn =
document.getElementById("settingsBtn");



if(settingsBtn){



settingsBtn.onclick=()=>{


settingsPanel.classList.add(
"show"
);



};



}








// KAPAT


if(closeSettings){



closeSettings.onclick=()=>{


settingsPanel.classList.remove(
"show"
);



};



}








// DARK MODE


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









// LIGHT MODE BUTONU


if(lightMode){



lightMode.onclick=()=>{



document.body.classList.add(
"light"
);



if(darkMode)

darkMode.checked=false;



localStorage.setItem(
"theme",
"light"
);



};



}









// KAYITLI TEMA


let savedTheme =

localStorage.getItem(
"theme"
);




if(savedTheme==="light"){



document.body.classList.add(
"light"
);



if(darkMode)

darkMode.checked=false;



}







// ======================================
// MOBİL HOME
// ======================================


const mobileHome =
document.getElementById("mobileHome");



if(mobileHome){



mobileHome.onclick=()=>{


goHome();



};



}

    // ======================================
// PART 7
// BAŞLANGIÇ + KONTROLLER
// ======================================




// ELEMENT KONTROLÜ


function checkElement(id){


const element =
document.getElementById(id);



if(!element){


console.log(
"Eksik element:",
id
);



return false;



}



return true;



}









// SAYFA BAŞLARKEN


window.addEventListener(
"DOMContentLoaded",
()=>{



renderSongs();



renderRecent();



renderTop();



updateStats();





console.log(
"MusicWave V2 hazır"
);



});









// ======================================
// KLAVYE KONTROLLERİ
// ======================================



document.addEventListener(
"keydown",
(e)=>{



// SPACE PLAY / PAUSE


if(e.code==="Space"){



e.preventDefault();



if(audioPlayer.paused){


playSong();



}

else{


pauseSong();



}



}







// SAĞ OK NEXT


if(e.code==="ArrowRight"){


nextSong();



}







// SOL OK PREVIOUS


if(e.code==="ArrowLeft"){


previousSong();



}



});









// ======================================
// HATA YAKALAMA
// ======================================



audioPlayer.addEventListener(
"error",
()=>{


console.log(
"Ses dosyası yüklenemedi:",
songs[currentSong].audio
);



});









// RESİM HATASI


document.addEventListener(
"error",
(e)=>{



if(e.target.tagName==="IMG"){



e.target.src =
"images/default.jpg";



}



},
true
);









// ======================================
// SAYFA GÜVENLİĞİ
// ======================================



window.addEventListener(
"beforeunload",
()=>{


saveData();



});

    // ======================================
// PART 8
// FINAL BAĞLANTILAR + EKSTRA ÖZELLİKLER
// ======================================





// ======================================
// LOGOYA BASINCA PLAYER KORUMA
// ======================================



document
.getElementById("homeLogo")
?.addEventListener(
"click",
()=>{


if(searchResults)

searchResults.style.display="none";



});









// ======================================
// TREND MENÜSÜ
// ======================================



const menuItems =
document.querySelectorAll(
".sidebar li"
);



menuItems.forEach(
(item,index)=>{



item.addEventListener(
"click",
()=>{



menuItems.forEach(
(i)=>
i.classList.remove(
"active"
)
);



item.classList.add(
"active"
);






if(index===0){


goHome();



}





if(index===1){



document
.getElementById(
"songsSection"
)
.scrollIntoView({
behavior:"smooth"
});



}





if(index===2){



document
.getElementById(
"statsSection"
)
.scrollIntoView({
behavior:"smooth"
});



}




});



});









// ======================================
// OTOMATİK PLAYER GÖSTER
// ======================================



audioPlayer.addEventListener(
"play",
()=>{



player.style.display="flex";



player.classList.remove(
"closed"
);



});









// ======================================
// SES DURUMU KAYDETME
// ======================================



let savedVolume =

localStorage.getItem(
"volume"
);

playSong();



addHistory(currentSong);



});

