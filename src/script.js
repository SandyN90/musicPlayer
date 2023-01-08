var mysong= document.getElementById('mysongs');
var songList = document.getElementById('songList');
var Pause = document.getElementById('pause');
var play = document.getElementById('play');
var Stop = document.getElementById('stop');
var next = document.getElementById('next');
var previous= document.getElementById('previous');
var currTime = document.getElementById('currTime');
var totalDuration = document.getElementById('totalDuration');
var seek = document.getElementById('seeking');
// var volume = document.getElementById('volume');
var volume = document.querySelectorAll('input')[1];
var volumeValue = document.getElementById('volumeValue');
var music = document.querySelector('audio');
var musicTimeControl = document.querySelectorAll('input')[0];
var songName = document.getElementById('heading');
var image = document.getElementById('image');

// There should be an indicator which can tell to us that at which number song is playing now;
// There should  indicators to get the next position and previous position of the currently playing song;


// Array to assign the name dynamically to load the song from the created folder;
const songs = [{name: "music-1",
                musicName: "2002",
                imageName: "img-1"},
                {name: "music-2",
                musicName: "Friends",
                imageName: "img-2"},
                {name: "Tumse Bhi Zyada Mp3 Song Tumse Pyar Kiya-(PagalWorld.uk)",
                musicName: "Tumse Bhi Zyada",
                imageName: "img-3"},
                {name: "mysong",
                musicName: "Shiv Tandav",
                imageName: "img-4"},
                {name: "Hanuman Chalisa - Hariharan, Gulshan Kumar- [MyMp3Bhojpuri.In]",
                musicName: "Hanuman Chalisa",
                imageName: "img-5"},
                {name: "[MP3DOWNLOAD.TO] Shri Hari Stotram _ Meaning in Hindi-320k",
                musicName: "Shri Hari Stotram",
                imageName: "img-6"},
                {name: "Mantra Vishnu Sahasranamam (The Thousand Names Of Lord Vishnu)Shanghai",
                musicName: "Mantra Vishnu",
                imageName: "img-7"},
                {name: "Keh Len De - Kaka- [MyMp3Bhojpuri.In]",
                musicName: "Keh Len De",
                imageName: "img-8"},
                {name: "Aashiq Purana - Kaka",
                musicName: "Aashiq Purana",
                imageName: "img-9"},
                {name: "Kale Je Libaas Di - Kaka- [MyMp3Bhojpuri.In]",
                musicName: "Kale Je Libaas Di",
                imageName: "img-10"},
                {name: "Temporary Pyar  - Kaka- [MyMp3Bhojpuri.In]",
                musicName: "Temporary Pyar",
                imageName: "img-11"},
                {name: "Tennu Ni Khabran - Kaka- [MyMp3Bhojpuri.In]",
                musicName: "Tennu Ni Khabran",
                imageName: "img-12"},
                {name: "Teeji Seat - Kaka- [MyMp3Bhojpuri.In]",
                musicName: "Teeji Seat",
                imageName: "img-13"}
            ]

// function to play song;
let playSong = () =>{
    music.play();
    play.style.display = "none";
    Pause.style.display = "inline-flex";
}

// function to pause the song;
let pauseSong = ()=>{
    music.pause();
    Pause.style.display = "none";
    play.style.display = "inline-flex";
}

//This is the function to control and load the song; 
let loadSong = (songs) =>{
    music.src = `music/${songs.name}.mp3`;
    songName.innerText = `${songs.musicName}`;
    image.src = `musicImage/${songs.imageName}.jpg`;
}
// This is the function to stop song;
let stopSong = ()=>{
    music.load();
    play.style.display = "inline-flex";
    Pause.style.display = "none";
}

let musicIndex = 0;

// This is function to take next song in function;
let nextSong = ()=>{
    musicIndex = (musicIndex+1)%songs.length;
    loadSong(songs[musicIndex]);
    playSong();
}

// This the function to control previous song;
let previousSong = ()=>{
    musicIndex = (musicIndex-1+songs.length)%songs.length;
    loadSong(songs[musicIndex]);
    playSong();
}



// This is the javascript for seekbar controller;
music.addEventListener('timeupdate',(event)=>{
    // console.log(event);
    const {currentTime, duration} = event.srcElement;
    let progress_time = currentTime/duration*100;
    seek.value = `${progress_time}`;

    // Total time update;
    let min_duration = Math.floor(duration/60);
    let sec_duration = Math.floor(duration%60);
    if(sec_duration<10){
        sec_duration = `0${sec_duration}`;
    }
    let timeDuration = `${min_duration}:${sec_duration}`;
    if(duration){

        totalDuration.innerText = `${timeDuration}`;
    }

    // currentTime update;
    let min_currentduration = Math.floor(currentTime/60);
    let sec_currentduration = Math.floor(currentTime%60);
    if(sec_currentduration<10){
        sec_currentduration = `0${sec_currentduration}`;
    }
    let currenttimeDuration = `${min_currentduration}:${sec_currentduration}`;
    
    currTime.innerText = `${currenttimeDuration}`;
});

// // music.addEventListener('timeupdate', (event)=>{
// //     const {duration} = music;
//     musicTimeControl.oninput = ()=>{

//     }
// // })

musicTimeControl.addEventListener('input', (event)=>{
    // console.log(event);
    const {duration} = music;

    let inputValue = musicTimeControl.value;
    let currentValue = (inputValue/100)*duration;
    // console.log(currentValue);
    music.currentTime = currentValue;
});

music.addEventListener('ended', nextSong);

play.addEventListener('click', playSong);

Pause.addEventListener('click', pauseSong);

Stop.addEventListener('click', stopSong);

next.addEventListener('click', nextSong);

previous.addEventListener('click', previousSong);

// Setting volume value as a default value every time it will assign to the value when it will load ;
volumeValue.innerText = volume.value;

// volume controller javascript
volume.oninput = ()=>{
    let Value = volume.value;
    music.volume = Value/100;
    volumeValue.innerText = Value;
}









