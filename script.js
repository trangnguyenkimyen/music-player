// Dữ liệu lrc
const rawLrc = `
[00:09.42]I woke up with this pain in my neck
[00:13.77]Had no medicine to keep me in check
[00:18.12]You know exactly what to say
[00:20.76]To keep me wrapped in your chains
[00:23.30]While I'm here choking on regret
[00:28.47]You got a couple tricks up your sleeve
[00:32.23]Taking advantage of my low self-esteem
[00:37.17]You leave my bank account empty
[00:39.76]And your message always pending
[00:42.01]Yet somehow you're still so tempting to me
[00:46.39]Girl you're my hit of nicotine in the morning
[00:51.03]Even though you're no good for me, I still want it
[00:55.72]You drive me crazy, baby, but I adore ya
[01:00.67]Yeah you know we got a good connection
[01:03.22]But we're headed in the wrong direction
[01:05.54]You know we got a good connection
[01:07.75]But we're headed in the wrong direction
[01:10.63]I laid down with a weight on my chest
[01:14.99]One too many heavy thoughts in my head
[01:19.69]It's just so hard to admit it
[01:22.19]And I wish that I could quit it
[01:24.56]But I always pick it up again
[01:28.86]Girl you're my hit of nicotine in the morning
[01:33.73]Even though you're no good for me, I still want it
[01:38.14]You drive me crazy, baby, but I adore ya
[01:43.34]Yeah you know we got a good connection
[01:45.62]But we're headed in the wrong direction
[01:48.27]You know we got a good connection
[01:50.18]But we're headed in the wrong direction
[01:53.30]Oh whoa oh
[01:58.44]Oh whoa oh
[02:01.40]Wrong direction, yeah
[02:03.37]Oh whoa oh
[02:06.56]You know we got a good connection
[02:09.17]But we're headed in the wrong direction
[02:11.27]Girl you're my hit of nicotine in the morning
[02:15.93]Even though you're no good for me, I still want it
[02:20.60]You drive me crazy, baby, but I adore ya
[02:25.33]Yeah you know we got a good connection
[02:28.11]But we're headed in the wrong direction
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
