// Dữ liệu lrc
const rawLrc = `
[00:21.60]Will you stay?
[00:23.80]흘러가는 저 시간 | I wish we could stop time
[00:26.60]잡아두고 싶어 with me | I wanna keep it here with me
[00:32.20]Will you go? (Will you go?)
[00:35.10]어떤 얼굴을 하고 서 있을까? | What kind of smile will you wear?
[00:40.10]이젠 기억나지 않는 새벽들 | Those forgotten dawns have faded
[00:43.20]Say
[00:44.60]Oh, I'm runnin' round in a daze
[00:46.90]We been walkin' so many ways
[00:49.20]가슴이 터질 것 같아 | My heart's about to burst
[00:52.30]Can't you see the take two?
[00:54.90]Stories unfoldin' just for you
[00:57.40]너와 함께하는 청춘 | My youth is with you
[01:00.00]지금 내 손을 잡아 | Take my hand right now
[01:02.50]Yeah, we never felt so young
[01:04.90]When together sing the song
[01:07.60]서로의 눈 맞추며 | Looking into each other's eyes
[01:09.90]어둠 속에도 | Even in the darkest night
[01:12.80]Yeah, we never felt so right
[01:15.10]When I got you by my side
[01:17.60]함께 걷던 길 따라 | Along the road we walked together
[01:20.10]Oh, we young forever
[01:24.40]사막도 바다가 돼서 we swim forever | Even deserts turn to oceans, we swim forever
[01:26.90]외로워했던 고래도 이젠 singin' together | Even lonely whales are singing together now
[01:29.40]함께니깐, 영원을 바래도 무섭지 않아 | With you, forever doesn't scare me
[01:32.70]내 믿음은 너고 하나뿐인 이유니깐 | You're my faith, my only reason
[01:34.70]You're my silver lining
[01:36.10]You the one who just light me up
[01:37.80]Oh, I can always feel you beside me
[01:40.10]노을이 빌딩에 부딪쳐 | The sunset paints the city
[01:42.30]우린 이렇게 서로에 주어져 | We were meant for each other
[01:45.20]Say
[01:46.20]Oh, I'm runnin' round in a daze
[01:48.70]We been walkin' so many ways
[01:51.10]널 품에 터질 듯 안아 | I hold you close so tight
[01:53.90]Can't you see the take two?
[01:56.70]Letters I didn't send to you
[01:59.20]너와 함께하는 청춘 | My youth is with you
[02:01.70]시작일지도 몰라 | Maybe this is just the beginning
[02:04.50]Yeah, we never felt so young
[02:06.80]When together sing the song
[02:09.30]서로의 눈 맞추며 | Looking into each other's eyes
[02:11.80]어둠 속에도 | Even in the darkest night
[02:14.60]Yeah, we never felt so right
[02:17.00]When I got you by my side
[02:19.60]함께 걷던 길 따라 | Along the road we walked together
[02:22.10]Oh, we young forever
[02:26.30]당신과 함께해서 가능했고 | It was possible because of you
[02:28.90]당신과 함께여서 행복했어 | I was happy because of you
[02:31.20]당신의 목소리에 숨을 쉬고 | Your voice kept me breathing
[02:33.40]당신의 눈물들로 일어섰어 | Your tears helped me stand again
[02:35.90]당신들의 과분한 사랑을 내가 받을 자격 있을까 | Do I deserve all your love?
[02:39.40]수년간 우리가 만든 영혼의 교집합 | Our souls have crossed for years
[02:41.80]함께여서 너무 고맙고 행복합니다 | I'm so thankful we're together
[02:44.70]부디 앞으로도 행복합시다 | Let's stay happy together
[02:45.90]Yeah, we never felt so young
[02:48.10]When together sing the song
[02:50.60]서로의 눈 맞추며 | Looking into each other's eyes
[02:52.90]비가 내려도 | Even when the rain falls
[02:56.20]Yeah, we never felt so right
[02:58.50]When I got you by my side (My side)
[03:01.20]함께 맞던 별 따라 | Beneath the stars we shared
[03:03.50]Oh, we young forever
[03:07.90]이렇게 노래해 | Sing it out like this
[03:13.20]Won't you hold my hand? (Yeah, we never felt so right)
[03:18.20]Need you here tonight (We ain't never felt so young)
[03:23.40]Oh, we young forever (Never felt so young)
[03:31.70]Yeah, never felt, never felt so young
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
