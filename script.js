// Dữ liệu lrc
const rawLrc = `
[00:02.81]I can't write one song that's not about you
[00:07.19]Can't drink without thinking about you
[00:11.11]Is it too late to tell you that
[00:14.52]Everything means nothing if I can't have you?
[00:18.50]I'm in Toronto, and I got this view
[00:21.73]But I might as well be in a hotel room, yeah
[00:26.25]It doesn't matter 'cause I'm so consumed
[00:29.40]Spending all my nights reading texts from you
[00:33.82]Oh, I'm good at keeping my distance
[00:37.42]I know that you're the feeling I'm missing
[00:41.25]You know that I hate to admit it
[00:45.12]But everything means nothing if I can't have you
[00:49.36]I can't write one song that's not about you
[00:53.50]Can't drink without thinking about you
[00:57.59]Is it too late to tell you that
[01:00.95]Everything means nothing if I can't have you?
[01:04.88]I can't write one song that's not about you
[01:09.09]Can't drink without thinking about you
[01:13.05]Is it too late to tell you that
[01:16.44]Everything means nothing if I can't have you?
[01:20.64]I'm so sorry that my timing's off
[01:23.64]But I can't move on if we're still gonna talk
[01:28.34]Is it wrong for me to not want half?
[01:31.48]I want all of you, all the strings attached
[01:35.84]Oh, I'm good at keeping my distance
[01:39.41]I know that you're the feeling I'm missing
[01:43.27]You know that I hate to admit it
[01:47.12]But everything means nothing if I can't have you
[01:51.22]I can't write one song that's not about you
[01:55.44]Can't drink without thinking about you
[01:59.46]Is it too late to tell you that
[02:02.87]Everything means nothing if I can't have you?
[02:06.79]I can't write one song that's not about you
[02:10.98]Can't drink without thinking about you
[02:14.93]Is it too late to tell you that
[02:18.32]Everything means nothing if I can't have you?
[02:22.49]I'm trying to move on, forget you, but I hold on
[02:26.29]Everything means nothing
[02:28.00]Everything means nothing, babe
[02:30.00]I'm trying to move on, forget you, but I hold on
[02:33.86]Everything means nothing if I can't have you, no
[02:37.63]I can't write one song that's not about you
[02:41.97]Can't drink without thinking about you
[02:45.82]Is it too late to tell you that
[02:49.35]Everything means nothing if I can't have you? (Yeah)
[02:52.75]I can't write one song that's not about you
[02:57.48]Can't drink without thinking about you
[03:01.47]Is it too late to tell you that
[03:04.86]Everything means nothing if I can't have you?
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
