let musicList = [
  {
    src: "../audio/HoneycombSummer.mp3",
    title: "蜂巢夏日",
    author: "Crazy:B",
    img: "../img/cb.jpg",
  },
  {
    src: "../audio/LemonSquashCheers!.mp3",
    title: "柠檬气泡水干杯!",
    author: "Crazy:B & 2Wink",
    img: "../img/cb2wk.jpg",
  },
];

const $ = (selector) => document.querySelector(selector);

const $pauseBtn = $(".icon-pause");
const $preBtn = $(".icon-play-left");
const $nextBtn = $(".icon-play-right");
const $title = $(".player .texts h3");
const $author = $(".player .texts p");
const $time = $(".player .time");

let index = 0;
let audioObject = new Audio();
setMusic();

function setMusic() {
  let curMusic = musicList[index];
  audioObject.src = curMusic.src;
  $author.innerText = curMusic.author;
  $title.innerText = curMusic.title;
  audioObject.play();
  audioObject.volume = 0.2;
}

$pauseBtn.onclick = function () {
  if (this.classList.contains("icon-pause")) {
    this.classList.remove("icon-pause");
    this.classList.add("icon-playing");
    audioObject.play();
    audioObject.volume = 0.2;
    console.log(audioObject.duration);
    console.log(audioObject.currentTime);
  } else {
    this.classList.remove("icon-playing");
    this.classList.add("icon-pause");
    audioObject.pause();
  }
};

$nextBtn.onclick = function () {
  index = ++index % musicList.length;
  curMusic = musicList[index];
  setMusic();
  if ($pauseBtn.classList.contains("icon-pause")) {
    $pauseBtn.classList.remove("icon-pause");
    $pauseBtn.classList.add("icon-playing");
  }
};

$preBtn.onclick = function () {
  index--;
  index = (index + musicList.length) % musicList.length;
  setMusic();
  if ($pauseBtn.classList.contains("icon-pause")) {
    $pauseBtn.classList.remove("icon-pause");
    $pauseBtn.classList.add("icon-playing");
  }
};
// let $pauseBtn = document.querySelector(".icon-pause");
// let $$btns = document.querySelectorAll(".iconfont");
// let $nextBtn = document.querySelector(".icon-play-right");

// let audioObject = new Audio("../audio/HoneycombSummer.mp3");
// $pauseBtn.onclick = function (e) {
//   if ($pauseBtn.classList.contains("icon-pause")) {
//     $pauseBtn.classList.remove("icon-pause");
//     $pauseBtn.classList.add("icon-playing");
//     audioObject.play();
//     audioObject.volume = 0.2;
//     console.log(audioObject.duration);
//     console.log(audioObject.currentTime);
//   } else {
//     $pauseBtn.classList.remove("icon-playing");
//     $pauseBtn.classList.add("icon-pause");
//     audioObject.pause();
//   }
// };

// $nextBtn.onclick = function () {
//   audioObject.src = "../audio/LemonSquashCheers!.mp3";
//   audioObject.play();
//   audioObject.volume = 0.2;
// };
