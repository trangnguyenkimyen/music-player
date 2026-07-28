// Dữ liệu lrc
const rawLrc = `
[00:00.000] I'm so in love, I'm so in love
[00:02.472] I don't ever wanna stop this ride that we're on
[00:05.992] I don't ever wanna say goodbye
[00:08.633] Then all of those nights, they would just be all for nothing
[00:13.849] Third of October
[00:16.134] We were never sober
[00:17.833] First few times that we hung out
[00:19.588] But we fell in love somehow
[00:21.477] First time that I met you
[00:23.181] I didn't have a damn clue
[00:25.112] That I love everything about you
[00:26.876] Now I can't think of life without you
[00:29.778] Eh
[00:31.033] did you know that you're my whole heart?
[00:33.471] Eh
[00:34.618] did you know that I never stop?
[00:37.119] No
[00:38.188] Giving you everything I got 'cause I'm so
[00:43.659] I'm so in love, I'm so in love
[00:46.163] I don't ever wanna stop this ride that we're on
[00:49.454] I don't ever wanna say goodbye
[00:52.046] Then all of those nights,
[00:54.057] they would just be all for nothing
[00:56.931] Yeah, I'm so in love, I'm so in love
[01:00.571] I don't ever wanna stop this ride that we're on
[01:03.915] I don't ever wanna say goodbye
[01:06.654] Then all of those nights,
[01:08.699] they would just be all for nothing (yeah)
[01:13.111] I'll never go back, I'll never go
[01:16.891] Now that I know that, now that I know
[01:20.541] I'll never leave you by your own
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
let lastUpdateTime = 0; // Biến giới hạn fps thanh cuộn chống lag

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;

  // 1. CHỐNG LAG THANH THỜI GIAN: Chỉ cập nhật giao diện 4 lần/giây thay vì liên tục
  if (Date.now() - lastUpdateTime > 250) {
    if (audio.duration) {
      progressBar.value = (currentTime / audio.duration) * 100;
      currentTimeEl.innerText = formatTime(currentTime);
    }
    lastUpdateTime = Date.now();
  }

  // 2. CHẠY LỜI BÀI HÁT
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

    // Yêu cầu trình duyệt lên lịch chuyển đổi khung hình tiếp theo (chống khựng chữ)
    requestAnimationFrame(() => {
      setTimeout(() => {
        currentLyricEl.innerText = lyricsData[activeIndex].text || "♪ ♪ ♪";
        currentLyricEl.style.opacity = 1;
      }, 200);
    });
  }
});

// Khi hết bài nhạc
audio.addEventListener("ended", () => {
  playBtn.innerHTML = playIcon;
  progressBar.value = 0;
  currentTimeEl.innerText = "0:00";
  discSpin.style.animationPlayState = "paused";
});
