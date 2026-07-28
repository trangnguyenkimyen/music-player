// Dữ liệu lrc
const rawLrc = `
[00:10.988] Hey, you there
[00:14.725] Can we take it to the next level,
[00:18.189] baby, do you dare?
[00:20.327] Don't be scared
[00:24.124] 'Cause if you can say the words,
[00:26.932] I don't know why I should care
[00:29.582] 'Cause here I am,
[00:31.048] I'm givin' all I can
[00:33.657] But all you ever do is mess it up
[00:38.471] Yeah, I'm right here,
[00:40.797] I'm tryin' to make it clear
[00:43.025] That getting half of you just ain't enough
[00:47.492] I'm not going to wait until you're done
[00:51.816] Pretending you don't need anyone
[00:56.277] I'm standing here naked (naked, naked)
[01:01.341] I'm standing here naked (naked, naked)
[01:06.076] I'm not gonna try 'til you decide
[01:10.827] You're ready to swallow all your pride
[01:15.004] I'm standing here naked (naked, naked)
[01:20.046] I'm standing here naked (naked, naked)
[01:26.309] Hey, get out
[01:29.920] I've got nothin' left to give for you give me nothin' now
[01:35.306] Read my mouth
[01:39.503] If you ever want me back,
[01:42.134] then your walls need breakin' down
[01:44.653] 'Cause here I am, I'm givin' all I can
[01:48.967] But all you ever do is mess it up
[01:52.874] (all you ever do is mess it up)
[01:54.514] Yeah, I'm right here,
[01:56.059] I'm tryin' to make it clear
[01:58.350] getting half of you just ain't enough
[02:02.058] I'm not going to wait until you're done
[02:06.848] Pretending you don't need anyone
[02:11.488] I'm standing here naked (naked, naked)
[02:16.762] I'm standing here naked (naked, naked)
[02:21.278] I'm not gonna try 'til you decide
[02:25.621] You're ready to swallow all your pride
[02:30.419] I'm standing here naked (naked, naked)
[02:35.434] I'm standing here naked (naked, naked)
[02:41.245] I wanna give you everything
[02:43.938] I wanna give you everything
[02:51.185] I wanna give you everything
[02:53.339] I wanna give you everything
[02:59.238] I'm not going to wait until you're gone
[03:03.251] 'Cause you pretended you don't need anyone
[03:08.035] 'Can you see that I'm naked (naked, naked)
[03:13.079] Oh, you see that I'm naked (naked, naked)
[03:17.909] I'm not going to try 'til you decide
[03:22.383] You're ready to swallow all your pride
[03:26.850] I'm standing here naked (naked, naked)
[03:32.635] I'm standing here naked (I'm standing) (naked, naked)
[03:39.995] I'm standing
[03:42.361] I'm standing here
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
