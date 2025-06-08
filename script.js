console.log("yayyy lets make spooooootify .....woohooo!!!!!!");
let current_song=new Audio();
let songs;      //global variable
let currFolder;


function timestamp(seconds){
    if (isNaN(seconds) || seconds < 0){
        return "00:00";
    }
    const minutes = Math.floor(seconds/60);
    const remaining_seconds = Math.floor(seconds%60);

    const new_minutes=String(minutes).padStart(2,'0');
    const new_seconds=String(remaining_seconds).padStart(2,'0');

    return `${new_minutes}:${new_seconds}`;
}

async function getSongs(folder) {

    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:3000/spotify_clone/songs/${folder}`);
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as);
    songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`${folder}/`)[1]);
        }
    }
    //show all the songs in playlist    
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                            <img src="music.svg" alt="music_folder">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>Addyy</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img id="play2"  src="play2.svg" alt="play">
                            </div>
                             </li>`;
    }

let lis = document.querySelector(".songlist").getElementsByTagName("li");
Array.from(lis).forEach(e=>{
    e.addEventListener("click",element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML.trim());
        playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    })
})
}
const playmusic=(track,pause=false)=>{
    // let audio = new Audio("songs/"+track);
    current_song.src = `songs/${currFolder}/`+track;     //-/
    // current_song.src = `/${currFolder}/${encodeURIComponent(track)}`;

    // current_song.src = `${currFolder}/${encodeURIComponent(track)}`;

    if(!pause){
        current_song.play();
        play.src="pause.svg";
    }
    // play2.src="pause2.svg";
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function displayAlbums() {
      let a = await fetch(`http://127.0.0.1:3000/spotify_clone/songs/`);
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchorTag = div.getElementsByTagName("a");
    Array.from(anchorTag).forEach(e=>{
        if(e.href.includes("/songs")){
            console.log(e.href);
        }
    })
}

async function main() {
    await getSongs("favourites");  //-/
    playmusic(songs[0],true);
    console.log(songs);

    //display playlists dynamically
    displayAlbums();


play.addEventListener("click",()=>{
    if(current_song.paused){
        current_song.play();
        play.src="pause.svg";
        // play2.src="pause2.svg";
        
    }
    else{
        current_song.pause();
        play.src="play.svg";
        // play2.src="play2.svg";
    }
})
    //listen for time updatde event
    current_song.addEventListener("timeupdate",()=>{
        // console.log(current_song.currentTime,current_song.duration);
        document.querySelector(".songtime").innerHTML= `${timestamp(current_song.currentTime)} / ${timestamp(current_song.duration)}`;
    
        document.querySelector(".circle").style.left = ((current_song.currentTime/current_song.duration)*100)+"%";
    })
    

    //add evemt listener to seekbar
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent = ((e.offsetX/e.target.getBoundingClientRect().width)*100);
        document.querySelector(".circle").style.left=percent + "%";
        
        current_song.currentTime=(percent*current_song.duration)/100;
    })

    //adding event listener to prev next buttons
    previous.addEventListener("click",()=>{
        let index = songs.indexOf( current_song.src.split("/").slice(-1)[0]);
        if(index-1>=0){
            playmusic(songs[index-1]);
        }
    })
    next.addEventListener("click",()=>{
        let index = songs.indexOf( current_song.src.split("/").slice(-1)[0]);
        if(index+1<songs.length){
            playmusic(songs[index+1]);
        }

    })

    //card playlist
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        // console.log(e);
        e.addEventListener("click",async item=>{
            console.log(item.currentTarget.dataset.folder);
            songs = await getSongs(`${item.currentTarget.dataset.folder}`);
        })
    })
}
main();