// Dữ liệu lrc
const rawLrc = `
[00:15.06]Yeah, yeah 산들바람 | Yeah, yeah, a gentle breeze
[00:18.39]스쳐가는 사람 | People who pass me by
[00:20.58]스며드는 사람 | People who find their way into my life
[00:22.50]나는 어떤 사람? | What kind of person am I?
[00:24.59]나는 좋은 사람? | Am I a good person?
[00:26.56]아님 나쁜 사람? | Or a bad person?
[00:28.64]평가는 가지각색 | Everyone sees me differently
[00:30.49]그냥 나도 사람 | I'm only human, after all
[00:32.59]다들 살아가겠지 | We'll all keep living our lives
[00:34.44]다들 사랑하겠지 | We'll all keep falling in love
[00:36.50]다들 바래가겠지 | We'll all fade away someday
[00:38.36]Yeah, yeah 잊혀가겠지 | Yeah, yeah, we'll all be forgotten
[00:40.99]사람들은 변하지 나도 변했듯이 | People change, just like I have
[00:44.37]세상살이 영원한 건 없어 | Nothing in this life lasts forever
[00:46.39]다 지나가는 해프닝 | It's all just a passing moment
[00:48.44](Hmm-hmm-hmm) Why so serious?
[00:52.50]Why so serious? Why so serious?
[00:56.41](Hmm-hmm-hmm) I'm so serious
[01:00.59]I'm so serious (I'm so serious), I'm so, I'm so
[01:04.11]뭐 어때? | So what?
[01:06.52]스쳐 지나가면, 뭐 어때? | If we just pass each other by, so what?
[01:11.80]뭐 어때? | So what?
[01:14.83]상처받으면, 뭐 어때? | If I get hurt, so what?
[01:19.65]때론 또 아플지도 | Maybe it'll hurt sometimes
[01:22.60]가끔은 속상해 눈물 흘릴지도 | Sometimes I might feel down and shed a few tears
[01:27.72]뭐 어때? | So what?
[01:30.52]그렇게 살면, 뭐 어때? | If that's how I live, so what?
[01:36.25]물이 흘러가는 대로 흘러가 | Just go with the flow
[01:37.82]저기 끝은 뭐가 있을지도 | Who knows what's waiting at the end
[01:39.36]특별한 삶 평범한 삶 그 나름대로 | A special life, an ordinary life, each has its own beauty
[01:41.60]좋은 게 좋은 거지 뭐 | Whatever works, works
[01:43.29]좋은 게 좋은 거지 | What matters is that it feels right
[01:44.35]뜻대로만 되지 않지 | Things don't always go the way we want
[01:46.28]불편은 다들 감수하지 | We all have things we have to put up with
[01:48.09]극적인 상황들의 반복은 | Going through the same drama over and over
[01:49.50]삶을 지치게도 해 | Can really wear you down
[01:51.05]사람들이 그런거지 | That's just how people are
[01:52.34]없으면 있고 싶기도 | When we don't have something, we want it
[01:53.90]있으면 없고 싶기도 | But when we do, we want to let it go
[01:55.94]누가 사람이 지혜의 동물이라 했나 | Who ever said humans were creatures of wisdom?
[01:58.24]내가 보기에는 후회의 동물이 분명한데 | To me, we're clearly creatures of regret
[02:00.64]사람들은 변하지 너도 변했듯이 | People change, just like you have
[02:03.88]세상살이 영원한 건 없어 | Nothing in this life lasts forever
[02:05.84]다 지나가는 해프닝 | It's all just a passing moment
[02:08.31]너의 평범함은 되려 나의 특별함 | What's ordinary to you is special to me
[02:12.17]너의 특별함은 되려 나의 평범함 | What's special to you is ordinary to me
[02:16.02]나의 평범함은 되려 너의 특별함 | What's ordinary to me is special to you
[02:20.22]나의 특별함은 되려 너의 평범함 | What's special to me is ordinary to you
[02:23.64]뭐 어때? | So what?
[02:26.56]스쳐 지나가면, 뭐 어때? | If we just pass each other by, so what?
[02:31.68]뭐 어때? | So what?
[02:34.49]상처받으면, 뭐 어때? | If I get hurt, so what?
[02:39.88]때론 또 아플지도 | Maybe it'll hurt sometimes
[02:42.62]가끔은 속상해 눈물 흘릴지도 ooh | Sometimes I might feel down and shed a few tears, ooh
[02:47.72]뭐 어때? | So what?
[02:50.78]그렇게 살면, 뭐 어때? | If that's how I live, so what?
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
