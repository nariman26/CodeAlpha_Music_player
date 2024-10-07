// main .js 
const container = document.querySelector(".container"),
musicimge = container.querySelector(".cover_imge img"),
musicname = container.querySelector(".info .name"),
musicartist = container.querySelector(".info .artist"),
// musicaudio = container.querySelector(".main_audio #main_audio");
audio = new Audio(),
playpuasebtn =  container.querySelector(".controls #PlayButton"),
nextbtn =  container.querySelector("#next"),
prevbtn =  container.querySelector("#prev"),
progressbar = container.querySelector(".audio_part"),
mainAudio = container.querySelector(".main_audio"),
rebtn = container.querySelector("#repeat"),
shuffbtn = container.querySelector("#shuffle"),
musiclist =  container.querySelector(".music_list"),
musictag =  container.querySelector("#platlist_icon"),
musicclose =  container.querySelector("#close");
  
let musicindex= 1;
let isPlaying = false;

// window.addEventListener("load", ()=>
// {
//     loadMusic(musicindex);
// });

window.addEventListener("DOMContentLoaded", () => {
    loadMusic(musicindex);
});

// load function //
function loadMusic(indexnum) {
    if (indexnum > Allmusic.length) {
        musicindex = 1; // Loop back to first song
    } else if (indexnum < 1) {
        musicindex = Allmusic.length; // Loop back to last song
    }
    musicname.innerText = Allmusic[musicindex - 1].name;
    musicartist.innerText = Allmusic[musicindex - 1].artist;
    musicimge.src = Allmusic[musicindex - 1].img;
    audio.src = Allmusic[musicindex - 1].src;
    audio.load();
}
// playmusic //

function playMusic() {
    container.classList.add("paused");
    const icon = playpuasebtn.querySelector("i");
    if (icon) {  // Ensure icon exists
        icon.innerText = "pause";
    }
        audio.play();
  
}


function pauseMusic() {
    container.classList.remove("paused");  // Remove the paused class
    const icon = playpuasebtn.querySelector("i");
    if (icon) {
        icon.innerText ="play_arrow";
    }
    audio.pause();
}


function nextMusic() {
    musicindex++;
    loadMusic(musicindex);
    playMusic();

}



function prevMusic() 
{
    musicindex--;
    if (musicindex < 1) {
        musicindex =  Allmusic.length;  // Loop back to the first song
    }
    loadMusic(musicindex);
    playMusic();
}
playpuasebtn.addEventListener("click", () => {
    if (isPlaying) {
        setTimeout(pauseMusic,20); 
        playpuasebtn.classList.remove('bx-pause');
        playpuasebtn.classList.add('bx-play');
    } else
     {
        setTimeout(playMusic,20); 
        // Delay to ensure no overlap
        playpuasebtn.classList.remove('bx-play');
        playpuasebtn.classList.add('bx-pause');
    }
    isPlaying = !isPlaying;
});



// next , prev button //
nextbtn.addEventListener("click", ()=>
    {
        console.log("next Button");
        nextMusic();
    });

prevbtn.addEventListener("click", ()=>
        {
            console.log("prev Button");
            prevMusic();
        });

audio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progresWidth = (currentTime / duration) * 100;
    progressbar.style.width = `${progresWidth}%`;

    let musiccurrentTime = container.querySelector(".current_time"),
        musicDuration = container.querySelector(".end_time");

    // Only load duration once
    if (!isNaN(duration)) {
        let totalmin = Math.floor(duration / 60);
        let totalsec = Math.floor(duration % 60);
        if (totalsec < 10) {
            totalsec = `0${totalsec}`;
        }
        musicDuration.innerText = `${totalmin} : ${totalsec}`;
    }

    let currentmin = Math.floor(currentTime / 60);
    let currentsec = Math.floor(currentTime % 60);
    if (currentsec < 10) {
        currentsec = `0${currentsec}`;
    }
    musiccurrentTime.innerText = `${currentmin} : ${currentsec}`;
});


// update main audio up and down // 
mainAudio.addEventListener("click", (e) => {
    let progresWidth = mainAudio.clientWidth;  // Ensure this is the correct width
    let clickedOffsetX = e.offsetX;
    let songDuration = audio.duration;
    audio.currentTime = (clickedOffsetX / progresWidth) * songDuration;
    playMusic();  // Play music after seeking
});


musictag.addEventListener("click", ()=>
    {
        musiclist.classList.toggle("show");
    });
    
musicclose.addEventListener("click", ()=>
        {
            musictag.click();
        });

// Corrected search functionality
// Corrected search functionality


// repeat an shuffle function /// 

let isRepeating = false;

rebtn.addEventListener("click", () => {
    isRepeating = !isRepeating;
    audio.loop = isRepeating; // Enable/disable looping

    // Optionally, change the icon or style based on repeat status
    if (isRepeating) {
        rebtn.classList.add("active"); 
        audio.currentTime=0;
    loadMusic(musicindex);
    playMusic();// Add active style
    }
    else {
        rebtn.classList.remove("active");
    }
});

let isShuffling = false;

shuffbtn.addEventListener("click", () => {
    isShuffling = !isShuffling;

    if (isShuffling) {
        shuffleArray(Allmusic); // Shuffle your playlist array
        musicindex = 1;  // Optionally reset to the first song after shuffling
        loadMusic(musicindex);  // Load the first song in the shuffled playlist
        playMusic();  // Start playing the shuffled playlist
        shuffbtn.classList.add("active"); // Add active class for visual feedback
    } else {
        shuffbtn.classList.remove("active");
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// play  song from  playlist // 


// Add click event to each <li> element
const song = Allmusic[musicindex-1];
audio.src = song.src ;
document.querySelector(".name").innerText = song.name;     // Update song name
document.querySelector(".artist").innerText = song.artist; // Update artist name
document.querySelector(".cover_imge img").src = song.img; 
audio.load();
audio.play();

function playSong(index) {
  // Ensure the index is within bounds
  if (index >= 1 && index <= Allmusic.length) {
    musicindex = index;  // Update music index
   
  } else {
    console.log("Invalid song index");
  }
};

