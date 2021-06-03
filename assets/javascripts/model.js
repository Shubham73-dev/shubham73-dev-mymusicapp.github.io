// function Playlist(id, name, url, thumbnail) {
//     this.id = id;
//     this.name = name;
//     this.url = usl;
//     this.thumbnail = thumbnail;
// }

class Playlist {
    constructor(id, name, url, thumbnail) {
        this.id = id;
        this.name = name;
        this.song_url = url;
        this.thumbnail = thumbnail;
    }
}

var playlist_obj = {
    my_playlist : [],
    addSong : function(id, song_name, url, thumbnail) {
        var obj = new Playlist(id, song_name, url, thumbnail);
        this.my_playlist.push(obj);
        console.log(this.my_playlist);
    },
    deleteSong : function(id) {
        // for(var i = 0; i < this.my_playlist.length; i++) {
        //     if (id == this.my_playlist[i].id) {
        //         var song_obj = this.my_playlist[i];
        //         break;
        //     }
        // }
        // console.log(song_obj);
        // var song_obj = this.my_playlist.filter(function(obj){
        //     return id == obj.id;
        // });

        this.my_playlist = this.my_playlist.filter(function(obj) {
            return obj.id != id;
        })

    },
    sortSong : function() {

    },
    searchSong : function() {

    }
}