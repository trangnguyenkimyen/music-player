// Dữ liệu lrc
const rawLrc = `
[00:04.82]Baby, are you down, down, down, down, down? (Oh, oh)
[00:08.24]Down, down
[00:12.16]Even if the sky is falling down
[00:15.52]Down, down (ooh, ooh)
[00:21.12]You oughta know (know, know)
[00:24.43]Tonight is the night to let it go
[00:28.41]Put on a show (show, show)
[00:31.77]I wanna see how you lose control
[00:35.33]So leave it behind
[00:37.03]'Cause we have a night to get away (away, away)
[00:42.63]So come on and fly with me
[00:44.89]As we make our great escape (escape, escape)
[00:49.95]So baby, don't worry, you are my only
[00:53.99]You won't be lonely even if the sky is falling down
[00:59.44]You'll be my only, no need to worry
[01:02.99]Baby, are you down, down, down, down, down?
[01:06.27](Down, down)
[01:10.38]Baby, are you down, down, down, down, down?
[01:13.68](Down, down)
[01:17.50]Even if the sky is falling down
[01:21.23]Just let it be
[01:22.77]Come on and bring your body next to me
[01:26.56]I'll take you away, hey
[01:29.86]Turn this place into our private getaway
[01:33.71]So leave it behind
[01:35.24]'Cause we have a night to get away (away, away)
[01:40.72]So come on and fly with me
[01:43.27]As we make our great escape
[01:46.21]So why don't we run away?
[01:48.25]Baby, don't worry, you are my only (ooh)
[01:51.98]You won't be lonely (no) even if the sky is falling down
[01:57.53]You'll be my only (yeah), no need to worry (no)
[02:01.29]Baby, are you down, down, down, down, down?
[02:04.65](Down, down) whoo
[02:08.47]Baby, are you down, down, down, down, down?
[02:11.71](Down, down) mm, you down?
[02:15.78]Even if the sky is falling down
[02:18.48]Down like she 'posed to be, she gets down low for me
[02:22.20]Down like her temperature, 'cause to me, she zero degrees
[02:25.51]She cold, over-freeze, I got that girl from overseas
[02:29.20]Now she's my Miss America, now can I be her soldier, please?
[02:32.82]I'm fighting for this girl on a battlefield of love
[02:36.20]Don't it look like baby Cupid sendin' her arrows from above?
[02:39.86]Don't you ever leave the side of me, indefinitely, not probably
[02:43.62]And honestly, I'm down like the economy, yeah
[02:46.63]Baby, don't worry, you are my only
[02:50.25]You won't be lonely (whoa) even if the sky is falling down
[02:55.60]You'll be my only (no), no need to worry (no)
[02:59.41]Baby, are you down, down, down, down, down?
[03:02.74](Down, down) mm, down (down, down)
[03:06.70]Baby, are you down, down, down, down, down?
[03:09.34]Ooh, no (down, down), and the sky is fallin' down
[03:13.72]Even if the sky is falling down
[03:16.57]Ooh, no (ha-ha-ha)
[03:19.51]And the sky is falling down
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
