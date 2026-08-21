// Dữ liệu lrc
const rawLrc = `
[00:03.36]M-B-T-M-I-U
[00:11.05]M-B-T-M-I-U
[00:14.88]꿈에도 암만 낯설는지 몰라 | Even in my dreams, I don't know why you feel so unfamiliar
[00:18.63]부담스럽지마는 설레잖아 | It feels a little overwhelming, but my heart still flutters
[00:22.42]아무 말 없이, 숙맥 타 더 좋아 | Without a word, I like your awkward side even more
[00:26.63]You're mine and I'm yours
[00:30.08]너의 모든 게 너무 아름다워 | Everything about you is so beautiful
[00:33.84]어떡해, 대체 불가한 여자면? | What do I do when there's no one else like you?
[00:37.60]그대여, 이제 내 사랑을 받아 | My love, now accept my love
[00:41.82]You're mine and I'm yours
[00:46.24]별이 빛나는 이 밤 | On this starry night
[00:48.00]가슴속 떨리는 마음 | My heart is trembling inside
[00:50.09]너를 향해 모두 줄게, baby | I'll give you all of me, baby
[00:53.88]좀 더 내게 다가와 | Come a little closer to me
[00:55.80]내 두 손을 잡아봐 | Take both of my hands
[00:57.66]나를 너에게 줄게 | I'll give myself to you
[01:00.60]Take me, take me, take me, I'm yours
[01:02.83]Take me, take me, I'm yours
[01:04.88]Take me, take me, I'm yours
[01:08.16]Take me, take me, take me, I'm yours
[01:10.56]Take me, take me, I'm yours
[01:12.34]Take me, take me, I'm yours
[01:15.86]너의 눈을 보고 있으면 알아 | I can tell just by looking into your eyes
[01:19.54]제발 아니라고 말하지 말아 | Please don't tell me it's not true
[01:23.31]숨기려 해도, 태가 숨지 않아 | Even if you try to hide it, it still shows
[01:27.46]Are you mine? 'Cause I'm yours
[01:31.97]별이 빛나는 이 밤 | On this starry night
[01:33.80]가슴속 떨리는 마음 | My heart is trembling inside
[01:35.71]너를 향해 모두 줄게, baby | I'll give you all of me, baby
[01:39.59]좀 더 내게 다가와 | Come a little closer to me
[01:41.50]내 두 손을 잡아봐 | Take both of my hands
[01:43.35]나를 너에게 줄게 | I'll give myself to you
[01:46.22]Take me, take me, take me, I'm yours
[01:48.53]Take me, take me, I'm yours
[01:50.52]Take me, take me, I'm yours
[01:53.87]Take me, take me, take me, I'm yours
[01:56.29]Take me, take me, I'm yours
[01:58.19]Take me, take me, I'm yours
[02:01.59]Baby, baby, baby (ooh)
[02:09.13]Baby, baby (ooh), baby (ooh)
[02:17.93]빠르게 흘러만 가는 이 시간이 싫어 | I hate how quickly time keeps passing by
[02:21.78]군침만 도는, mm | You're only making me want you more, mm
[02:25.56]달리 난 너를 보낼 수는 없어 | I just can't let you go
[02:28.35]Hurry up, baby, I'm yours
[02:47.11]Take me, take me, take me, I'm yours
[02:49.59]Take me, take me, I'm yours
[02:51.42]Take me, take me, I'm yours
[02:54.79]Take me, take me, take me, I'm yours
[02:57.15]Take me, take me, I'm yours
[02:59.12]Take me, take me, I'm yours
[03:02.42]Baby, baby, baby (ooh)
[03:10.02]Baby, baby (ooh), baby (ooh)
[03:17.79]Baby, baby (ooh), baby (ooh)
[03:25.38]Baby, baby (ooh), baby (ooh)
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
