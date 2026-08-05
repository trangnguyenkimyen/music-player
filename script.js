// Dữ liệu lrc
const rawLrc = `
[00:15.00]想要妳聽到我的新歌 | I want you to hear my new song
[00:18.00]最簡單的情歌 | The simplest love song
[00:20.00]有點笨的情歌 因為 | A clumsy little love song, 'cause
[00:22.00]就怕妳覺得我只是說說的 | I'm scared you'll think it's just words
[00:25.00]以為我在騙人 | Think I'm telling lies
[00:27.00]感覺妳會誤認 我 | Feels like you've got me all wrong
[00:30.00]如果妳願意相信 | If you're willing to believe
[00:33.00]我的男子氣 可以比一比一下了 | I'll prove the man I am
[00:37.00]我也相信妳的心 | I believe in your heart too
[00:40.00]妳的孩子氣 girl, girl | Even your childish side, girl, girl
[00:43.00]So can you just trust me, trust me?
[00:47.00]So I can just trust you, trust you
[00:51.00]And we can just trust free, trust free
[00:54.00]And I could just love you, love you
[00:58.00]想要問妳 信不信我的愛 | Tell me, do you believe in my love?
[01:02.00]不是誰都能保護妳 因為愛 | Not everyone can love you like I do
[01:06.00]如果妳問 信不信有真愛 | If you ask if true love exists
[01:09.00]我只能說 試試看我的愛 | All I can say is give my love a chance
[01:13.00]♪
[01:29.00]我怕妳不懂我的性格 | I'm scared you don't know the real me
[01:32.00]最認真的性格 最厲害的角色 因為 | I'm more sincere than I may seem, 'cause
[01:37.00]妳說看起來像愛玩的男生 | You said I look like a player
[01:40.00]以為我在騙人 感覺妳會誤認 我 | You think I'm lying, you've got me all wrong
[01:44.00]如果妳願意相信 | If you're willing to believe
[01:47.00]我的男子氣 可以比一比一下了 | I'll prove the man I am
[01:52.00]我也相信妳的心 | I believe in your heart too
[01:55.00]妳的孩子氣 | Even your childish side
[01:57.00]So can you just trust me, trust me?
[02:01.00]So I can just trust you, trust you
[02:05.00]And we can just trust free, trust free
[02:09.00]And I could just love you, love you
[02:12.00]想要問妳 信不信我的愛 | Tell me, do you believe in my love?
[02:16.00]不是誰都能保護妳 因為愛 | Not everyone can love you like I do
[02:20.00]如果妳問 信不信有真愛 | If you ask if true love exists
[02:24.00]我只能說 試試看我的愛 | All I can say is give my love a chance
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
