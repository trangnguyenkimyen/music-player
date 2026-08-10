// Dữ liệu lrc
const rawLrc = `
[00:18.091] When it went down
[00:19.846] It was so hard to breathe
[00:21.982] I gave up everything
[00:24.168] And I slow fall down to the floor
[00:27.953] Life was escaping me
[00:30.047] I couldn't find myself
[00:32.241] 'Til it was all lost
[00:34.251] Not anymore
[00:36.014] I'm holding on to all the pieces of my heart's debris
[00:39.741] 'Til it's time
[00:43.960] I'll, I'll pull it together and fix myself eventually
[00:47.838] I know it's mine
[00:50.247] I found gold in the wreckage
[00:52.308] Put it on a necklace
[00:54.312] Keepin' it 'cause I-I-I, I know that it's mine
[00:58.305] I wear it like a message
[01:00.444] So I don't forget it
[01:02.447] Keepin' it 'cause I-I-I, I know that it's mine
[01:07.045] I know that it's mine
[01:11.457] I know that it's mine
[01:15.718] I know that it's mine
[01:19.633] I know that it's mine
[01:25.618] I know that it's mine
[01:44.261] Facing the change
[01:46.150] But it's still tough to see
[01:48.184] At first I fought it all
[01:50.447] I was so mean
[01:52.393] I'm still unsure
[01:54.204] How it's supposed to be?
[01:56.310] I'm taking everyday now by the skin of my teeth
[02:00.382] Until I learn
[02:02.472] I'm holding on to all the pieces of my heart's debris
[02:06.084] 'Til it's time
[02:08.991] I'll... I'll pull it together and fix myself eventually
[02:14.234] I know it's mine
[02:16.528] I found gold in the wreckage
[02:18.571] Put it on a necklace
[02:20.571] Keepin' it 'cause I-I-I, I know that it's mine
[02:24.742] I wear it like a message
[02:26.762] So I don't forget it
[02:28.731] Keepin' it 'cause I-I-I, I know that it's mine
[02:35.906] I know that it's mine
[02:44.010] I know that it's mine
[02:52.426] I know that it's mine
[03:00.617] I know that it's mine
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
