//Html Element
let audioElement = document.createElement('audio');
let gif = document.getElementById('gif');
let play_button = document.getElementById('play');
let seekbar = document.getElementById('seek-bar');
let current_song_photo = document.getElementById('song-photo');
let song_icon = document.getElementsByClassName('songicon');
let play_each_song = Array.from(document.getElementsByClassName('playsong'));
let songIndex = 0;
let song_name = document.getElementsByClassName('songname');
let song_duration = document.getElementsByClassName('songduration');
let forward_button = document.getElementById('forward')
let backward_button = document.getElementById('backward')
let song_heading = document.getElementById('songInfo')
let currentT = document.getElementById('offset-start')
let durationT = document.getElementById('offset-end')
let upArrow=document.getElementsByClassName('up-arrow')[0]

//Auto Trigger
let anchor=document.getElementById('anchor')

//List of all song
songInfo = [
    { 'icon': 'images/1.jpg', 'name': 'NO STYLIST', 'duration': 'idk', 'src': ' { 'Destroy_Lonely_-_NO_STYLIST.mp3' },
    { 'icon': 'images/1.jpg', 'name': '734 juice wrld', 'duration': 'idk', 'src': ' { 'Juice_WRLD_-_734_360mp3.com.ng.mp3' },
    { 'icon': 'images/1.jpg', 'name': 'Candles Juice WRLD', 'duration': 'idk', 'src': ' { 'Juice_WRLD_-_Candles_360mp3.com.ng.mp3' },
    { 'icon': 'images/1.jpg', 'name': 'Im Still Juice WRLD', 'duration': 'idk', 'src': ' { 'Juice_WRLD_-_Im_Still_360mp3.com.ng.mp3' },
    { 'icon': 'images/1.jpg', 'name': 'Long Gone Juice WRLD', 'duration': 'idk', 'src': ' { 'Juice_WRLD_-_Long_Gone_360mp3.com.ng.mp3' },
    { 'icon': 'images/1.jpg', 'name': 'Used To Juice WRLD', 'duration': 'idk', 'src': ' { 'Juice_WRLD_-_Used_To_360mp3.com.ng.mp3' },
    { 'icon': 'images/1.jpg', 'name': 'Go Hard Juice WRLD', 'duration': 'idk', 'src': ' { 'Juice_Wrld_-_Go_Hard_360mp3.com.ng.mp3' },
    { 'icon': 'images/1.jpg', 'name': 'If Looks Could Kill', 'duration': 'idk', 'src': ' { 'destroy_lonely_if_looks_could_kill_official_audio_mp3_72177.mp3' },
    { 'icon': 'images/1.jpg', 'name': 'Die To Live', 'duration': 'idk', 'src': ' { 'die_to_live_mp3_72332.mp3' },
    { 'icon': 'images/1.jpg', 'name': 'autograph(on my line) juice wrld', 'duration': 'idk', 'src': ' { 'juice_wrld_autograph_on_my_line_official_audio_mp3_72049.mp3' },

 ]

let temp = []


for (let i = 0; i < 32; i++) {
    song_icon[i].src = songInfo[i]['icon'];
    song_name[i].innerHTML = songInfo[i]['name'];
    temp[i] = document.createElement('audio');
    temp[i].src = songInfo[i]['src']
}

window.addEventListener('load', () => {
    for (let i = 0; i < 32; i++) {
        song_duration[i].innerHTML = timeConvert(temp[i].duration);

    }
})


//Time bar setting
function timeConvert(time) {

    minute = parseInt(time / 60).toString().padStart(2, '0');
    second = parseInt(time % 60).toString().padStart(2, '0');
    T = minute + ':' + second;
    return T;
}


//Audio element Default Setting
audioElement.src = "songs/1.mp3";
currentT.innerHTML = timeConvert(0)
durationT.innerHTML = timeConvert(0)
audioElement.volume = .5;



//Play And Pause Audio
percent_played = seekbar.value


function seekBarPlay() {
    durationT.innerHTML = song_duration[songIndex].innerHTML;
    if (audioElement.paused) {
        anchor.click()
        
        upArrow.href="#n"+(songIndex+2);
        console.log(upArrow.href)


        if(songIndex==0)
        current_song_photo.src = song_icon[songIndex].src;
        audioElement.play();
        console.log('playing..');
        play.src = 'images/pause.svg';
        gif.style.opacity = 1;
        play_each_song[songIndex].src = 'images/pause.svg';


    }
    else {
        audioElement.pause();
        play.src = 'images/main-play-button.svg';
        gif.style.opacity = 0;
        play_each_song[songIndex].src = "images/play-solid.svg";
    }
}


//Update these when song index change
function updateInfo() {
    audioElement.src = songInfo[songIndex]['src'];
    current_song_photo.src = song_icon[songIndex].src;
    song_heading.innerHTML = songInfo[songIndex]['name'];
}


//SeekBar
play.addEventListener('click', () => {
    if (songIndex == 0)
        current_song_photo.src = song_icon[0].src;
    seekBarPlay();
})


//SeekBar update
audioElement.addEventListener('timeupdate', () => {
    if (isNaN(audioElement.duration)) {
        seekbar.value = 0; percent_played = seekbar.value;
        console.log("NANA")

    }
    else
        if (audioElement.currentTime == audioElement.duration) {
            seekbar.value = 0;
            percent_played = seekbar.value;
            play.src = 'images/main-play-button.svg';

            gif.style.opacity = 0;
            play_each_song[songIndex].src = "images/play-solid.svg";

            playNext();
            console.log('complete!')
            console.log(songIndex)
            if (songIndex == 31) {
                audioElement.pause();
                currentT.innerHTML = timeConvert(0);
                durationT.innerHTML = timeConvert(0);
                songIndex = 0;
                audioElement.src = songInfo[songIndex]['src'];
                current_song_photo.src = 'images/background1.jpg';


            }
        }
        else {
            if (seekbar.value != percent_played) {
                audioElement.currentTime = parseFloat(((seekbar.value * audioElement.duration) / 100).toFixed(8));
            }
            percent_played = parseFloat(((audioElement.currentTime / audioElement.duration) * 100).toFixed(8));  //It was toPrecision(2) before instead of toFixed(2)

            seekbar.value = percent_played;
            currentT.innerHTML = timeConvert(audioElement.currentTime);
        }
})

/* I detect a glitch first is that because less precision of seek bar value audioElement's current time is not update perfectly
so i increase it's precision upto 7-8 decimal.*/
/*Second one was for when i paused a audio and then just increment the seek bar then play audio then it just memorize's last audio an chunk
to avoid that i have to detect the problem, so problem is that when pause audio and after seek bar updation i run it, it simply takes a very very short time but in that it repetated chunk
so apply click event listener on seek bar so my audioElement's current time would updated just before i play it*/
seekbar.addEventListener('click', () => {
    audioElement.currentTime = (seekbar.value * audioElement.duration) / 100;
    seekbar.value = percent_played;

})


//Play From Navigatin Bar
function stopAll() {
    play_each_song.forEach((element, i) => {
        audioElement.pause();
        play_each_song[i].src = "images/play-solid.svg";

    })
}

play_each_song.forEach((element, i) => {
    element.addEventListener('click', () => {
        if (i != songIndex) {
            stopAll();
            songIndex = i;
            updateInfo()

        }
        seekBarPlay();
    })
})


//Next Song
function playNext() {
    if (songIndex < 15) {
        songIndex += 1;
        updateInfo()
        stopAll();
        seekBarPlay();
    }
}

forward_button.addEventListener('click', () => {
    playNext();
})


//Previous song
function playPrevious() {
    if (songIndex > 0) {
        songIndex -= 1;
        updateInfo()
        stopAll();
        seekBarPlay();
    }

}

backward_button.addEventListener('click', () => {
    playPrevious();
})


//Volume control
let volume=document.getElementsByClassName('updown-volume')[0]

volume.addEventListener('click', () => {
        audioElement.volume=volume.value/100;
        console.log(audioElement.volume)
})

audioElement.addEventListener('timeupdate',()=>
{
    audioElement.volume=volume.value/100;
   
})



//search song
let searchBar=document.getElementsByClassName('search-bar')[0]
let searchGlass=document.getElementsByClassName('search-glass')[0]
let searchResult=document.getElementsByClassName('result')[0]
let childs=Array.from(searchResult.querySelectorAll('div'))
let searchFor=searchBar.value.toUpperCase();
searchResult.addEventListener('click',()=>{
    childs=Array.from(searchResult.querySelectorAll('div'))
    console.log("Parent clicked"+childs)
    childs.forEach((element,i)=>{
        console.log('child are triggered!')
            element.addEventListener('click',()=>
            {
                anchor.href="#n"+i;
                console.log(`id${anchor.href}`);
                anchor.click()
            })
        })
    
})





searchBar.addEventListener('keyup',()=>
{   childs=Array.from(searchResult.querySelectorAll('div'));

   
    childs.forEach((element,i)=>{
        element.remove();
       
    })

    searchFor=searchBar.value.toUpperCase();
   
    if(searchFor!='')
    for(let i=0;i<32;i++)
    {   
        if((song_name[i].innerHTML.toUpperCase().indexOf(searchFor))!=-1) 
           {
               let child=document.createElement('div');
               child.innerHTML=song_name[i].innerHTML;
               searchResult.appendChild(child)
               
       }
    }
   
     
})

searchBar.addEventListener('search',()=>{
      
    childs=Array.from(searchResult.querySelectorAll('div'));
    
        childs.forEach((element,i)=>{
            element.remove();
            console.log('removed!')
        })
   
      


})





