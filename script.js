// Dữ liệu lrc
const rawLrc = `
[00:17.85]깊어진 하루 길어진 내 그림자 | The days grow darker, my shadow stretches longer
[00:24.54]저 멀리 해는 저물고 있어 | The sun is setting in the distance
[00:31.41]짙어 가는 어둠 속에서 헤매고 있나 봐 | I must be lost in the deepening darkness
[00:38.23]이곳에 갇혀버린 걸까 | Am I trapped here?
[00:46.06]아직도 숨 쉬는 곳 | Somewhere that still breathes
[00:50.95]그곳에 다가가야 해 | I have to find my way there
[00:58.55]Every day you seem too far away
[01:01.50]Every time you do, I tell myself
[01:05.37]이곳에서 기다리고 있어 | I'm waiting for you here
[01:11.70]Every night I see you in my heart
[01:15.09]Every time I do, I end up crying
[01:18.56]어둠 속에 너를 불러주면 | When I call out your name in the dark
[01:26.18]내게로 들려오는 건 깊은 내 숨결들 | All I hear are the deep breaths I take
[01:38.47]라따따따 라따따따 라따따따 따 | La-da-da-da, la-da-da-da, la-da-da-da, da
[01:48.22]라따따따 라따따따 라따따따 따 | La-da-da-da, la-da-da-da, la-da-da-da, da
[02:06.72]시간이 멈춰버린 곳 | Where time has come to a standstill
[02:12.57]이젠 다 되돌려야 해 | Now I have to turn it all back
[02:18.36]Every day you seem too far away
[02:21.64]Every time you do, I tell myself
[02:24.97]이곳에서 기다리고 있어 | I'm waiting for you here
[02:31.81]Every night I see you in my heart
[02:35.06]Every time I do, I end up crying
[02:38.49]어둠 속에 너를 불러주면 | When I call out your name in the dark
[02:45.96]일렁이는 태양이 숨 쉬는 곳 | Where the shimmering sun still breathes
[02:51.85]난 아직 이대로 멈춰 | I'm still standing still, just like this
[03:01.73]Every day you seem too far away
[03:05.24]Every time you do I tell myself
[03:08.50]이곳에서 기다리고 있어 | I'm waiting for you here
[03:15.18]Every night I see you in my heart
[03:18.34]Every time do, I end up crying
[03:21.79]어둠 속에 너를 불러주면 | When I call out your name in the dark
[03:28.23]라따따따 라따따따 라따따따 따 | La-da-da-da, la-da-da-da, la-da-da-da, da
[03:41.68]라따따따 라따따따 라따따따 따 | La-da-da-da, la-da-da-da, la-da-da-da, da
[03:54.91]라따따따 라따따따 라따따따 따 | La-da-da-da, la-da-da-da, la-da-da-da, da
[04:07.66]라따따따 라따따따 라따따따 따 | La-da-da-da, la-da-da-da, la-da-da-da, da
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
