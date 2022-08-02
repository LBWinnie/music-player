//获取数据
let musicList = [];
fetch("./data.json")
  .then((res) => res.json())
  .then((ret) => {
    console.log(ret);
    musicList = ret;
    setMusic();
  });

const $ = (selector) => document.querySelector(selector);

const $playingBtn = $(".icon-pause");
const $preBtn = $(".icon-play-left");
const $nextBtn = $(".icon-play-right");
const $title = $(".player .texts h3");
const $author = $(".player .texts p");
const $time = $(".player .time");
const $progress = $(".player .progress");
const $bgPic = document.getElementById("bgPic");

let index = 0;
let clock = null;
let audioObject = $("#audio");

function setMusic() {
  let curMusic = musicList[index];
  audioObject.src = curMusic.src;
  $author.innerText = curMusic.author;
  $title.innerText = curMusic.title;
  $bgPic.src = curMusic.img;
  if ($playingBtn.classList.contains("icon-playing")) {
    audioObject.play();
  }
  // audioObject.play();
  // audioObject.volume = 0.5;
}
function secondToText(second) {
  second = parseInt(second);
  let min = parseInt(second / 60);
  let sec = second % 60;
  sec = sec < 10 ? "0" + sec : "" + sec;
  //sec = (sec + "").length == 1 ? "0" + sec : sec;
  return min + ":" + sec;
  //当秒数是个位数时前面补0，例如已播放3s时显示0:03
}
$playingBtn.onclick = function () {
  if (this.classList.contains("icon-pause")) {
    this.classList.remove("icon-pause");
    this.classList.add("icon-playing");
    audioObject.play();
    audioObject.volume = 0.5;
    // console.log(audioObject.duration);
    // console.log(audioObject.currentTime);
    clock = setInterval(function () {
      let curTime = audioObject.currentTime;
      let totalTime = audioObject.duration;
      let percent = curTime / totalTime;
      $progress.style.width = percent * 100 + "%";
      $time.innerText = secondToText(curTime) + " / " + secondToText(totalTime);
      // console.log(curTime, totalTime);
      // console.log(secondToText(curTime), secondToText(totalTime));
    }, 1000);
  } else {
    this.classList.remove("icon-playing");
    this.classList.add("icon-pause");
    audioObject.pause();
    clearInterval(clock);
  }
};

$nextBtn.onclick = function () {
  index = ++index % musicList.length;
  curMusic = musicList[index];
  setMusic();
};

$preBtn.onclick = function () {
  index--;
  index = (index + musicList.length) % musicList.length;
  setMusic();
};

//音频可视化
let audioElement = $("#audio");
let canvasElement = $("#canvas");
let wave = new Wave(audioElement, canvasElement);

wave.addAnimation(
  new wave.animations.Square({
    count: 30,
  })
);
