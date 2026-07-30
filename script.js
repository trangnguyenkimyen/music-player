// Dữ liệu lrc
const rawLrc = `
[00:05.00]I swear to God, when I come home
[00:10.00]I'm gonna hold you so close
[00:14.00]I swear to God, when I come home
[00:16.00]I'll never let go
[00:19.00]♪
[00:22.00]Like a river, I flow
[00:27.00]To the ocean I know
[00:31.00]You pull me close
[00:33.00]Guiding me home
[00:38.00]And I need you to know that we're falling so fast
[00:46.00]We're falling like the stars
[00:50.00]Falling in love
[00:55.00]And I'm not scared to say those words, with you, I'm safe
[01:03.00]We're falling like the stars
[01:07.00]We're falling in love
[01:13.00]I swear to God, I can see
[01:17.00]Four kids and no sleep
[01:21.00]We'll have one on each knee
[01:24.00]You and me, hmm
[01:30.00]And when they've grown up
[01:34.00]You're still the girl in the club
[01:38.00]When I held your hair up
[01:40.00]'Cause you had too much
[01:46.00]And I need you to know that we're falling so fast
[01:54.00]We're falling like the stars
[01:57.00]Falling in love
[02:03.00]And I'm not scared to say those words, with you, I'm safe
[02:11.00]We're falling like the stars
[02:14.00]Falling in love
[02:20.00]I swear to God, every day
[02:24.00]He won't take you away
[02:29.00]'Cause without you, babe
[02:31.00]I lose my way
[02:35.00]Oh, I'm in love
[02:37.00]Oh, I'm in love
[02:39.00]Oh, I'm in love
[02:44.00]Oh, I'm in love
[02:46.00]Oh, I'm in love
[02:48.00]Oh, I'm in love (falling like the stars)
[02:53.00]And I need you to know that we're falling so fast
[03:01.00]We're falling like the stars
[03:05.00]Falling in love
[03:10.00]And I'm not scared to say those words, with you, I'm safe
[03:18.00]We're falling like the stars
[03:21.00]We're falling in love
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
