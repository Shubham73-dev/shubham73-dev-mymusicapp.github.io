window.addEventListener("load", initEvents);

var audio;
var range;
var togglePlay;
var togglePlayFlag = true;
function initEvents() {
    audio = document.querySelector('#audio');
    range = document.querySelector("input[type='range']");
    range.addEventListener('change', seekSong);
    togglePlay = document.querySelector('#toggle-play');
    document.querySelector('#stopSong').addEventListener('click', stopSong);
    loadAllSongs();
    loadPlaylist();
}

function loadAllSongs() {
    var ul = document.querySelector("#all_songs");
    songs.forEach(function(obj) {
        var li = document.createElement("li");
        var h5 = document.createElement('h5');
        var img = document.createElement("img");
        var add_btn = document.createElement("button");
        var play_btn = document.createElement("button");
        add_btn.className = 'btn btn-primary playlist_btn';
        play_btn.className = 'btn btn-primary play_btn';
        h5.innerHTML = obj.song_name;
        img.src = obj.song_thumbnail;
        add_btn.innerHTML = '<i class="fas fa-plus">';
        play_btn.innerHTML = '<i class="fas fa-play">';
        play_btn.setAttribute('title', obj.song_id);
        add_btn.setAttribute('title', obj.song_id);

        li.appendChild(img);
        li.appendChild(h5);
        li.appendChild(play_btn);
        li.appendChild(add_btn);

        ul.appendChild(li);

        play_btn.addEventListener("click", playSong);
        add_btn.addEventListener("click", add_to_playlist);
    });
}

function playSong() {
    var song_id = this.title;
    for(var i = 0; i < songs.length; i++) {
        if (song_id == songs[i].song_id) {
            var song_url = songs[i].song_url;
            current_song_idx = i;
            break
        }
    }
    audio.src = song_url;
    audio.play();

    setInterval(function() {
        range.value = (audio.currentTime / audio.duration) * 100;
        console.log("Playing",song_id);
    }, 1000);

    togglePlay.innerHTML = '<i class="fas fa-pause"></i>';
    togglePlay.addEventListener('click', togglePlayState);
    togglePlayFlag = false;

}

function togglePlayState() {
    if(togglePlayFlag) {
        audio.play();
        togglePlay.innerHTML = '<i class="fas fa-pause"></i>';
        togglePlayFlag = false;
    }
    else {
        audio.pause();
        togglePlay.innerHTML = '<i class="fas fa-play"></i>';
        togglePlayFlag = true;
    }
}

function stopSong() {
    audio.currentTime = 0;
    audio.pause();
}

function add_to_playlist() {
    var song_id = this.title;
    for(var i = 0; i < songs.length; i++) {
        if (song_id == songs[i].song_id) {
            var song_obj = songs[i];
            break
        }
    }
    playlist_obj.addSong(song_obj.song_id, song_obj.song_name,
                         song_obj.song_url, song_obj.song_thumbnail);
    showPlaylist();
}

function showPlaylist() {
    var ul = document.querySelector("#playlist");
    ul.innerHTML = "";
    playlist_obj.my_playlist.forEach(function(obj) {
        var li = document.createElement("li");
        var h5 = document.createElement('h5');
        var img = document.createElement("img");
        var delete_btn = document.createElement("button");
        var play_btn = document.createElement("button");
        delete_btn.className = 'btn btn-danger playlist_btn';
        play_btn.className = 'btn btn-primary play_btn';
        h5.innerHTML = obj.name;
        img.src = obj.thumbnail;
        delete_btn.innerHTML = '<i class="fas fa-trash">';
        play_btn.innerHTML = '<i class="fas fa-play">';
        play_btn.setAttribute('title', obj.id);
        delete_btn.setAttribute('title', obj.id);

        li.appendChild(img);
        li.appendChild(h5);
        li.appendChild(play_btn);
        li.appendChild(delete_btn);

        ul.appendChild(li);
        play_btn.addEventListener("click", playSong);
        delete_btn.addEventListener('click', deleteSong);
    });
    savePlaylist();
}

function seekSong() {
    audio.currentTime = this.value / 100 * audio.duration;
    // console.log(audio.currentTime);
}

function deleteSong() {
    var song_id = this.title;
    playlist_obj.deleteSong(song_id);
    showPlaylist();
}

function savePlaylist() {
    if(window.localStorage) {
        var data = JSON.stringify(playlist_obj.my_playlist);
        localStorage.setItem('data', data);
    }
    else {
        alert("Localstorage not supported...")
    }
}

function loadPlaylist() {
    if(window.localStorage) {
        if(localStorage.data) {
            var data = localStorage.getItem('data');
            playlist_obj.my_playlist = JSON.parse(data);
            showPlaylist();
        }
    }
    else {
        alert("Localstorage not supported...")
    }
}