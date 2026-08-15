// Dữ liệu lrc
const rawLrc = `
[00:08.50]I miss you pushing me close to the edge
[00:12.28]I miss you
[00:16.03]I wish I knew what I had when I left
[00:19.87]I miss you
[00:22.50]You set fire to my world, couldn't handle the heat
[00:26.17]Now I'm sleeping alone and I'm starting to freeze
[00:30.18]Baby, come bring me hell
[00:32.11]Let it rain over me
[00:33.98]Baby, come back to me
[00:38.60]I want you to ruin my life
[00:40.25]You to ruin my life, you to ruin my life, yeah
[00:42.54]I want you to f*** up my nights, yeah
[00:44.35]f*** up my nights, yeah, all of my nights, yeah
[00:46.37]I want you to bring it all on
[00:47.97]If you make it all wrong, then I'll make it all right, yeah
[00:50.24]I want you to ruin my life
[00:51.77]You to ruin my life, you to ruin my life
[00:54.07]I want you to ruin my life
[00:55.58]You to ruin my life, you to ruin my life, yeah
[00:57.83]I want you to f*** up my nights, yeah
[00:59.63]f*** up my nights, yeah, all of my nights, yeah
[01:01.78]I want you to bring it all on
[01:03.36]If you make it all wrong, then I'll make it all right, yeah
[01:05.42]I want you to ruin my life
[01:07.08]You to ruin my life, you to ruin my life
[01:09.92]I miss you more than I thought that I could
[01:13.56]I miss you
[01:17.41]I know you missin' me too like you should
[01:21.37]I miss you
[01:24.03]You set fire to my world, couldn't handle the heat
[01:27.56]Now I'm sleeping alone and I'm starting to freeze
[01:31.46]Baby, come bring me hell
[01:33.51]Let it rain over me
[01:35.49]Baby, come back to me
[01:37.43](Baby, come back to me)
[01:40.02]I want you to ruin my life
[01:41.67]You to ruin my life, you to ruin my life, yeah
[01:43.92]I want you to f*** up my nights, yeah
[01:45.63]f*** up my nights, yeah, all of my nights, yeah
[01:47.64]I want you to bring it all on
[01:49.33]If you make it all wrong, then I'll make it all right, yeah
[01:51.59]I want you to ruin my life
[01:53.19]You to ruin my life, you to ruin my life
[01:55.49]I want you to ruin my life
[01:57.36]You to ruin my life, you to ruin my life, yeah
[01:59.76]I want you to f*** up my nights, yeah
[02:01.53]f*** up my nights, yeah, all of my nights, yeah
[02:03.14]I want you to bring it all on
[02:04.64]If you make it all wrong, then I'll make it all right, yeah
[02:06.92]I want you to ruin my life
[02:08.57]You to ruin my life, you to ruin my life
[02:12.28]I miss you, I miss you...
[02:16.10]I wish you, I wish you...
[02:19.84]Would come back, would come back to me
[02:22.80]Come back to me
[02:24.77]Come back to me
[02:33.66]I want you to ruin my life
[02:35.37]You to ruin my life, you to ruin my life, yeah
[02:37.78]I want you to f*** up my nights, yeah
[02:39.43]f*** up my nights, yeah, all of my nights, yeah
[02:41.60]I want you to bring it all on
[02:43.13]If you make it all wrong, then I'll make it all right, yeah
[02:45.40]I want you to ruin my life
[02:46.92]You to ruin my life, you to ruin my life
[02:49.33]I want you to ruin my life
[02:50.84]You to ruin my life, you to ruin my life, yeah (Ruin my life)
[02:53.24]I want you to f*** up my nights, yeah
[02:54.81]f*** up my nights, yeah, all of my nights, yeah (Oh)
[02:56.96]I want you to bring it all on
[02:58.48]If you make it all wrong, then I'll make it all right, yeah
[03:00.76]I want you to ruin my life
[03:02.29]You to ruin my life, you to ruin my life
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
