const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    // Get length of the outline
    const outlinelength = outline.getTotalLength();
    console.log(outlinelength);
    //Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlinelength;
    outline.style.strokeDashoffset = outlinelength;

// Pick different sounds
sounds.forEach(sound =>{
    sound.addEventListener('click', function(){
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        checkplaying(song);
    });
});    

// play sound
    play.addEventListener('click', () =>{
        checkplaying(song);
    });

// Select sound
timeSelect.forEach(option =>{
    option.addEventListener('click', function(){
        fakeDuration = this.getAttribute('data-time');
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
            fakeDuration % 60
        )}`;
    });
})    

// Function to stop & play sounds
const checkplaying = song =>{
    if(song.paused){
        song.play();
        video.play();
        play.src = './svg/pause.svg';
    }else{
        song.pause();
        video.pause();
        play.src = './svg/play.svg';
    }
 };

// Animate the circle
 song.ontimeupdate = () => {
     let currentTime = song.currentTime;
     let elapsed = fakeDuration - currentTime;
     let seconds = Math.floor(elapsed % 60);
     let minutes = Math.floor(elapsed / 60);

     //Animte the circle
     let progress = outlinelength - (currentTime / fakeDuration) * outlinelength;
     outline.style.strokeDashoffset = progress;
     // Animate the text
     timeDisplay.textContent = `${minutes}:${seconds}`;

     if(currentTime >= fakeDuration){
         song.pause();
         song.currentTime = 0;
         play.src = './svg/play.svg';
         video.pause();
     }
 };
};

app();


