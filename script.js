const allSongs = [
    {
        id: 1,
        title: "Operation Pyrite",
        artist: "MSR",
        duration: "4:22",
        src: "cc_src/Pyrite.mp3",
    },
    {
        id: 2,
        title: "Operation Blade",
        artist: "MSR",
        duration: "3:58",
        src: "cc_src/Blade.mp3",
    },    
    {
        id: 3,
        title: "Operation Cinder",
        artist: "MSR",
        duration: "4:13",
        src: "cc_src/Cinder.mp3",
    },    
    {
        id: 4,
        title: "Operation Lead Seal",
        artist: "MSR",
        duration: "3:40",
        src: "cc_src/Lead_Seal.mp3",
    },    
    {
        id: 5,
        title: "Operation Spectrum",
        artist: "MSR",
        duration: "4:27",
        src: "cc_src/Spectrum.mp3",
    },    
    {
        id: 6,
        title: "Operation Wild Scales",
        artist: "MSR",
        duration: "4:04",
        src: "cc_src/Wild_Scales.mp3",
    },
];

// set up audio and userdata
const audio = new Audio();
let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0,
};

// show playlist 
const renderSongs = (array) => {
    const songsHTML = array.map((song) => {
        return `
        <li id="song-${song.id}" class ="playlist-song">
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
});

// pause song
const pauseButton = document.getElementById("pause");
const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime;
    playButton.classList.remove("playing");
    audio.pause();
};
pauseButton.addEventListener("click", pauseSong);

const playNextSong = () => {
    if (userData?.currentSong == null){
        playSong(userData?.songs[0].id);
    } else {
        const currentSongIndex = getCurrentSongIndex();
        const nextSong = userData?.songs[currentSongIndex+1];
        playSong(nextSong.id);
    }    
};

// create song index
const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

const playPreviousSong = () => {

};

// hightlight the current playing song
// not working, needs fix
const highlightSongs = () => {
    const playlistSongsElement = document.querySelectorAll('.playlist-songs'); //return a NodeList, not an array
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

renderSongs(userData?.songs);

