const audioList = [
  "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3",
  "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3",
  "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3",
  "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3",
  "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3",
  "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3",
  "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3",
  "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3",
  "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3",
  "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3",
  "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3",
  "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3",
];

const audioPlayers = document.querySelectorAll(".audio-player");
const audioPlayerList = Array.from(audioPlayers);

audioList.forEach((item, index) => {
  const audio = new Audio(item);
  const audioPlayer = audioPlayerList[index];

  audio.addEventListener(
    "loadeddata",
    () => {
      audioPlayer.querySelector(".time .length").textContent =
        getTimeCodeFromNum(audio.duration);
      audio.volume = 0.75;
    },
    false
  );

  //click on timeline to skip around
  const timeline = audioPlayer.querySelector(".timeline");
  timeline.addEventListener(
    "click",
    (e) => {
      const timelineWidth = window.getComputedStyle(timeline).width;
      const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
      audio.currentTime = timeToSeek;
    },
    false
  );

  //click volume slider to change volume
  const volumeSlider = audioPlayer.querySelector(
    ".controls .volume-percentage__wrap"
  );
  volumeSlider.addEventListener(
    "click",
    (e) => {
      const sliderWidth = window.getComputedStyle(volumeSlider).width;
      const newVolume = e.offsetX / parseInt(sliderWidth);
      audio.volume = newVolume;
      audioPlayer.querySelector(".controls .volume-percentage").style.width =
        newVolume * 100 + "%";
    },
    false
  );

  //check audio percentage and update time accordingly
  setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress");
    progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    audioPlayer.querySelector(".time .current").textContent =
      getTimeCodeFromNum(audio.currentTime);
  }, 500);

  //toggle between playing and pausing on button click
  const playBtn = audioPlayer.querySelector(".controls .toggle-play");
  playBtn.addEventListener(
    "click",
    () => {
      if (audio.paused) {
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        audio.play();
      } else {
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audio.pause();
      }
    },
    false
  );

  audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = audioPlayer.querySelector(".volume-container .volume");
    audio.muted = !audio.muted;
    if (audio.muted) {
      volumeEl.classList.remove("volume__on");
      volumeEl.classList.add("volume__off");
    } else {
      volumeEl.classList.add("volume__on");
      volumeEl.classList.remove("volume__off");
    }
  });

  //turn 128 seconds into 2:08
  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }
});
