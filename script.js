const allSongs = [
    {
        id: 0,
        title: "Operation Barrenland",
        artist: "MSR",
        duration: "4:22",
        src: "cc_src/Barrenland.mp3",
    },
    {
        id: 1,
        title: "Operation Pyrite",
        artist: "MSR · Jason Walsh · Alan Day",
        duration: "4:22",
        src: "cc_src/Pyrite.mp3",
    },
    {
        id: 2,
        title: "Operation Blade",
        artist: "MSR · Obadiah Brown-Beach",
        duration: "3:58",
        src: "cc_src/Blade.mp3",
    },    
    {
        id: 3,
        title: "Operation Cinder",
        artist: "MSR · Matthew Carl Earl · Úyanga Bold",
        duration: "4:13",
        src: "cc_src/Cinder.mp3",
    },    
    {
        id: 4,
        title: "Operation Lead Seal",
        artist: "David Westbom · X.Ari",
        duration: "3:40",
        src: "cc_src/Lead_Seal.mp3",
    },    
    {
        id: 5,
        title: "Operation Spectrum",
        artist: "Steven Grove",
        duration: "4:27",
        src: "cc_src/Spectrum.mp3",
    },    
    {
        id: 6,
        title: "Operation Wild Scales",
        artist: "David Westbom · Kayraa",
        duration: "4:04",
        src: "cc_src/Wild_Scales.mp3",
    },
    {
        id: 7,
        title: "Operation Pine Soot",
        artist: "MSR · Life Awaits",
        duration: "4:23",
        src: "cc_src/Pine_Soot.mp3",
    },
    {
        id: 8,
        title: "Operation Dawnseeker",
        artist: "MSR · Terry Zhong",
        duration: "4:04",
        src: "cc_src/Dawnseeker.mp3",
    },
    {
        id: 9,
        title: "Operation Deepness",
        artist: "MSR · Vas Angelov · Bailey Jehl",
        duration: "3:46",
        src: "cc_src/Deepness.mp3",
    },
    {
        id: 10,
        title: "Operation Ashring",
        artist: "MSR · Erik Castro · X. ARI",
        duration: "4:04",
        src: "cc_src/Ashring.mp3",
    },
    {
        id: 11,
        title: "Operation Fake Waves",
        artist: "MSR · Erik Castro · David Lin",
        duration: "3:36",
        src: "cc_src/Fake_Waves.mp3",
    },
];

// set up audio and userdata
const audio = new Audio();
let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0,
};

// hightlight the current playing song
const highlightSongs = () => {
    const playlistSongsElement = document.querySelectorAll('.playlist-song'); //return a NodeList, not an array
    const songToHighlight = document.getElementById(
        `song-${userData?.currentSong?.id}`
    );
    playlistSongsElement.forEach((songEl) => {
        songEl.removeAttribute("aria-current");
    });
    if (songToHighlight){
        songToHighlight.setAttribute('aria-current', 'true');
    }
};

// play button
const playButton = document.getElementById("play");
const playSong = (id) => {
    const song = userData?.songs.find((song) => song.id === id);
    audio.src = song.src;
    audio.title = song.title;

    // check if there are any songs playing
    if (userData?.currentSong === null){
        audio.currentTime = 0;
    } else {
        audio.currentTime = userData?.songCurrentTime;
    }

    // after user press play, update currentSong
    userData.currentSong = song; 
    playButton.classList.add("playing");
    // and start the audio
    audio.play();
    setPlayerDisplay();
}

playButton.addEventListener("click", () => {
    if (userData?.currentSong == null){
        playSong(userData?.songs[0].id);
    } else {
        // continue to play the current song
        playSong(userData?.currentSong.id);
    }
    // add hightlight to current song playing
    highlightSongs();
    setPlayerDisplay();
});

// pause song
const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime;
    playButton.classList.remove("playing");
    audio.pause();
};
const pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", pauseSong);

// next song
const playNextSong = () => {
    if (userData?.currentSong == null){
        playSong(userData?.songs[0].id);
    } else {
        const currentSongIndex = getCurrentSongIndex();
        const nextSong = userData?.songs[currentSongIndex+1];
        playSong(nextSong.id);
    }    
    highlightSongs();
    setPlayerDisplay();
};
const nextButton = document.getElementById('next');
nextButton.addEventListener("click", playNextSong);

// play previous song
const playPreviousSong = () => {
    // copy from playNextSong, needs to recheck
    if (userData?.currentSong == null){
        playSong(userData?.songs[0].id);
    } else {
        const currentSongIndex = getCurrentSongIndex();
        const prevSong = userData?.songs[currentSongIndex-1];
        playSong(prevSong.id);
    }  
    highlightSongs();
    setPlayerDisplay();
};
const prevButton = document.getElementById('prev');
prevButton.addEventListener("click", playPreviousSong);

// shuffle playlist
const shuffleSongs = () => {
    
}

const shuffleButton = document.getElementById('shuffle');
shuffleButton.addEventListener("click", shuffleSongs);


// display current song
const setPlayerDisplay = () => {
    const playingSong = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const currentTitle = userData?.currentSong?.title;
    const currentArtist = userData?.currentSong?.artist;

    playingSong.textContent = (currentTitle) ? currentTitle:'';
    songArtist.textContent = (currentArtist) ? currentArtist:'';
};

// create song index
const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

// show playlist 
const renderSongs = (array) => {
    const songsHTML = array.map((song) => {
        return `
        <li id="song-${song.id}" class ="playlist-song" onclick="highlightSongs()">
        <button class="song-info" onclick="playSong(${song.id})">
            <span class="song-title">${song.title}</span>
            <span class="song-artist">${song.artist}</span>
            <span class="song-duration">${song.duration}</span>
        </button>
        `;
    }).join('');

    // the li tag at the end of the HTML file
    const playlistSongs = document.getElementById('playlist-songs');
    // change the HTML content of it to songsHTML
    playlistSongs.innerHTML = songsHTML;
};

// play song continuously
// needs to check if its working, the computer im on right now doesnt have any audio
audio.addEventListener('ended', () => {
    const currentSongIndex = getCurrentSongIndex();
    const nextSongExists = (currentSongIndex<allSongs.length-1);
    if (nextSongExists){
        playNextSong();
    } else {
        userData.currentSong = null;
        userData.songCurrentTime = 0;
        pauseSong();
        setPlayerDisplay();
        highlightSongs();
    }
});

renderSongs(userData?.songs);

