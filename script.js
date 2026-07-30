// Dữ liệu lrc
const rawLrc = `
[00:11.00]느껴봐, something in the air tonight | Feel it, something in the air tonight
[00:17.00]빛이 나 다신 오지 않을 이 순간 | Shining bright, this moment won't come again
[00:23.00]붙잡고 애써봐야, time is passing by | Even if you hold on tight, time is passing by
[00:29.00]Let it go, we gon' lose the track of time
[00:35.00]Put your hands up, party
[00:37.00]해 뜰 때까지 다 move, body, body | 'Til the sun comes up, everybody move, body, body
[00:41.00]ALLDAY, better make some room
[00:42.00]여기로 모여, that roller coaster | Gather 'round, that roller coaster
[00:45.00]ready to go, yah, yah-yah-yah
[00:48.00]뜨겁게 더 risin' | Getting hotter, risin'
[00:50.00]Heat it up, 가빠지는 숨, everybody | Heat it up, breathing gets heavy, everybody
[00:52.00]ALLDAY, better make some room
[00:54.00]여기로 모여, that roller coaster | Gather 'round, that roller coaster
[00:57.00]ready to go, yah, yah-yah-yah
[01:00.00]One more time, wanna get lost in the ni-ni-night
[01:05.00]틀어줘, song that I li-li-like | play the song that I li-li-like
[01:08.00]Come on, just dance with me now, dance with me now
[01:12.00]미쳐봐, 마지막인 것처럼 one last time | Go crazy, like it's the last time, one last time
[01:17.00]finally here, I'm ali-li-live
[01:20.00]Come on, just dance with me now, dance with me now
[01:23.00](what's up, pretty?)
[01:24.00]I found you looking for a man in your life (life)
[01:26.00]you told me love's a drug (drug)
[01:27.50]I'm pickin' you up, we 'bout to get drunk,
[01:29.00]let me cater to you tonight (tonight)
[01:30.50]See you in my frame, this Cartier can't handle you,
[01:32.50]'cause your light is too bright
[01:33.50]하면 하는 내 성격은 impulsive, | I go all in, I'm impulsive
[01:34.50]verse가 끝나기도 전에, | even before the verse ends,
[01:35.50]we're dancing in the light
[01:36.50]Like this, swing it left to right,
[01:37.50]우린 합을 맞추지 | we're perfectly in sync
[01:39.00]She call me papi, yeah, I like it,
[01:40.00]할래 너와 나쁜 짓 | wanna do bad things with you
[01:42.00]We're too legit,
[01:43.00]보고 배워, 우리 둘의 fit (yeah) | watch and learn, our fit (yeah)
[01:44.50]They can't counterfeit,
[01:45.50]어딜 가든 튀지, 미친 시너지 | standing out everywhere, crazy synergy
[01:48.00]Put your hands up, party
[01:49.00]해 뜰 때까지 다 move, body, body | 'Til the sun comes up, everybody move, body, body
[01:52.00]ALLDAY, better make some room
[01:54.00]여기로 모여, that roller coaster | Gather 'round, that roller coaster
[01:57.00]ready to go, yah, yah-yah-yah
[01:59.00]뜨겁게 더 risin' | Getting hotter, risin'
[02:01.00]Heat it up, 가빠지는 숨, everybody | Heat it up, breathing gets heavy, everybody
[02:04.50]ALLDAY, better make some room
[02:06.00]여기로 모여, that roller coaster | Gather 'round, that roller coaster
[02:09.00]ready to go, yah, yah-yah-yah
[02:12.00]One more time, wanna get lost in the ni-ni-night
[02:17.00]틀어줘, song that I li-li-like | play the song that I li-li-like
[02:20.00]Come on, just dance with me now, dance with me now
[02:24.00]미쳐봐, 마지막인 것처럼 one last time | Go crazy, like it's the last time, one last time
[02:29.00]finally here, I'm ali-li-live
[02:32.00]Come on, just dance with me now, dance with me now
[02:35.00]On replay (replay)
[02:37.00]Baby, play it one more time, I might just stay, yeah (stay, yeah)
[02:40.00]눈빛으로 말해, ain't gotta say it | Say it with your eyes, ain't gotta say it
[02:43.00]Feel the tide, yeah (tide)
[02:45.00]파도 위에 | riding the waves
[02:46.00](wait, you sure you could keep up?)
[02:48.00]One more time, one more time
[02:50.00]One more time to the ni-ni-night
[02:54.00]Song that I li-li-like
[02:56.00]Come on, come on, dance with me now, dance
[02:58.00](you sure you could keep up?)
[03:00.00]One more time, one more time
[03:02.00]One more time to the ni-ni-night
[03:06.00]Song that I li-li-like
[03:08.00]Come on, come on, dance with me now, dance with me now
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
