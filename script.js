let currentSong = new Audio();

async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();
  //console.log(response)

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  //console.log(as)
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

const playMusic = (track)=>{
    currentSong.src ="/songs/"+ track
    
    currentSong.play();
    play.src="pause.svg"

}

async function main() {
    
    //getting all song
    let songs = await getSongs();
    //console.log(songs);

    let songUl = document
        .querySelector(".songlist")
        .getElementsByTagName("ul")[0];
    //console.log(songUl);
    for (const song of songs) {
        songUl.innerHTML =
        songUl.innerHTML +
        `<li>   <img class ="invert" src="music.svg" alt="music">
        <div class="info">
        <div>${song.replaceAll("%20", " ")}</div>
        <div>Sonu Nigam</div>
        </div>
        <div class="playnow">
        <span>Play Now</span>
        <img src="play.svg" class="invert" alt="playnow">
        </div> </li>`;
    }

    // Attach an event listener to each Song

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e =>{

        e.addEventListener("click", element =>{
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
       
    })

    // Attach an event listener to play, next , prev button

    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src="pause.svg"
        }
        else{
            currentSong.pause()
            play.src="play.svg"
        }
    })
}
main();
