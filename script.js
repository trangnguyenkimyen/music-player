// Dữ liệu lrc
const rawLrc = `
[00:06.96]우리의 밤은 셀 수 없는 | Our night is filled with countless
[00:10.95]별들과 모래알 그 사이 | stars and grains of sand
[00:14.43]폭죽을 쏘는 탕탕 소리에 | With the sound of fireworks going off
[00:18.36]우리의 웃음꽃 피우고 | We can't help but laugh
[00:22.14]저 멀리 달빛 우리의 조명이 되고 | The moonlight in the distance lights us up
[00:26.50]스치는 바람 내게서 네게로 번져서 갈 때에 | As the breeze carries my feelings from me to you
[00:32.17]눈물은 다 사라져 가네 | All my tears slowly disappear
[00:37.67]사라져 가네 우리 뒷모습이 | Our silhouettes slowly fade away
[00:39.81]두 손을 꽉 쥔 채 노을이 진 | Holding hands tightly beneath the sunset
[00:41.78]깜깜한 하늘 별들만 | With nothing but stars in the dark sky
[00:43.35]가득 채워진 채 우릴 비춰주길 | I hope they fill the sky and shine on us
[00:45.91]해가 떠오를 때까지 ah | Until the sun comes up, ah
[00:47.93]우린 계속 타오르지 ah | We'll keep burning bright, ah
[00:49.61]미소를 머금고 이 순간에 | With smiles on our faces, in this moment
[00:51.67]설렘을 너에게 바톤터치 | I pass this excitement on to you
[00:53.79]우리의 새벽은 낮보다 뜨거워 | Our dawn is hotter than day
[00:57.59]아침이 올 때까지 | Until the morning comes
[01:00.99]Oh, summer, summer, summer, summer, oh
[01:04.42]여름밤에 우리를 새기고 | Leaving our memories in this summer night
[01:08.93]Oh, summer, summer, summer, summer, oh
[01:12.08]다시 찾아올 그땐 어떨까? | I wonder what it'll be like when summer comes again
[01:17.95]Oh-oh, oh-oh
[01:21.74]그땐 어떨까 | I wonder what it'll be like then
[01:24.30]Oh, oh-oh, oh-oh
[01:29.39]그땐 어떨까 | I wonder what it'll be like then
[01:33.12]모두 잠든 밤 이리 아름다운가 | How can the night be this beautiful while everyone's asleep?
[01:35.58]달빛을 담아낸 너의 미소가 | Your smile, glowing in the moonlight
[01:37.45]어두운 밤을 빛내 파도 같은 웃음소리 | Your laughter, like waves, lights up the dark night
[01:40.02]귀를 간지럽혀 | It tickles my ears
[01:41.21]전부 벗어나 into the wild | Let's break free from it all, into the wild
[01:42.82]그들의 기준에 부합하지 마 이 시간을 | Don't let their standards define this moment
[01:45.59]우리의 새벽은 더 뜨겁고 | Our dawn burns even brighter
[01:47.27]날이 밝으면 the world is ours | When the sun comes up, the world is ours
[01:48.95]저 멀리 불빛 우리의 추억이 되고 | The lights in the distance become our memories
[01:52.84]넘치는 파도 | Beneath the crashing waves,
[01:55.00]그 아래 남겨둔 우리 글씨에 | where we left our names
[01:58.51]서로의 이름을 새기며 | We write each other's names
[02:04.85]우리의 새벽은 낮보다 뜨거워 | Our dawn is hotter than day
[02:08.50]아침이 올 때까지 | Until the morning comes
[02:12.18]Oh, summer, summer, summer, summer, oh
[02:15.46]여름밤에 우리를 새기고 | Leaving our memories in this summer night
[02:19.89]Oh, summer, summer, summer, summer, oh
[02:22.94]다시 찾아올 그땐 어떨까? | I wonder what it'll be like when summer comes again
[02:28.99]Oh, oh-oh, oh-oh
[02:33.02]그땐 어떨까 | I wonder what it'll be like then
[02:35.35]Oh, oh-oh, oh-oh
[02:40.16]그땐 그때 | Whatever happens, when that time comes
[02:43.01]널 곁에 두고 아껴주고 사랑하고 oh | I'll keep you close, cherish you, and love you, oh
[02:50.55]매일 웃어주고 지금처럼 아름답길 | I'll keep making you smile, and I hope it'll stay this beautiful
[02:58.25]우리의 새벽은 낮보다 뜨거워 | Our dawn is hotter than day
[03:02.33]아침이 올 때까지 | Until the morning comes
[03:05.98]나의 마음은 낮보다 뜨거워 | My heart burns hotter than day
[03:10.04]지금처럼 너에게 | For you, just like it does now
[03:13.59]Oh, oh-oh, oh-oh
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
