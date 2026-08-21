// Dữ liệu lrc
const rawLrc = `
[00:07.59]If I told you this was only gonna hurt
[00:11.36]If I warned you that the fire's gonna burn
[00:14.79]Would you walk in? Would you let me do it first?
[00:18.65]Do it all in the name of love
[00:21.69]Would you let me lead you, even when you're blind?
[00:25.47]In the darkness, in the middle of the night
[00:29.28]In the silence, when there's no one by your side
[00:32.89]Would you call in the name of love?
[00:35.60]In the name of love
[00:39.13]Name of love
[00:42.68]In the name of love
[00:46.37]Name of love
[00:49.56]In the name of-
[00:52.62](In the name, name-)
[01:00.24](In the name, name-)
[01:04.63]If I told you we could bathe in all the lights
[01:08.48]Would you rise up, come and meet me in the sky?
[01:11.91]Would you trust me when you're jumping from the heights?
[01:15.76]Would you fall in the name of love?
[01:18.99]When there's madness, when there's poison in your head
[01:22.84]When the sadness leaves you broken in your bed
[01:26.39]I will hold you in the depths of your despair
[01:30.16]And it's all in the name of love
[01:32.66]In the name of love
[01:36.52]Name of love
[01:40.09]In the name of love
[01:43.78]Name of love
[01:46.79]In the name of-
[01:49.82](In the name, name-)
[01:57.31](In the name, name-)
[02:02.32]I wanna testify
[02:05.99]Scream in the holy light
[02:09.27]You bring me back to life
[02:13.03]And it's all in the name of love
[02:16.74]I wanna testify
[02:20.46]Scream in the holy light
[02:23.91]You bring me back to life
[02:27.21]And it's all in the name of love
[02:30.15]In the name of love
[02:33.60]Name of love
[02:37.24]In the name of love
[02:41.02]Name of love
[02:44.18]In the name of-
[02:47.51](In the name, name-)
[02:54.84](In the name, name-)
[02:58.23](In the name of-)
[03:05.53](In the name, name-)
[03:09.02](In the name of-)
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
