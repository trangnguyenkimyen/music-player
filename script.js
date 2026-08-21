// Dữ liệu lrc
const rawLrc = `
[00:00.01]Baby, I'm just trying to play it cool
[00:03.83]But I just can't hide that I want you
[00:07.01]Wait a minute, 이게 뭐지? | Wait a minute, what is this?
[00:09.57]내 심장이 lub-dub, 자꾸만 뛰어 | My heart goes lub-dub, it just keeps racing
[00:13.19]저 멀리서도, oh, my gosh | Even from far away, oh, my gosh
[00:16.89]끌어당겨, you're my crush | You're pulling me in, you're my crush
[00:20.89]초능력처럼 | like a superpower
[00:21.79]거대한 자석이 된 것만 같아 my heart | My heart feels like a giant magnet
[00:25.52]네 모든 게 내 맘에 달라붙어버려, boy | Everything about you sticks to my heart, boy
[00:30.13]We're magnetized, 인정할게 | We're magnetized, I'll admit it
[00:34.58]This time, I want
[00:36.45]You, you, you, you, like it's magnetic
[00:40.04]You, you, you, you, you, you, you, you
[00:41.80]super 이끌림 | super attraction
[00:43.70]You, you, you, you, like it's magnetic
[00:47.39]You, you, you, you, you, you, you, you
[00:49.00]super 이끌림 | super attraction
[00:50.92]Bae, bae, bae, bae, bae, bae, bae, bae, bae
[00:54.58]Dash-da-da, dash-da-da, dash-da, like it's magnetic
[00:58.25]Bae, bae, bae, bae, bae, bae, bae, bae, bae
[01:01.92]Dash-da-da, dash-da-da, baby, don't say no

[01:06.21]정반대 같아 our type | We're total opposites
[01:08.10]넌 J, 난 완전 P | You're a J, I'm a total P
[01:09.92]S와 N 극이지만 그래서 끌리지 | We're like opposite poles
[01:11.80]그래서 끌리지 | But that's why we're drawn together
[01:13.59]내가 만들래 green light | I'll give us the green light
[01:15.40]여잔 배짱이지 | A girl's gotta have guts
[01:16.87]So let's go, let's go, let's go, let's go
[01:20.35]숨기고 싶지 않아 | I don't wanna hide
[01:22.20]자석 같은 my heart | This magnetic heart of mine
[01:24.14]내 맘의 끌림대로 | I'll follow where my heart pulls me
[01:26.20]너를 향해 갈게, boy | And head straight for you, boy
[01:28.71]We're magnetized, 인정할게 | We're magnetized, I'll admit it
[01:33.15]This time, I want
[01:34.90]You, you, you, you, like it's magnetic
[01:38.58]You, you, you, you, you, you, you, you
[01:40.30]super 이끌림 | super attraction
[01:42.46]You, you, you, you, like it's magnetic
[01:45.88]You, you, you, you, you, you, you, you
[01:47.60]super 이끌림 | super attraction

[01:49.24]No push and pull
[01:50.70]전속력으로 너에게 갈게 | I'll race straight to you
[01:53.18]Our chemistry
[01:54.60]난 과몰입해 지금 순간에 | I'm completely lost in this moment
[01:56.72]No push and pull
[01:58.20]네게 집중 후회는 안 할래 | I'll focus on you, no regrets
[02:00.65]Never holding back
[02:02.50]직진해, yeah | Going straight for you, yeah
[02:06.06]This time, I want
[02:08.01]You, you, you, you, like it's magnetic
[02:11.46]You, you, you, you, you, you, you, you
[02:13.20]super 이끌림 | super attraction
[02:15.46]You, you, you, you, like it's magnetic
[02:18.93]You, you, you, you, you, you, you, you
[02:20.60]super 이끌림 | super attraction
[02:22.58]Bae, bae, bae, bae, bae, bae, bae, bae, bae
[02:26.25]Dash-da-da, dash-da-da, dash-da, like it's magnetic
[02:29.89]Bae, bae, bae, bae, bae, bae, bae, bae, bae
[02:33.42]Dash-da-da, dash-da-da, baby, don't say no
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
