let currentSong = new Audio();
let songs;

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

function secondsToMinutesAndSeconds(totalSeconds) {
    // Ensure the input is a non-negative number
    if (typeof totalSeconds !== 'number' || totalSeconds < 0 || isNaN(totalSeconds)) {
        return "00:00";
    }

    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Ensure leading zeros for both minutes and seconds
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    // Return the formatted time
    return `${formattedMinutes}:${formattedSeconds}`;
}

const playMusic = (track,ispaused=false)=>{
    currentSong.src ="/songs/"+ track

    if(!ispaused){
        currentSong.play();
        play.src="pause.svg"
    }
    
    
    
    document.querySelector(".songinfo").innerHTML=decodeURI(track.split(".")[0])
    document.querySelector(".songtime").innerHTML="00:00 / 00:00"

}

async function main() {
    
    //getting all song
     songs = await getSongs();
    playMusic(songs[0],true)
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

    //listen to timeupdate

    currentSong.addEventListener("timeupdate",()=>{
        //console.log(currentSong.currentTime,currentSong.duration)
        //console.log(secondsToMinutesAndSeconds(currentSong.currentTime))
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesAndSeconds(currentSong.currentTime)}/${secondsToMinutesAndSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 +"%"
    
    })

    //add event listener to seekbar

    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) *percent)/100;
    })

    // add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left= "0"
    })

    // add an event listener on close

    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left= -130+"%"
    })

    // add event listener to previous and next

    previous.addEventListener("click", () => {
        currentSong.pause()
        console.log("Previous clicked")
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        currentSong.pause()
        console.log("Next clicked")

        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })


}
main();
