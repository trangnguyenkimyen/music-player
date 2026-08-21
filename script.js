// Dữ liệu lrc
const rawLrc = `
[00:02.12]Take a seat
[00:04.44]Right over there, sat on the stairs
[00:06.50]Stay or leave
[00:08.59]The cabinets are bare, and I'm unaware
[00:10.97]Of just how we got into this mess, got so aggressive
[00:15.62]I know we meant all good intentions
[00:19.13]So pull me closer
[00:21.12]Why don't you pull me close?
[00:23.52]Why don't you come on over?
[00:25.80]I can't just let you go
[00:28.51]Oh, baby
[00:31.33]Why don't you just meet me in the middle?
[00:35.48]I'm losing my mind just a little
[00:39.95]So why don't you just meet me in the middle?
[00:44.23]In the middle
[00:47.03]Baby
[00:49.28]Why don't you just meet me in the middle?
[00:53.59]I'm losing my mind just a little
[00:57.90]So why don't you just meet me in the middle?
[01:02.14]In the middle
[01:04.26]Oh, take a step
[01:07.16]Back for a minute, into the kitchen
[01:09.50]Floors are wet
[01:11.43]And taps are still running, dishes are broken
[01:14.08]How did we get into this mess? Got so aggressive
[01:18.39]I know we meant all good intentions
[01:22.06]So pull me closer
[01:23.93]Why don't you pull me close?
[01:26.34]Why don't you come on over?
[01:28.44]I can't just let you go
[01:31.37]Oh, baby
[01:34.06]Why don't you just meet me in the middle?
[01:38.39]I'm losing my mind just a little
[01:42.79]So why don't you just meet me in the middle?
[01:46.93]In the middle
[01:50.46]Looking at you, I can't lie
[01:52.91]Just pouring out admission
[01:55.27]Regardless of my objection, oh-oh
[01:59.39]And it's not about my pride
[02:01.92]I need you on my skin, just
[02:04.18]Come over, pull me in, just-
[02:07.31]Oh, baby
[02:10.06]Why don't you just meet me in the middle?
[02:14.15]I'm losing my mind just a little
[02:18.55]So why don't you just meet me in the middle?
[02:22.88]In the middle, no, no
[02:25.77]Baby
[02:27.95]Why don't you just meet me in the middle? Oh yeah
[02:32.18]I'm losing my mind just a little
[02:36.67]So why don't you just meet me in the middle? Oh
[02:40.89]In the middle
[02:43.63]Baby
[02:45.93]Why don't you just meet me in the middle, baby?
[02:50.09]I'm losing my mind just a little
[02:54.66]So why don't you just meet me in the middle, middle?
[02:58.73]In the middle, middle
`;

function parseLrc(lrcString) {
  const lines = lrcString.split("\n");
  const result = [];
  const regex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;
  for (let line of lines) {
    const match = regex.exec(line);
    if (match) {
      const time =
        parseInt(match[1], 10) * 60 +
        parseInt(match[2], 10) +
        parseInt(match[3], 10) / (match[3].length === 3 ? 1000 : 100);
      result.push({ time, text: match[4].trim() });
    }
  }
  return result;
}

const lyricsData = parseLrc(rawLrc);

const audio = document.getElementById("my-audio");
const currentLyricEl = document.getElementById("current-lyric");
const playBtn = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const discSpin = document.getElementById("disc-spin");

// --- Khai báo mã SVG ---
const playIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
const pauseIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = pauseIcon;
    discSpin.style.animationPlayState = "running";
  } else {
    audio.pause();
    playBtn.innerHTML = playIcon;
    discSpin.style.animationPlayState = "paused";
  }
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

let currentActiveIndex = -1;
let lastUpdateTime = 0;

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;

  if (Date.now() - lastUpdateTime > 250) {
    if (audio.duration) {
      progressBar.value = (currentTime / audio.duration) * 100;
      currentTimeEl.innerText = formatTime(currentTime);
    }
    lastUpdateTime = Date.now();
  }

  let activeIndex = -1;
  for (let i = 0; i < lyricsData.length; i++) {
    if (currentTime >= lyricsData[i].time) {
      activeIndex = i;
    } else {
      break;
    }
  }

  if (activeIndex !== currentActiveIndex && activeIndex !== -1) {
    currentActiveIndex = activeIndex;
    currentLyricEl.style.opacity = 0;

    // Yêu cầu trình duyệt lên lịch chuyển đổi khung hình tiếp theo
    requestAnimationFrame(() => {
      setTimeout(() => {
        const rawText = lyricsData[activeIndex].text || "♪ ♪ ♪";
        const parts = rawText.split(" | "); // Tách chuỗi

        if (parts.length > 1) {
          // Dùng innerHTML thay vì innerText để chèn thẻ HTML
          currentLyricEl.innerHTML = `${parts[0]}<br><span class="trans">${parts[1]}</span>`;
        } else {
          currentLyricEl.innerHTML = rawText;
        }

        currentLyricEl.style.opacity = 1;
      }, 200);
    });
  }
});

audio.addEventListener("ended", () => {
  playBtn.innerHTML = playIcon;
  progressBar.value = 0;
  currentTimeEl.innerText = "0:00";
  discSpin.style.animationPlayState = "paused";
});
