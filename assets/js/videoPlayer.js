const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
};

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerText = formatDate(videoPlayer.currentTime);
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerText = totalTimeString;
  setInterval(getCurrentTime, 1000);
}
function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeRange.value = videoPlayer.volume;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullscreen) {
    videoContainer.mozRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  }

  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
}
function exitFullScreen() {
  if (document.exitFullscreen) {
    document.requestFullscreen();
  } else if (document.mozExitFullscreen) {
    document.mozExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.removeEventListener("click", exitFullScreen);
  fullScreenBtn.addEventListener("click", goFullScreen);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.7) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function init() {
  videoPlayer.volume = 0.5;
  videoPlayer.currentTime = 260;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
}

if (videoContainer) {
  init();
}
