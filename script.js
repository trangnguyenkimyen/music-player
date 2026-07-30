// Dữ liệu lrc
const rawLrc = `
[00:07.00]I wish I was
[00:11.00]Strong enough
[00:14.00]To lift not one but
[00:19.00]Both of us
[00:22.00]Someday I will be
[00:26.00]Strong enough
[00:29.00]To lift not one but
[00:34.00]Both of us (uh)
[00:38.00]Ever thought about losing it?
[00:40.00]When your money is all gone and you lose your whip (ooh-ooh)
[00:42.00]You might lose your grip
[00:43.00]When the landlord tell you that you're due for rent
[00:45.00]And the grass so green on the other side
[00:46.00]Make a nigga wanna run straight through the fence
[00:49.00]Open up the fridge about 20 times (ooh-ooh)
[00:50.00]But still can't find no food in it, that's foolishness
[00:54.00]And sometimes I wonder
[00:55.00]Why we care so much about the way we look (ooh-ooh)
[00:57.00]And the way we talk, and the way we act
[00:59.00]And the clothes we bought, how much that cost?
[01:01.00]Does it even really matter?
[01:03.00]'Cause if life is an uphill battle (ooh-ooh)
[01:04.00]We all try to climb on the same old ladder
[01:06.00]In the same boat with the same old paddle
[01:08.00]Why so shallow? I'm just asking
[01:10.00]What's the pattern to the madness? (Ooh-ooh)
[01:12.00]Everybody in a #1 draft pick
[01:14.00]Most of us ain't Hollywood actors
[01:16.00]But if it's all for one, and one for all
[01:18.00]Then maybe one day we all can ball (ooh-ooh)
[01:20.00]Do it one time for the underdogs
[01:22.00]Sincerely yours, from one of y'all
[01:24.00]I wish I was
[01:28.00]Strong enough to
[01:32.00]Lift not one but
[01:35.00]Both of us
[01:39.00]Someday I will be
[01:43.00]Strong enough to
[01:47.00]Lift not one but
[01:51.00]Both of us
[01:55.00]I can feel your pain
[01:57.00]I can feel your struggle (ooh-ooh)
[01:58.00]You just want to live, but everything so low
[02:01.00]That you can drown in the puddle
[02:02.00]That's why I gotta hold us up, yeah, hold us up
[02:04.00]For all the times no one ever spoke for us (ooh-ooh)
[02:06.00]To every single time that they play this song
[02:08.00]You can say that, "That's what Bobby Ray wrote for us"
[02:10.00]When the tides get too high
[02:11.00]And the sea up underneath get so deep (ooh-ooh)
[02:13.00]And you feel like you're just another person
[02:15.00]Getting lost in the crowd, way up high in the nosebleeds, uh
[02:18.00]Because we've both been there, yeah, both of us
[02:20.00]But we still stand tall, with our shoulders up (ooh-ooh)
[02:22.00]And even though we always against the odds
[02:24.00]These are the things that have molded us
[02:25.00]And if life hadn't chosen us
[02:27.00]Sometimes I wonder where I would have wound up
[02:28.00]'Cause if it was up to me
[02:30.00]I'd make a new blueprint then build it from the ground up
[02:32.00]Hey, but if it's all for one and one for all
[02:35.00]Then maybe one day we all could ball
[02:37.00]Do it one time for the underdogs
[02:39.00]From Bobby Ray to all of y'all
[02:41.00]I wish I was
[02:44.00]Strong enough to
[02:48.00]Lift not one but
[02:52.00]Both of us
[02:56.00]Someday I will be
[03:00.00]Strong enough to
[03:04.00]Lift not one but
[03:08.00]Both of us
[03:12.00]Ooh-ooh, ooh
[03:16.00]Ooh-ooh
[03:20.00]Ooh-ooh
[03:24.00]Ooh-ooh
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
