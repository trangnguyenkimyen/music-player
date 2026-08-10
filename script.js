// Dữ liệu lrc
const rawLrc = `
[00:01.21]It's in the way you see
[00:03.92]You know what I need
[00:06.52]It's in the way that you're holding me
[00:08.60]Bringing me Close
[00:09.90]You know that I won't let go
[00:12.06]You got me on repeat
[00:14.66]You got me in a dream
[00:17.24]I let my worries go soon as you
[00:19.22]Come through the door
[00:20.37]Thinking about what it'd be like to be Yours
[00:23.71]2 AM and I'm still breathing
[00:28.12]Staring at my thoughts floating up to the ceiling
[00:32.74]I'm Swimming in every
[00:34.45]Thing you said
[00:35.51]I'm thinking 'bout
[00:36.45]Jumping in instead
[00:38.28]I got your skinny dipping
[00:40.23]Deep inside my head
[00:43.36]I'm Swimming in every
[00:45.05]Thing you said
[00:46.19]I'm thinking 'bout
[00:47.12]Jumping in instead
[00:48.76]I got you skinny dipping
[00:50.97]Deep inside my head
[01:05.25]It's in the way you touch me
[01:07.56]I don't know much about love
[01:10.00]But I keep on checking my phone
[01:12.27]To see when you're home
[01:13.33]Or when you want me to pull up
[01:15.80]We're one in the same,
[01:18.27]You got me caught in the daze
[01:20.55]I love it when you say my name
[01:22.52]Real slow, All my love is Yours
[01:26.00]I'm Swimming in every
[01:27.45]Thing you said
[01:28.61]I'm thinking 'bout
[01:29.57]Jumping in instead
[01:31.21]I got your skinny dipping
[01:33.36]Deep inside my head
[01:36.58]I'm Swimming in every
[01:38.09]Thing you said
[01:39.37]I'm thinking 'bout
[01:40.20]Jumping in instead
[01:41.93]I got you skinny dipping
[01:44.01]Deep inside my head
[01:58.71]Every time you move
[02:02.98]You're lookin' like you dancin'
[02:05.60]I think that you could have it
[02:08.25][Oh...]Everything you do
[02:13.75]I wanna do it with you
[02:16.35]Don't ever wanna miss you
[02:19.95]You do...
[02:20.99]2 Am and I am still breathing
[02:24.02]You do...
[02:25.63]Staring at my thoughts floating up to ceiling
[02:29.53]I'm Swimming in every
[02:31.18]Thing you said
[02:32.23]I'm thinking 'bout
[02:33.20]Jumping in instead
[02:34.93]I got your skinny dipping
[02:36.94]Deep inside my head
[02:40.28]I'm Swimming in every
[02:41.67]Thing you said
[02:42.75]I'm thinking 'bout
[02:43.70]Jumping in instead
[02:45.53]I got you skinny dipping
[02:47.37]Deep inside my head
[02:56.36]With you
[03:02.35]Oh... You do You do You do
[03:07.73]You do You do You dp
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
