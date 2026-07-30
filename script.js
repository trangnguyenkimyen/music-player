// Dữ liệu lrc
const rawLrc = `
[00:01.00]BTS
[00:02.00]Savage love
[00:04.00]Did somebody, did somebody break your heart?
[00:07.00]Lookin' like an angel but your savage love
[00:10.00]When you kiss me, I know you don't give two fucks
[00:13.00]But I still want that
[00:15.00]If I woke up without you, I don't know what I would do
[00:18.00]Thought I could be single forever 'til I met you
[00:21.00]Usually, don't be fallin', be fallin', fallin' fast
[00:24.00]You got a way of keepin' me comin' back-to-back
[00:28.00]I just found out the only reason that you lovin' me
[00:31.00]Was to get back at your ex-lover, but before you leave
[00:34.00]Usually, I would never, would never even care
[00:37.00]Baby, I know she creepin', I feel it in the air
[00:41.00]Every night and every day (and every day)
[00:46.00]I try to make you stay but your
[00:53.00]Savage love
[00:55.00]Did somebody, did somebody break your heart?
[00:58.00]Lookin' like an angel but your savage love
[01:01.00]When you kiss me, I know you don't give two fucks
[01:04.00]But I still want that, your savage love
[01:09.00]Your savage lo-lo-love
[01:12.00]Your savage lo-lo-love
[01:14.00]You could use me
[01:17.00]'Cause I still want that
[01:19.00]사랑이란 | Maybe love
[01:20.00]어쩌면 순간의 감정의 나열 | is just a fleeting feeling
[01:22.00]조건이 다들 붙지 난 뭘 사랑하는가 | With strings attached, what do I even love?
[01:25.00]영원이라는 말은 어쩌면 모래성 | "Eternity" is just a sandcastle
[01:28.50]잔잔한 파도 앞에 힘없이 무너져 | Washed away by a gentle wave
[01:32.00]Every night, every day, I'm swept away by the waves
[01:35.00]Don't know what I'm thinking (can't get you outta my head)
[01:39.00]내가 두려운 게 그대이든 그때이든 | Whether I fear you or the moment
[01:41.00]불같이 사랑할래 그댈 지금 | I'll love you like fire right now
[01:45.00]Every night and every day
[01:50.00]I try to make you stay but your
[01:57.00]Savage love
[01:59.00]Did somebody, did somebody break your heart?
[02:02.00]Lookin' like an angel but your savage love
[02:05.00]When you kiss me, I know you don't give two fucks
[02:08.00]But I still want that, your savage love
[02:13.00]Your savage lo-lo-love
[02:16.00]Your savage lo-lo-love
[02:18.00]You could use me
[02:21.00]'Cause I still want that, your savage love
[02:23.00](Ooh-la-la-la, ooh-la-la-la)
[02:25.00]Your savage lo-lo-love (ooh-la-la-la, ooh-la-la-la)
[02:29.00]Your savage lo-lo-love (ooh-la-la-la, ooh-la-la-la)
[02:31.00]You could use me, baby (ooh, la-la-la-la)
[02:35.00]Savage love
[02:37.00]Did somebody, did somebody break your heart?
[02:40.00]Lookin' like an angel but your savage love
[02:43.00]When you kiss me, I know you don't give two fucks
[02:47.00]But I still want that, your savage love
[02:51.00]Your savage lo-lo-love
[02:54.00]Your savage lo-lo-love
[02:57.00]You could use me
[02:59.00]'Cause I still want that, your savage love
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
